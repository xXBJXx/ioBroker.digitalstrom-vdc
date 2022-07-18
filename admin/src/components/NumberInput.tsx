import { Box, FormControl, TextField } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { Config } from '../lib/Config';

interface NumberInputProps {
    label: string;
    type: 'deviceSensorMax' | 'deviceSensorMin' | 'sensorMultiplier' | 'deviceSensorResolution';
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, type }): JSX.Element => {
    const [values, setValues] = useState<number | undefined>(0);
    const { translate: _ } = useI18n();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValues(parseInt(event.target.value));
        Config[type] = parseInt(event.target.value);
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
                    {/*<Tooltip title={_(`${tooltip}`)} arrow>*/}
                    <TextField
                        variant="outlined"
                        type="number"
                        label={_(`${label}`)}
                        value={values}
                        onChange={(e) => handleChange(e)}
                    />
                    {/*</Tooltip>*/}
                </FormControl>
            </Box>
        </React.Fragment>
    );
};
