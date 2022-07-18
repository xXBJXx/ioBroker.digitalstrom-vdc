/**
 * Created by alex-issi on 15.07.22
 */
import React, { useEffect } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { MultiSensor } from './MultiSensorComponent';
import { NameComponent } from '../components/NameComponent';
import { createDevice } from '../lib/create_dsDevice';
import { API } from '../lib/useAPI';
import { PresenceSensorComponent } from './PresenceSensorComponent';
import { Config } from '../lib/Config';
import { SensorComponent } from './SensorComponent';

export interface SensorProps {
    api: API;
    clearInput: () => void;
    //props
}

export const Sensor: React.FC<SensorProps> = ({ api, clearInput }): JSX.Element => {
    const [deviceType, setDeviceType] = React.useState({
        type: 'sensor',
    });

    useEffect(() => {
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
            <NameComponent />
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
                            Device Type
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="device-type-label"
                            name="Device Type"
                            value={deviceType.type}
                            onChange={handleChangeType}
                        >
                            <FormControlLabel
                                value="sensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="Sensor"
                            />
                            <FormControlLabel
                                value="presenceSensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="presence Sensor"
                            />
                            <FormControlLabel
                                value="multiSensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="multi Sensor"
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
            {deviceType.type === 'presenceSensor' ? (
                <React.Fragment>
                    <PresenceSensorComponent />
                </React.Fragment>
            ) : null}
            {deviceType.type === 'multiSensor' ? (
                <React.Fragment>
                    <MultiSensor />
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
                    Add New Device
                </Button>
            </Grid>
        </React.Fragment>
    );
};
