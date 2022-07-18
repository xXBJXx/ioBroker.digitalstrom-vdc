/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Config } from '../lib/Config';
import { colorGroup } from '../types/dsDevice';

const colorClassOptions = [
    {
        value: '0',
        title: 'Select DS Color',
        disabled: true,
    },
    {
        value: '1',
        title: 'yellowColorClass',
    },
    {
        value: '2',
        title: 'greyColorClass',
    },
    {
        value: '3',
        title: 'blueColorClass',
    },
    {
        value: '4',
        title: 'cyanColorClass',
    },
    {
        value: '5',
        title: 'magentaColorClass',
    },
    {
        value: '6',
        title: 'redColorClass',
    },
    {
        value: '7',
        title: 'greenColorClass',
    },
    {
        value: '8',
        title: 'blackColorClass',
    },
    {
        value: '9',
        title: 'whiteColorClass',
    },
];

export const ColorClassComponent = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [colorClass, setColorClass] = React.useState('0');
    const handleChange = (event: SelectChangeEvent) => {
        setColorClass(event.target.value);
        Config.color = parseInt(event.target.value) as colorGroup;
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
                    <InputLabel id="colorClassOptions-select-label">colorClassOptions</InputLabel>
                    <Select
                        labelId="colorClassOptions-select-label"
                        id="colorClassOptions-select"
                        value={colorClass}
                        label="colorClassOptions"
                        onChange={handleChange}
                    >
                        {colorClassOptions.map((option, index) => (
                            <MenuItem
                                key={option.value}
                                disabled={colorClassOptions[index].disabled}
                                value={option.value}
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
