/**
 * Created by alex-issi on 16.07.22
 */
import React, { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { SensorUsageComponent } from '../components/SensorUsageComponent';
import { SelectID } from '../components/SelectID';
import { handleSelectId } from '../lib/handleSelectID';
import { API } from '../lib/useAPI';
import { createDevice } from '../lib/create_dsDevice';
import { Config } from '../lib/Config';
import { NameComponent } from '../components/NameComponent';

export interface SmokeAlarmComponentProps {
    api: API;
    clearInput: () => void;
    //props
}

export const SmokeAlarmComponent: React.FC<SmokeAlarmComponentProps> = ({ api, clearInput }): JSX.Element => {
    useEffect(() => {
        Config.deviceType = 'smokeAlarm';
    }, []);

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
                    marginTop: '10px',
                    paddingBottom: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <React.Fragment>
                    <SensorUsageComponent />
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
                    <SelectID
                        title={'smokeAlarmSelectID'}
                        type={'smokeAlarm'}
                        buttonTitle={'smokeAlarmSelectIDButton'}
                        onSelect={(selectId, type) => {
                            handleSelectId(selectId, type);
                        }}
                    />
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
                <Button
                    onClick={async () => {
                        await api.createDevice(
                            createDevice({
                                type: 'smokeAlarm',
                            }),
                        );
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
