/**
 * Created by alex-issi on 15.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Ballot } from '@mui/icons-material';
import { MultiSelectID } from '../components/SelectID';

export interface MultiSensorProps {
    //props
}

export const MultiSensor: React.FC<MultiSensorProps> = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [ids, setIds] = React.useState<string[] | undefined>([]);

    return (
        <React.Fragment>
            <Box
                sx={{
                    p: 2,
                    border: '1px dashed grey',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '100%',
                }}
            >
                <MultiSelectID
                    title={'multiSelectID'}
                    buttonTitle={'sensorSelectIDButton'}
                    onSelect={(selectId) => setIds(selectId)}
                />
                <TableContainer component={Paper} elevation={2}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}>{_('Selected ID')}</TableCell>
                                <TableCell align={'right'}>{_('config')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ids
                                ? ids.map((row: any) => (
                                      <TableRow key={row}>
                                          <TableCell align={'center'} component="th" scope="row">
                                              {row}
                                          </TableCell>
                                          <TableCell align={'right'}>
                                              <IconButton onClick={() => console.log(row)}>
                                                  <Ballot />
                                              </IconButton>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
};
