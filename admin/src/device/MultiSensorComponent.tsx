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
import { SensorConfigModal } from '../modal/SensorConfigModal';
import { Config, SensorList } from '../lib/Config';

export const MultiSensorComponent = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [ids, setIds] = React.useState<string[] | undefined>([]);
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState<number[]>([]);
    const [selectId, setSelectId] = React.useState<{ id: string; index?: number }>({ id: '', index: 0 });

    const handleSensorConfigModal = (id: string, index: number): any => {
        const newSuccess = success.filter((item) => item !== index);
        setSuccess(newSuccess);
        setSelectId({ id, index });
        setOpen(true);
    };

    React.useEffect(() => {
        Config.sensorList = [];
        setSuccess([]);
        for (const idsKey in ids) {
            if (ids.hasOwnProperty(idsKey)) {
                const element = ids[parseInt(idsKey)];
                if (element !== '') {
                    Config.sensorList.push({
                        selectSensor: element,
                        sensorMultiplier: 1,
                        deviceSensorMax: 0,
                        deviceSensorMin: 0,
                        deviceSensorSIUnit: '',
                        deviceSensorSymbol: '',
                        deviceSensorResolution: 0,
                        color: 1,
                        deviceSensorType: 0,
                        deviceSensorUsage: 0,
                    } as SensorList);
                }
            }
        }
        console.log(Config);
    }, [ids]);

    const color = (index: number) => {
        if (success.includes(index)) return 'success';
    };

    return (
        <React.Fragment>
            <SensorConfigModal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                selectId={selectId}
                sensorType={'multiSensor'}
                success={(value) => setSuccess([...success, value])}
            />
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
                    title={'multiSensorComponent-multiSelectID'}
                    buttonTitle={'multiSensorComponent-multiSelectButton'}
                    onSelect={(selectId) => setIds(selectId)}
                />
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}>{_('multiSensorComponent-selectedID')}</TableCell>
                                <TableCell align={'right'}>{_('multiSensorComponent-config')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ids
                                ? ids.map((row: string, index: number) => (
                                      <TableRow key={`key-${row}-${index}`}>
                                          <TableCell align={'center'} component="th" scope="row">
                                              {row}
                                          </TableCell>
                                          <TableCell align={'right'}>
                                              <IconButton onClick={() => handleSensorConfigModal(row, index)}>
                                                  <Ballot color={color(index) ?? 'error'} />
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
