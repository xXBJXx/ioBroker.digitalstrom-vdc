/**
 * Created by alex-issi on 13.07.22
 */
import React, { useEffect } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { SelectID } from '../components/SelectID';
import { handleSelectId } from '../lib/handleSelectID';
import { API } from '../lib/useAPI';
import { Config } from '../lib/Config';
import { createDevice } from '../lib/create_dsDevice';
import { NameComponent } from '../components/NameComponent';

export interface LampProps {
    api: API;
    clearInput: () => void;
}

export const Lamp: React.FC<LampProps> = ({ api, clearInput }): JSX.Element => {
    const [clear, setClear] = React.useState(false);
    const [deviceType, setDeviceType] = React.useState({
        type: 'lamp',
        function: '0',
    });

    useEffect(() => {
        Config.deviceType = 'lamp';
    }, []);

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeviceType({ ...deviceType, type: (event.target as HTMLInputElement).value });
        Config.deviceType = (event.target as HTMLInputElement).value;
        setClear(!clear);
    };

    const handleChangeFunctionType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeviceType({ ...deviceType, function: (event.target as HTMLInputElement).value });
    };

    const handleClear = () => {
        clearInput();
    };

    return (
        <React.Fragment>
            <NameComponent />
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
                            value={deviceType.type}
                            onChange={handleChangeType}
                        >
                            <FormControlLabel
                                value="lamp"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="Lamp"
                            />
                            <FormControlLabel
                                value="rgbLamp"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="rgb-Lamp"
                            />
                        </RadioGroup>
                    </FormControl>
                </React.Fragment>
            </Grid>
            {deviceType.type === 'lamp' ? (
                <React.Fragment>
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
                                    Type
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="device-type-label"
                                    name="Device Type"
                                    value={deviceType.function}
                                    onChange={handleChangeFunctionType}
                                >
                                    <FormControlLabel
                                        value="0"
                                        sx={{
                                            fontSize: '1.2rem',
                                        }}
                                        control={<Radio />}
                                        label="On/Off Lamp"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        sx={{
                                            fontSize: '1.2rem',
                                        }}
                                        control={<Radio />}
                                        label="Dimmer Lamp"
                                    />
                                    <FormControlLabel
                                        value="3"
                                        sx={{
                                            fontSize: '1.2rem',
                                        }}
                                        control={<Radio />}
                                        label="Color temperature Lamp"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </React.Fragment>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            marginTop: '10px',
                            paddingBottom: '15px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <SelectID
                            title={'OnOffSelectID'}
                            type={'lamp'}
                            buttonTitle={'onOffSelectID'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        {deviceType.function === '1' ? (
                            <SelectID
                                title={'DimmerSelectID'}
                                type={'dimmer'}
                                buttonTitle={'dimmerSelectID'}
                                clear={clear}
                                onSelect={(selectId, type) => handleSelectId(selectId, type)}
                            />
                        ) : null}
                        {deviceType.function === '3' ? (
                            <React.Fragment>
                                <SelectID
                                    title={'DimmerSelectID'}
                                    type={'dimmer'}
                                    buttonTitle={'dimmerSelectID'}
                                    clear={clear}
                                    onSelect={(selectId, type) => handleSelectId(selectId, type)}
                                />
                                <SelectID
                                    title={'ColorTempSelectID'}
                                    type={'colorTemp'}
                                    buttonTitle={'colorTempSelectID'}
                                    clear={clear}
                                    onSelect={(selectId, type) => handleSelectId(selectId, type)}
                                />
                            </React.Fragment>
                        ) : null}
                    </Grid>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            marginTop: '10px',
                            paddingBottom: '15px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <SelectID
                            title={'OnOffSelectID'}
                            type={'lamp'}
                            buttonTitle={'onOffSelectID'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'DimmerSelectID'}
                            type={'dimmer'}
                            buttonTitle={'dimmerSelectID'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            marginTop: '10px',
                            paddingBottom: '15px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <SelectID
                            title={'ColorModeSelectID'}
                            type={'colorMode'}
                            buttonTitle={'colorModeSelectID'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'ColorTempSelectID'}
                            type={'colorTemp'}
                            buttonTitle={'colorTempSelectID'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            marginTop: '10px',
                            paddingBottom: '15px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <SelectID
                            title={'HueSelectID'}
                            type={'hue'}
                            buttonTitle={'hueSelectID'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'SaturationSelectID'}
                            type={'saturation'}
                            buttonTitle={'saturationSelectID'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'RGBSelectID'}
                            type={'rgbLamp'}
                            buttonTitle={'rgbSelectID'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                    </Grid>
                </React.Fragment>
            )}
            <Grid
                container
                spacing={1}
                sx={{
                    marginTop: '10px',
                    paddingBottom: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <Button
                    onClick={async () => {
                        await api.createDevice(createDevice(deviceType));
                        console.log(Config);
                        handleClear();
                        console.log(Config);
                    }}
                    variant="outlined"
                >
                    Add New Device
                </Button>
            </Grid>
        </React.Fragment>
    );
};
