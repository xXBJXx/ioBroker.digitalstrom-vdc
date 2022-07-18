/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { SelectID } from '../components/SelectID';
import { Button, Grid } from '@mui/material';
import { handleSelectId } from '../lib/handleSelectID';
import { SensorConfigModal } from '../modal/SensorConfigModal';

export interface SensorComponentProps {
    //props
}

export const SensorComponent: React.FC<SensorComponentProps> = (): JSX.Element => {
    const [selectId, setSelectId] = React.useState<string | undefined>('');
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <SensorConfigModal open={open} onClose={() => setOpen(false)} selectId={selectId} />
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
                    title={'sensorSelectID'}
                    type={'sensor'}
                    buttonTitle={'sensorSelectButton'}
                    onSelect={(selectId, type) => {
                        handleSelectId(selectId, type);
                        setSelectId(selectId);
                    }}
                />
            </Grid>
            {selectId !== '' ? (
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
                            Sensor Config
                        </Button>
                    </React.Fragment>
                </Grid>
            ) : null}
        </React.Fragment>
    );
};
