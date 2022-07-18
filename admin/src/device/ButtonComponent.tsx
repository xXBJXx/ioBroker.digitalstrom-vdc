/**
 * Created by alex-issi on 15.07.22
 */
import React, { useEffect } from 'react';
import { NameComponent } from '../components/NameComponent';
import { SelectID } from '../components/SelectID';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { handleSelectId } from '../lib/handleSelectID';
import { createDevice } from '../lib/create_dsDevice';
import { API } from '../lib/useAPI';
import { Config } from '../lib/Config';

export interface ButtonComponentProps {
    api: API;
    clearInput: () => void;
    //props
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({ api, clearInput }): JSX.Element => {
    const [clearSelect, setClearSelect] = React.useState(false);
    const [deviceType, setDeviceType] = React.useState({
        type: 'button',
        function: '6',
    });
    useEffect(() => {
        Config.deviceType = 'button';
    }, []);

    const handleChangeFunctionType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeviceType({ ...deviceType, function: (event.target as HTMLInputElement).value });
        setClearSelect(!clearSelect);
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
                            id="device-type-label"
                            sx={{
                                textAlign: 'center',
                            }}
                        >
                            Device Type
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="device-type-label"
                            name="Device Type"
                            value={deviceType.function}
                            onChange={handleChangeFunctionType}
                        >
                            <FormControlLabel
                                value="6"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="on-off"
                            />
                            <FormControlLabel
                                value="1"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="single"
                            />
                            <FormControlLabel
                                value="2"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="2-way"
                            />
                            <FormControlLabel
                                value="3"
                                sx={{
                                    fontSize: '1.2rem',
                                }}
                                control={<Radio />}
                                label="4-way"
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
                    title={'buttonSelectID'}
                    type={'button0'}
                    buttonTitle={'buttonSelectIDButton'}
                    clear={clearSelect}
                    onSelect={(selectId, type) => {
                        handleSelectId(selectId, type);
                    }}
                />
                {deviceType.function === '2' ? (
                    <SelectID
                        title={'buttonSelectID1'}
                        type={'button1'}
                        buttonTitle={'buttonSelectIDButton'}
                        clear={clearSelect}
                        onSelect={(selectId, type) => {
                            handleSelectId(selectId, type);
                        }}
                    />
                ) : null}
                {deviceType.function === '3' ? (
                    <React.Fragment>
                        <SelectID
                            title={'buttonSelectID1'}
                            type={'button1'}
                            buttonTitle={'buttonSelectIDButton'}
                            clear={clearSelect}
                            onSelect={(selectId, type) => {
                                handleSelectId(selectId, type);
                            }}
                        />
                        <SelectID
                            title={'buttonSelectID2'}
                            type={'button2'}
                            buttonTitle={'buttonSelectIDButton'}
                            clear={clearSelect}
                            onSelect={(selectId, type) => {
                                handleSelectId(selectId, type);
                            }}
                        />
                        <SelectID
                            title={'buttonSelectID3'}
                            type={'button3'}
                            buttonTitle={'buttonSelectIDButton'}
                            clear={clearSelect}
                            onSelect={(selectId, type) => {
                                handleSelectId(selectId, type);
                            }}
                        />
                    </React.Fragment>
                ) : null}
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
                <Button
                    onClick={async () => {
                        await api.createDevice(createDevice(deviceType));
                        handleClear();
                    }}
                    variant="outlined"
                >
                    Add New Device
                </Button>
            </Grid>
        </React.Fragment>
    );
};
