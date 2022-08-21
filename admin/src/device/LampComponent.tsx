/**
 * Created by alex-issi on 13.07.22
 */
import React from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { SelectID } from '../components/SelectID';
import { handleSelectId } from '../lib/handleSelectID';
import { API } from '../lib/useAPI';
import { Config } from '../lib/Config';
import { createDevice } from '../lib/create_dsDevice';
import { useI18n } from 'iobroker-react/hooks';

export interface LampComponentProps {
    api: API;
    clearInput: () => void;
}

export const LampComponent: React.FC<LampComponentProps> = ({ api, clearInput }): JSX.Element => {
    const { translate: _ } = useI18n();
    const [clear, setClear] = React.useState(false);
    const [deviceType, setDeviceType] = React.useState({
        type: 'lamp',
        function: '0',
    });

    React.useEffect(() => {
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
                            {_('lampComponent-device_type')}
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="device-type-label"
                            name={_('lampComponent-device_type')}
                            value={deviceType.type}
                            onChange={handleChangeType}
                        >
                            <FormControlLabel
                                value="lamp"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label={_('lampComponent-lamp')}
                            />
                            <FormControlLabel
                                value="rgbLamp"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label={_('lampComponent-rgb_lamp')}
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
                                    {_('lampComponent-type')}
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="device-type-label"
                                    name={_('lampComponent-device_type')}
                                    value={deviceType.function}
                                    onChange={handleChangeFunctionType}
                                >
                                    <FormControlLabel
                                        value="0"
                                        sx={{
                                            fontSize: '1.2rem',
                                        }}
                                        control={<Radio />}
                                        label={_('lampComponent-on_off_lamp')}
                                    />
                                    <FormControlLabel
                                        value="1"
                                        sx={{
                                            fontSize: '1.2rem',
                                        }}
                                        control={<Radio />}
                                        label={_('lampComponent-dimmer_lamp')}
                                    />
                                    <FormControlLabel
                                        value="3"
                                        sx={{
                                            fontSize: '1.2rem',
                                        }}
                                        control={<Radio />}
                                        label={_('lampComponent-color_temperature_lamp')}
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
                            title={'lampComponent-onOffSelectID'}
                            type={'lamp'}
                            buttonTitle={'lampComponent-onOffSelectButton'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        {deviceType.function === '1' ? (
                            <SelectID
                                title={'lampComponent-dimmerSelectID'}
                                type={'dimmer'}
                                buttonTitle={'lampComponent-dimmerSelectButton'}
                                clear={clear}
                                onSelect={(selectId, type) => handleSelectId(selectId, type)}
                            />
                        ) : null}
                        {deviceType.function === '3' ? (
                            <React.Fragment>
                                <SelectID
                                    title={'lampComponent-dimmerSelectID'}
                                    type={'dimmer'}
                                    buttonTitle={'lampComponent-dimmerSelectButton'}
                                    clear={clear}
                                    onSelect={(selectId, type) => handleSelectId(selectId, type)}
                                />
                                <SelectID
                                    title={'lampComponent-colorTempSelectID'}
                                    type={'colorTemp'}
                                    buttonTitle={'lampComponent-colorTempSelectButton'}
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
                            title={'lampComponent-onOffSelectID'}
                            type={'lamp'}
                            buttonTitle={'lampComponent-onOffSelectButton'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'lampComponent-dimmerSelectID'}
                            type={'dimmer'}
                            buttonTitle={'lampComponent-dimmerSelectButton'}
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
                            title={'lampComponent-colorModeSelectID'}
                            type={'colorMode'}
                            buttonTitle={'lampComponent-colorModeSelectButton'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'lampComponent-colorTempSelectID'}
                            type={'colorTemp'}
                            buttonTitle={'lampComponent-colorTempSelectButton'}
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
                            title={'lampComponent-hueSelectID'}
                            type={'hue'}
                            buttonTitle={'lampComponent-hueSelectButton'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'lampComponent-saturationSelectID'}
                            type={'saturation'}
                            buttonTitle={'lampComponent-saturationSelectButton'}
                            clear={clear}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'lampComponent-rgbSelectID'}
                            type={'rgbLamp'}
                            buttonTitle={'lampComponent-rgbSelectButton'}
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
                        handleClear();
                    }}
                    variant="outlined"
                >
                    {_('add_new_device')}
                </Button>
            </Grid>
        </React.Fragment>
    );
};
