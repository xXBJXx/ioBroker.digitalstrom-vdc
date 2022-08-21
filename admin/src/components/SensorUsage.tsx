/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Config } from '../lib/Config';
import { sensorDescription } from '../types/dsDevice';
import { useI18n } from 'iobroker-react/hooks';

const sensorUsageOptions: { value: string; title: string }[] = [
    {
        value: '0',
        title: 'sensorUsageOptions-Undefined',
    },
    {
        value: '1',
        title: 'sensorUsageOptions-Room',
    },
    {
        value: '2',
        title: 'sensorUsageOptions-Outdoor',
    },
    {
        value: '3',
        title: 'sensorUsageOptions-UserInteraction', // user interaction (setting, dial)
    },
    {
        value: '4',
        title: 'sensorUsageOptions-DeviceLevelMeasurement', // device level measurement (total, sum)
    },
    {
        value: '5',
        title: 'sensorUsageOptions-DeviceLevelLastRun', // device level last run
    },
    {
        value: '6',
        title: 'sensorUsageOptions-DeviceLevelAverage', // device level average
    },
];

interface SensorUsageProps {
    sensorType: 'sensor' | 'multiSensor';
    index?: number;
}

export const SensorUsage: React.FC<SensorUsageProps> = ({ sensorType, index }): JSX.Element => {
    const { translate: _ } = useI18n();
    const [sensorUsage, setSensorUsage] = React.useState('0');
    const handleChange = (event: SelectChangeEvent) => {
        setSensorUsage(event.target.value);
        Config.deviceSensorUsage = parseInt(event.target.value) as sensorDescription['sensorUsage'];
        console.log(Config);
    };
    const handleMultiChange = (event: SelectChangeEvent) => {
        setSensorUsage(event.target.value);
        if (index !== undefined) {
            Config.sensorList[index].deviceSensorUsage = parseInt(
                event.target.value,
            ) as sensorDescription['sensorUsage'];
            console.log(Config.sensorList[index]);
        }
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
                    <InputLabel id="sensorUsageOptions-select-label">{_('sensorUsage-Options-select')}</InputLabel>
                    <Select
                        labelId="sensorUsageOptions-select-label"
                        id="sensorUsageOptions-select"
                        value={sensorUsage}
                        label={_('sensorUsage-Options-select')}
                        onChange={(event) => {
                            if (sensorType === 'sensor') {
                                handleChange(event);
                            } else if (sensorType === 'multiSensor') {
                                handleMultiChange(event);
                            }
                        }}
                    >
                        {sensorUsageOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                divider
                                value={option.value}
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
