/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material';
import { Config } from '../lib/Config';
import { colorGroup } from '../types/dsDevice';

const colorClassOptions = [
    {
        value: '0',
        title: 'colorClassOptions-selectDsColor',
        disabled: true,
    },
    {
        value: '1',
        title: 'colorClassOptions-yellow',
        color: '#FFD700',
        fontColor: '#000000',
    },
    {
        value: '2',
        title: 'colorClassOptions-grey',
        color: '#808080',
    },
    {
        value: '3',
        title: 'colorClassOptions-blue',
        color: '#0000FF',
    },
    {
        value: '4',
        title: 'colorClassOptions-cyan',
        color: '#00FFFF',
        fontColor: '#000000',
    },
    {
        value: '5',
        title: 'colorClassOptions-magenta',
        color: '#FF00FF',
    },
    {
        value: '6',
        title: 'colorClassOptions-red',
        color: '#FF0000',
    },
    {
        value: '7',
        title: 'colorClassOptions-green',
        color: '#008000',
    },
    {
        value: '8',
        title: 'colorClassOptions-black',
        color: '#000000',
        fontColor: '#FFFFFF',
    },
    {
        value: '9',
        title: 'colorClassOptions-white',
        color: '#FFFFFF',
        fontColor: '#000000',
    },
];
interface ColorClassProps {
    sensorType: 'sensor' | 'multiSensor';
    index?: number;
}

export const ColorClass: React.FC<ColorClassProps> = ({ sensorType, index }): JSX.Element => {
    const { translate: _ } = useI18n();
    const [colorClass, setColorClass] = React.useState('0');
    const handleChange = (event: SelectChangeEvent) => {
        setColorClass(event.target.value);
        Config.color = parseInt(event.target.value) as colorGroup;
    };
    const handleMultiChange = (event: SelectChangeEvent) => {
        setColorClass(event.target.value);
        if (index !== undefined) {
            Config.sensorList[index].color = parseInt(event.target.value) as colorGroup;
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
                    <InputLabel id="colorClassOptions-select-label">{_('colorClass-Options')}</InputLabel>
                    <Tooltip title={_('colorClass-tooltip')} placement={'right'} arrow>
                        <Select
                            labelId="colorClassOptions-select-label"
                            id="colorClassOptions-select"
                            value={colorClass}
                            label={_('colorClass-Options')}
                            onChange={(event) => {
                                if (sensorType === 'sensor') {
                                    handleChange(event);
                                } else if (sensorType === 'multiSensor') {
                                    handleMultiChange(event);
                                }
                            }}
                        >
                            {colorClassOptions.map((option, index) => (
                                <MenuItem
                                    key={option.value}
                                    divider
                                    disabled={colorClassOptions[index].disabled}
                                    sx={{
                                        backgroundColor: colorClassOptions[index].color,
                                        color: colorClassOptions[index].fontColor,
                                        justifyContent: 'center',
                                    }}
                                    value={option.value}
                                >
                                    {_(option.title)}
                                </MenuItem>
                            ))}
                        </Select>
                    </Tooltip>
                </FormControl>
            </Box>
        </React.Fragment>
    );
};
