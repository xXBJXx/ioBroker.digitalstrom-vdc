/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Config } from '../lib/Config';
import { binaryInputDescription } from '../types/dsDevice';

export interface SensorUsageComponentProps {
    //props
}
const sensorUsageOptions: { value: string; title: string }[] = [
    {
        value: '0',
        title: 'sensorUsageUndefined',
    },
    {
        value: '1',
        title: 'sensorUsageRoom',
    },
    {
        value: '2',
        title: 'sensorUsageOutdoor',
    },
];

export const SensorUsageComponent: React.FC<SensorUsageComponentProps> = (): JSX.Element => {
    const [sensorUsage, setSensorUsage] = React.useState('0');
    const handleChange = (event: SelectChangeEvent) => {
        setSensorUsage(event.target.value);
        Config.deviceSensorUsage = parseInt(event.target.value) as binaryInputDescription['inputUsage'];
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
                    <InputLabel id="sensorUsageOptions-select-label">sensorUsageOptions</InputLabel>
                    <Select
                        labelId="sensorUsageOptions-select-label"
                        id="sensorUsageOptions-select"
                        value={sensorUsage}
                        label="sensorUsageOptions"
                        onChange={handleChange}
                    >
                        {sensorUsageOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </React.Fragment>
    );
};
