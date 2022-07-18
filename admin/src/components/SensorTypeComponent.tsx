/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Config } from '../lib/Config';
import { sensorDescription } from '../types/dsDevice';

const sensorTypeOptions: { value: string; title: string }[] = [
    {
        value: '0',
        title: 'sensorTypeNone',
    },
    {
        value: '1',
        title: 'sensorTypeTemperature',
    },
    {
        value: '2',
        title: 'sensorTypeHumidity',
    },
    {
        value: '3',
        title: 'sensorTypeIllumination',
    },
    {
        value: '4',
        title: 'sensorTypeSupplyVoltage',
    },
    {
        value: '5',
        title: 'sensorTypeCO2',
    },
    {
        value: '6',
        title: 'sensorTypeRadon',
    },
    {
        value: '7',
        title: 'sensorTypeGas',
    },
    {
        value: '8',
        title: 'sensorTypePM10',
    },
    {
        value: '9',
        title: 'sensorTypePM25',
    },
    {
        value: '10',
        title: 'sensorTypePM01',
    },
    {
        value: '11',
        title: 'sensorTypeRoomOperatingPanel',
    },
    {
        value: '12',
        title: 'sensorTypeFanSpeed',
    },
    {
        value: '13',
        title: 'sensorTypeWindSpeed',
    },
    {
        value: '14',
        title: 'sensorTypeActivePower',
    },
    {
        value: '15',
        title: 'sensorTypeElectricCurrent',
    },
    {
        value: '16',
        title: 'sensorTypeEnergyMeter',
    },
    {
        value: '17',
        title: 'sensorTypeApparentPower',
    },
    {
        value: '18',
        title: 'sensorTypeAirPressure',
    },
    {
        value: '19',
        title: 'sensorTypeWindDirection',
    },
    {
        value: '20',
        title: 'sensorTypeSoundPressure',
    },
    {
        value: '21',
        title: 'sensorTypePercipitation',
    },
    {
        value: '22',
        title: 'sensorTypeCO2concentration',
    },
    {
        value: '23',
        title: 'sensorTypeWindGustSpeed',
    },
    {
        value: '24',
        title: 'sensorTypeWindGustDirection',
    },
    {
        value: '25',
        title: 'sensorTypeGeneratedActivePower',
    },
    {
        value: '26',
        title: 'sensorTypeGeneratedEnergy',
    },
    {
        value: '27',
        title: 'sensorTypeWaterQuality',
    },
    {
        value: '28',
        title: 'sensorTypeWaterFlowRate',
    },
];

export const SensorTypeComponent = (): JSX.Element => {
    const [sensorType, setSensorType] = React.useState('0');
    const handleChange = (event: SelectChangeEvent) => {
        setSensorType(event.target.value);
        Config.deviceSensorType = parseInt(event.target.value) as sensorDescription['sensorType'];
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
                    <InputLabel id="sensorType-select-label">sensorType</InputLabel>
                    <Select
                        labelId="sensorType-select-label"
                        id="sensorType-select"
                        value={sensorType}
                        label="sensorType"
                        onChange={handleChange}
                    >
                        {sensorTypeOptions.map((option) => (
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
