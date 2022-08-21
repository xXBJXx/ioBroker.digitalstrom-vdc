/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { Config } from '../lib/Config';
import { Button, Grid } from '@mui/material';
import { SelectID } from '../components/SelectID';
import { handleSelectId } from '../lib/handleSelectID';
import { createDevice } from '../lib/create_dsDevice';
import { API } from '../lib/useAPI';
import { useI18n } from 'iobroker-react/hooks';

export interface AwayButtonComponentProps {
    api: API;
    clearInput: () => void;
    //props
}

export const AwayButtonComponent: React.FC<AwayButtonComponentProps> = ({ api, clearInput }): JSX.Element => {
    const { translate: _ } = useI18n();
    React.useEffect(() => {
        Config.deviceType = 'awayButton';
    }, []);

    const handleClear = () => {
        clearInput();
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
                    justifyContent: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <SelectID
                    title={'awayButtonComponent-awaySelectID'}
                    type={'awayButton'}
                    buttonTitle={'awayButtonComponent-SelectButton'}
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
                    {_('add_new_device')}
                </Button>
            </Grid>
        </React.Fragment>
    );
};
