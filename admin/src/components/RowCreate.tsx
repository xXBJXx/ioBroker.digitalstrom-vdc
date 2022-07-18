/**
 * Created by alex-issi on 13.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { useDialogs } from 'iobroker-react';
import { useAPI } from '../lib/useAPI';
import { Button, Chip, Collapse, TableCell, TableRow, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightIcon from '@mui/icons-material/Light';
import moment from 'moment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@material-ui/core/Box';

export interface RowCreateProps {
    row: ioBroker.Object;
    refreshDevices: () => void;
}

export const Row: React.FC<RowCreateProps> = ({ row, refreshDevices }): JSX.Element => {
    const { showModal } = useDialogs();
    const api = useAPI();
    const [open, setOpen] = React.useState(false);
    const { translate: _ } = useI18n();

    const removeDevice = async (row: ioBroker.Object) => {
        await api.removeDevice(row);
        refreshDevices();
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Chip icon={<LightIcon />} label={row.common.name} variant="outlined" />
                </TableCell>
                <TableCell align="right">{moment(row.ts).format('DD.MM.YYYY')}</TableCell>
                <TableCell align="right">{row.native.deviceObj.dsConfig.dSUID}</TableCell>
                <TableCell align="right">
                    <Button
                        onClick={async () => {
                            console.log('click to remove', row);
                            const result = await showModal(
                                _('remove device?'),
                                `${_('are you sure you want to remove')} «${row.common.name}»?`,
                            );
                            if (!result) return;
                            await removeDevice(row);
                        }}
                        variant="outlined"
                    >
                        <DeleteOutlineIcon /> {_('listDevices-removeButton')}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {_('listDevices-watchStateHeader')}
                            </Typography>
                            <pre>
                                <code>{JSON.stringify(row.native.deviceObj.dsConfig, null, 2)}</code>
                            </pre>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};
