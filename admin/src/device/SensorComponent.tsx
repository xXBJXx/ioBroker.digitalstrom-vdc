/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { SelectID } from '../components/SelectID';
import { Button, Grid } from '@mui/material';
import { handleSelectId } from '../lib/handleSelectID';
import { SensorConfigModal } from '../modal/SensorConfigModal';
import { useI18n } from 'iobroker-react/hooks';

export const SensorComponent = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [idObj, setSelectIdObj] = React.useState<{ id: string; index?: number }>({ id: '', index: 0 });
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <SensorConfigModal open={open} onClose={() => setOpen(false)} selectId={idObj} sensorType={'sensor'} />
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
                    title={'sensorComponent-sensorSelectID'}
                    type={'sensor'}
                    buttonTitle={'sensorComponent-sensorSelectButton'}
                    onSelect={(selectId, type) => {
                        if (selectId !== undefined) {
                            handleSelectId(selectId, type);
                            setSelectIdObj({ id: selectId });
                        }
                    }}
                />
            </Grid>
            {idObj.id !== '' ? (
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
                        <Button variant={'outlined'} onClick={() => setOpen(!open)}>
                            {_('sensorComponent-sensor_config')}
                        </Button>
                    </React.Fragment>
                </Grid>
            ) : null}
        </React.Fragment>
    );
};
