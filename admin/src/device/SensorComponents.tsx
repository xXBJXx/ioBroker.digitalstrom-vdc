/**
 * Created by alex-issi on 15.07.22
 */
import React from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { MultiSensorComponent } from './MultiSensorComponent';
import { createDevice } from '../lib/create_dsDevice';
import { API } from '../lib/useAPI';
import { Config } from '../lib/Config';
import { SensorComponent } from './SensorComponent';
import { BinarySensorComponent } from './BinarySensorComponent';
import { useI18n } from 'iobroker-react/hooks';

export interface SensorProps {
    api: API;
    clearInput: () => void;
    //props
}

export const SensorComponents: React.FC<SensorProps> = ({ api, clearInput }): JSX.Element => {
    const { translate: _ } = useI18n();
    const [deviceType, setDeviceType] = React.useState({
        type: 'sensor',
    });

    React.useEffect(() => {
        Config.deviceType = 'sensor';
    }, []);

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeviceType({ ...deviceType, type: (event.target as HTMLInputElement).value });
        Config.deviceType = (event.target as HTMLInputElement).value;
    };
    const handleClear = () => {
        clearInput();
    };

    return (
        <React.Fragment>
            <Grid
                container
                spacing={1}
                sx={{
                    paddingBottom: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <React.Fragment>
                    <FormControl>
                        <FormLabel
                            sx={{
                                textAlign: 'center',
                            }}
                            id="device-type-label"
                        >
                            {_('sensorComponents-device_type')}
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="device-type-label"
                            name={_('sensorComponents-device_type')}
                            value={deviceType.type}
                            onChange={handleChangeType}
                        >
                            <FormControlLabel
                                value="sensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label={_('sensorComponents-sensor')}
                            />
                            <FormControlLabel
                                value="binarySensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label={_('sensorComponents-binary_sensor')}
                            />
                            <FormControlLabel
                                value="multiSensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label={_('sensorComponents-multi_sensor')}
                            />
                        </RadioGroup>
                    </FormControl>
                </React.Fragment>
            </Grid>
            {deviceType.type === 'sensor' ? (
                <React.Fragment>
                    <SensorComponent />
                </React.Fragment>
            ) : null}
            {deviceType.type === 'binarySensor' ? (
                <React.Fragment>
                    <BinarySensorComponent />
                </React.Fragment>
            ) : null}
            {deviceType.type === 'multiSensor' ? (
                <React.Fragment>
                    <MultiSensorComponent />
                </React.Fragment>
            ) : null}
            <Grid
                container
                spacing={1}
                sx={{
                    marginTop: '10px',
                    paddingBottom: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <Button
                    onClick={async () => {
                        console.log('button', deviceType);
                        await api.createDevice(createDevice(deviceType));
                        handleClear();
                    }}
                    variant="outlined"
                >
                    {_('add_new_device')}
                </Button>
            </Grid>
        </React.Fragment>
    );
};
