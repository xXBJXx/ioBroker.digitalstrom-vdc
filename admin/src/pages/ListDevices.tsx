import React from 'react';
import { useAPI } from '../lib/useAPI';
import { NoDevices } from '../components/Messages';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import { Row } from '../components/RowCreate';

export const ListDevices = () => {
    // init
    const [devices, setDevices] = React.useState<string[]>([]);
    const api = useAPI();
    const { translate: _ } = useI18n();

    const refreshDevices = React.useCallback(async () => {
        const devs = await api.listDevices();
        setDevices(devs);
        console.log('all Devices', devs);
    }, [api]);

    // load device array
    React.useEffect(() => {
        (async () => {
            console.log('refreshing devices');
            await refreshDevices();
        })();
    }, []);

    if (!devices || devices.length === 0) return <NoDevices />;
    return (
        <div id="ListDevices">
            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                <p style={{ textTransform: 'uppercase' }}>{_('listDevices-deviceNameTitle')}</p>
                            </TableCell>
                            <TableCell align="right">
                                <p style={{ textTransform: 'uppercase' }}>{_('listDevices-CreationDateTitle')}</p>
                            </TableCell>
                            <TableCell align="right">
                                <p style={{ textTransform: 'uppercase' }}>{_('listDevices-dSUIDTitle')}</p>
                            </TableCell>
                            <TableCell align="right">
                                <p style={{ textTransform: 'uppercase' }}>{_('listDevices-removeTitle')}</p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map((row: any) => (
                            <Row key={row.common.name} row={row} refreshDevices={() => refreshDevices()} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
