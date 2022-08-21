import { Box, FormControl, TextField } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React from 'react';
import { Config } from '../lib/Config';

interface NumberInputProps {
    label: string;
    type: 'deviceSensorMax' | 'deviceSensorMin' | 'sensorMultiplier' | 'deviceSensorResolution';
    sensorType: 'sensor' | 'multiSensor';
    index?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, type, sensorType, index }): JSX.Element => {
    const [values, setValues] = React.useState<number | undefined>(0);
    const { translate: _ } = useI18n();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValues(parseInt(event.target.value));
        Config[type] = parseInt(event.target.value);
    };

    const handleMultiChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues(parseInt(event.target.value));
        if (index !== undefined) {
            Config.sensorList[index][type] = Number(event.target.value);
            console.log(Config.sensorList[index]);
        }
    };

    return (
        <React.Fragment>
            <Box
                component="span"
                sx={{
                    p: 2,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '100%',
                    width: '150px',
                }}
            >
                <FormControl variant="outlined">
                    <TextField
                        variant="outlined"
                        type="number"
                        label={_(`${label}`)}
                        value={values}
                        inputProps={{
                            style: {
                                textAlign: 'center',
                            },
                        }}
                        onChange={(event) => {
                            if (sensorType === 'sensor') {
                                handleChange(event);
                            } else if (sensorType === 'multiSensor') {
                                handleMultiChange(event);
                            }
                        }}
                    />
                </FormControl>
            </Box>
        </React.Fragment>
    );
};
