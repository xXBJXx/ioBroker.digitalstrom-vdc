/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Config } from '../lib/Config';
import { sensorDescription } from '../types/dsDevice';
import { useI18n } from 'iobroker-react/hooks';

const sensorTypeOptions: { value: string; title: string }[] = [
    {
        value: '0',
        title: 'sensorTypeOptions-None',
    },
    {
        value: '1',
        title: 'sensorTypeOptions-Temperature',
    },
    {
        value: '2',
        title: 'sensorTypeOptions-Humidity',
    },
    {
        value: '3',
        title: 'sensorTypeOptions-Illumination',
    },
    {
        value: '4',
        title: 'sensorTypeOptions-SupplyVoltage',
    },
    {
        value: '5',
        title: 'sensorTypeOptions-CO2',
    },
    {
        value: '6',
        title: 'sensorTypeOptions-Radon',
    },
    {
        value: '7',
        title: 'sensorTypeOptions-Gas',
    },
    {
        value: '8',
        title: 'sensorTypeOptions-PM10',
    },
    {
        value: '9',
        title: 'sensorTypeOptions-PM25',
    },
    {
        value: '10',
        title: 'sensorTypeOptions-PM01',
    },
    {
        value: '11',
        title: 'sensorTypeOptions-RoomOperatingPanel',
    },
    {
        value: '12',
        title: 'sensorTypeOptions-FanSpeed',
    },
    {
        value: '13',
        title: 'sensorTypeOptions-WindSpeed',
    },
    {
        value: '14',
        title: 'sensorTypeOptions-ActivePower',
    },
    {
        value: '15',
        title: 'sensorTypeOptions-ElectricCurrent',
    },
    {
        value: '16',
        title: 'sensorTypeOptions-EnergyMeter',
    },
    {
        value: '17',
        title: 'sensorTypeOptions-ApparentPower',
    },
    {
        value: '18',
        title: 'sensorTypeOptions-AirPressure',
    },
    {
        value: '19',
        title: 'sensorTypeOptions-WindDirection',
    },
    {
        value: '20',
        title: 'sensorTypeOptions-SoundPressure',
    },
    {
        value: '21',
        title: 'sensorTypeOptions-Precipitation',
    },
    {
        value: '22',
        title: 'sensorTypeOptions-CO2concentration',
    },
    {
        value: '23',
        title: 'sensorTypeOptions-WindGustSpeed',
    },
    {
        value: '24',
        title: 'sensorTypeOptions-WindGustDirection',
    },
    {
        value: '25',
        title: 'sensorTypeOptions-GeneratedActivePower',
    },
    {
        value: '26',
        title: 'sensorTypeOptions-GeneratedEnergy',
    },
    {
        value: '27',
        title: 'sensorTypeOptions-WaterQuantity',
    },
    {
        value: '28',
        title: 'sensorTypeOptions-WaterFlowRate',
    },
];

interface SensorTypeProps {
    sensorType: 'sensor' | 'multiSensor';
    index?: number;
}
export const SensorType: React.FC<SensorTypeProps> = ({ sensorType, index }): JSX.Element => {
    const { translate: _ } = useI18n();
    const [deviceSensorType, setSensorType] = React.useState('0');

    const handleChange = (event: SelectChangeEvent) => {
        setSensorType(event.target.value);
        Config.deviceSensorType = parseInt(event.target.value) as sensorDescription['sensorType'];
        console.log(Config);
    };
    const handleMultiChange = (event: SelectChangeEvent) => {
        setSensorType(event.target.value);
        if (index !== undefined) {
            Config.sensorList[index].deviceSensorType = parseInt(event.target.value) as sensorDescription['sensorType'];
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
                    <InputLabel id="sensorType-select-label">{_('sensorType-sensorType')}</InputLabel>
                    <Select
                        labelId="sensorType-select-label"
                        id="sensorType-select"
                        value={deviceSensorType}
                        label={_('sensorType-sensorType')}
                        onChange={(event) => {
                            if (sensorType === 'sensor') {
                                handleChange(event);
                            } else if (sensorType === 'multiSensor') {
                                handleMultiChange(event);
                            }
                        }}
                    >
                        {sensorTypeOptions.map((option) => (
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
