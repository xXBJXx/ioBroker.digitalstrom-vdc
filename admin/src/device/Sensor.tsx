/**
 * Created by alex-issi on 15.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { clearConfig, Config } from '../lib/Config';

export interface SensorProps {
    //props
}

export const Sensor: React.FC<SensorProps> = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [name, setName] = React.useState('');
    const [clear, setClear] = React.useState(false);
    const [configURL, setConfigURL] = React.useState('http://localhost:8081');
    const [deviceType, setDeviceType] = React.useState('sensor');

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeviceType(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        Config.name = event.target.value;
    };
    const handleConfigURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfigURL(event.target.value);
        Config.configUrl = event.target.value;
    };

    const handleClear = () => {
        setName('');
        setConfigURL('http://localhost:8081');
        clearConfig();
        setClear(!clear);
    };

    return (
        <React.Fragment>
            <Grid
                container
                spacing={1}
                sx={{
                    marginTop: '10px',
                    paddingBottom: '15px',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <React.Fragment>
                    <Box
                        sx={{
                            marginTop: '10px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-name" label="Name" value={name} onChange={handleNameChange} />
                            <TextField
                                id="outlined-Url"
                                label="Config URL"
                                placeholder={'http://localhost:8081'}
                                value={configURL}
                                onChange={handleConfigURLChange}
                            />
                        </Box>
                    </Box>
                </React.Fragment>
            </Grid>
            <Grid
                container
                spacing={1}
                sx={{
                    paddingBottom: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <React.Fragment>
                    <FormControl>
                        <FormLabel
                            sx={{
                                textAlign: 'center',
                            }}
                            id="device-type-label"
                        >
                            Device Type
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="device-type-label"
                            name="Device Type"
                            value={deviceType}
                            onChange={handleChangeType}
                        >
                            <FormControlLabel
                                value="sensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="Sensor"
                            />
                            <FormControlLabel
                                value="presenceSensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="presence Sensor"
                            />
                            <FormControlLabel
                                value="multiSensor"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="multi Sensor"
                            />
                        </RadioGroup>
                    </FormControl>
                </React.Fragment>
            </Grid>
        </React.Fragment>
    );
};
