/**
 * Created by alex-issi on 16.07.22
 */
import React, { useEffect } from 'react';
import { Config } from '../lib/Config';
import { NameComponent } from '../components/NameComponent';
import { Button, Grid } from '@mui/material';
import { SelectID } from '../components/SelectID';
import { handleSelectId } from '../lib/handleSelectID';
import { createDevice } from '../lib/create_dsDevice';
import { API } from '../lib/useAPI';

export interface AwayButtonComponentProps {
    api: API;
    clearInput: () => void;
    //props
}

export const AwayButtonComponent: React.FC<AwayButtonComponentProps> = ({ api, clearInput }): JSX.Element => {
    useEffect(() => {
        Config.deviceType = 'awayButton';
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
                <SelectID
                    title={'awayButtonSelectID'}
                    type={'awayButton'}
                    buttonTitle={'awayButtonSelectButton'}
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
                <Button
                    onClick={async () => {
                        await api.createDevice(
                            createDevice({
                                type: 'awayButton',
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
