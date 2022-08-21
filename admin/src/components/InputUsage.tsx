/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Config } from '../lib/Config';
import { binaryInputDescription } from '../types/dsDevice';
import { useI18n } from 'iobroker-react/hooks';

const inputUsageOptions: { value: string; title: string }[] = [
    {
        value: '0',
        title: 'inputUsageOptions-inputUsageUndefined',
    },
    {
        value: '1',
        title: 'inputUsageOptions-inputUsageRoom',
    },
    {
        value: '2',
        title: 'inputUsageOptions-inputUsageOutdoor',
    },
    {
        value: '3',
        title: 'inputUsageOptions-inputUsageClimateSetting', // (from user)
    },
];

export const InputUsage = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [sensorUsage, setSensorUsage] = React.useState('0');
    const handleChange = (event: SelectChangeEvent) => {
        setSensorUsage(event.target.value);
        Config.deviceInputUsage = parseInt(event.target.value) as binaryInputDescription['inputUsage'];
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
                    <InputLabel id="inputUsageOptions-select-label">{_('inputUsage-inputUsageOptions')}</InputLabel>
                    <Select
                        labelId="inputUsageOptions-select-label"
                        id="inputUsageOptions-select"
                        value={sensorUsage}
                        label={_('inputUsage-inputUsageOptions')}
                        onChange={handleChange}
                    >
                        {inputUsageOptions.map((option) => (
                            <MenuItem
                                key={option.value}
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
