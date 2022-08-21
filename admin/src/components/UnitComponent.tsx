/**
 * Created by alex-issi on 18.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Config } from '../lib/Config';

interface UnitOption {
    title: string;
    value: { symbol: string; unit: string };
    disabled?: boolean;
}
const unitsOption: UnitOption[] = [
    {
        value: { symbol: '', unit: 'none' },
        title: 'unitsOption-Unit',
        disabled: true,
    },
    {
        value: { symbol: 'lx', unit: 'lux' },
        title: 'lux',
    },
    {
        value: { symbol: '°C', unit: 'celsius' },
        title: 'celsius',
    },
    {
        value: { symbol: '%', unit: 'percent' },
        title: 'percent',
    },
    {
        value: { symbol: 'm/s', unit: 'm/s' },
        title: 'm/s',
    },
    {
        value: { symbol: 'W', unit: 'watt' },
        title: 'watt',
    },
    {
        value: { symbol: 'V', unit: 'volt' },
        title: 'volt',
    },
    {
        value: { symbol: 'kWh', unit: 'kWh' },
        title: 'kWh',
    },
    {
        value: { symbol: 'A', unit: 'ampere' },
        title: 'ampere',
    },
    {
        value: { symbol: 'μg/m3', unit: 'μg/m3' },
        title: 'μg/m3',
    },
    {
        value: { symbol: 'ppm', unit: 'ppm' },
        title: 'ppm',
    },
    {
        value: { symbol: 'mm/m2', unit: 'mm/m2' },
        title: 'mm/m2',
    },
];
interface UnitProps {
    sensorType: 'sensor' | 'multiSensor';
    index?: number;
}

export const UnitComponent: React.FC<UnitProps> = ({ sensorType, index }): JSX.Element => {
    const { translate: _ } = useI18n();
    const [units, setUnits] = React.useState('unitsOption-Unit');
    const handleChange = (event: SelectChangeEvent) => {
        const selectedUnit = unitsOption.find((unit) => unit.title === event.target.value);
        setUnits(event.target.value);
        Config.deviceSensorSIUnit = event.target.value;
        if (selectedUnit) {
            Config.deviceSensorSymbol = selectedUnit.value.symbol;
        }
    };
    const handleMultiChange = (event: SelectChangeEvent) => {
        const selectedUnit = unitsOption.find((unit) => unit.title === event.target.value);
        setUnits(event.target.value);
        if (index !== undefined) {
            Config.sensorList[index].deviceSensorSIUnit = event.target.value;
            console.log(Config.sensorList[index]);
            if (selectedUnit) {
                Config.sensorList[index].deviceSensorSymbol = selectedUnit.value.symbol;
            }
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
                    <InputLabel id="Unit-select-label">{_('unitComponent-units-select')}</InputLabel>
                    <Select
                        labelId="Units-select-label"
                        id="Units-select"
                        value={units}
                        label={_('unitComponent-units-select')}
                        onChange={(event) => {
                            if (sensorType === 'sensor') {
                                handleChange(event);
                            } else if (sensorType === 'multiSensor') {
                                handleMultiChange(event);
                            }
                        }}
                    >
                        {unitsOption.map((option, index) => (
                            <MenuItem
                                key={`key-${option.title}-${index}`}
                                disabled={unitsOption[index].disabled}
                                value={option.title}
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
