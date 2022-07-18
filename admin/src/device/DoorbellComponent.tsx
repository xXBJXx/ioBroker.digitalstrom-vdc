/**
 * Created by alex-issi on 16.07.22
 */
import React, { useEffect } from 'react';
import { NameComponent } from '../components/NameComponent';
import { Button, Grid } from '@mui/material';
import { API } from '../lib/useAPI';
import { createDevice } from '../lib/create_dsDevice';
import { SelectID } from '../components/SelectID';
import { handleSelectId } from '../lib/handleSelectID';
import { Config } from '../lib/Config';

export interface DoorbellComponentProps {
    api: API;
    clearInput: () => void;
    //props
}

export const DoorbellComponent: React.FC<DoorbellComponentProps> = ({ api, clearInput }): JSX.Element => {
    useEffect(() => {
        Config.deviceType = 'doorbell';
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
                    title={'doorbellSelectID'}
                    type={'doorbell'}
                    buttonTitle={'doorbellSelectButton'}
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
                                type: 'doorbell',
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
