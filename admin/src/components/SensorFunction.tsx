/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Config } from '../lib/Config';
import { binaryInputDescription } from '../types/dsDevice';
import { useI18n } from 'iobroker-react/hooks';

const sensorFunctionOptions = [
    {
        value: 'default',
        title: 'sensorFunctionOptions-Function',
        disabled: true,
    },
    {
        value: '0',
        title: 'sensorFunctionOptions-AppMode', // no System function
    },
    {
        value: '1',
        title: 'sensorFunctionOptions-Presence',
    },
    {
        value: '2',
        title: 'sensorFunctionOptions-Light', // not yet in use
        disabled: true,
    },
    {
        value: '3',
        title: 'sensorFunctionOptions-PresenceInDarkness', // not yet in use
        disabled: true,
    },
    {
        value: '4',
        title: 'sensorFunctionOptions-Twilight',
    },
    {
        value: '5',
        title: 'sensorFunctionOptions-MotionDetector',
    },
    {
        value: '6',
        title: 'sensorFunctionOptions-MotionInDarkness', // not yet in use
        disabled: true,
    },
    {
        value: '7',
        title: 'sensorFunctionOptions-SmokeDetector',
    },
    {
        value: '8',
        title: 'sensorFunctionOptions-WindMonitor',
    },
    {
        value: '9',
        title: 'sensorFunctionOptions-RainMonitor',
    },
    {
        value: '10',
        title: 'sensorFunctionOptions-SunRadiation',
    },
    {
        value: '11',
        title: 'sensorFunctionOptions-Thermostat',
    },
    {
        value: '12',
        title: 'sensorFunctionOptions-BatteryLow',
    },
    {
        value: '13',
        title: 'sensorFunctionOptions-WindowContact',
    },
    {
        value: '14',
        title: 'sensorFunctionOptions-DoorContact',
    },
    {
        value: '15',
        title: 'sensorFunctionOptions-WindowHandle',
    },
    {
        value: '16',
        title: 'sensorFunctionOptions-GarageDoor',
    },
    {
        value: '17',
        title: 'sensorFunctionOptions-SunProtection',
    },
    {
        value: '18',
        title: 'sensorFunctionOptions-FrostDetection',
    },
    {
        value: '19',
        title: 'sensorFunctionOptions-HeatingEnabled',
    },
    {
        value: '20',
        title: 'sensorFunctionOptions-HeatingChangeOver',
    },
    {
        value: '21',
        title: 'sensorFunctionOptions-InitializationStatus',
    },
    {
        value: '22',
        title: 'sensorFunctionOptions-Malfunction',
    },
    {
        value: '23',
        title: 'sensorFunctionOptions-Service',
    },
];

export const SensorFunction = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [sensorFunction, setSensorFunction] = React.useState('default');
    const handleChange = (event: SelectChangeEvent) => {
        setSensorFunction(event.target.value);
        Config.deviceSensorFunction = parseInt(event.target.value) as binaryInputDescription['sensorFunction'];
        console.log(Config);
    };

    return (
        <React.Fragment>
            <Box
                component="span"
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '100%',
                    width: '300px',
                }}
            >
                <FormControl
                    fullWidth
                    sx={{
                        marginTop: '15px',
                    }}
                >
                    <InputLabel id="sensorFunction-select-label">
                        {_('sensorFunction-sensorFunction_select')}
                    </InputLabel>
                    <Select
                        labelId="sensorFunction-select-label"
                        id="sensorFunction-select"
                        value={sensorFunction}
                        label={_('sensorFunction-sensorFunction_select')}
                        onChange={handleChange}
                    >
                        {sensorFunctionOptions.map((option, index) => (
                            <MenuItem
                                key={`key-${option.title}-${option.value}`}
                                disabled={sensorFunctionOptions[index].disabled}
                                value={option.value}
                                divider
                                sx={{
                                    justifyContent: 'center',
                                }}
                            >
                                {_(option.title)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </React.Fragment>
    );
};
