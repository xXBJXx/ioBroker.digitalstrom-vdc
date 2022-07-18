/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { SensorTypeComponent } from '../components/SensorTypeComponent';
import { ColorClassComponent } from '../components/ColorClassComponent';
import { NumberInput } from '../components/NumberInput';
import { UnitComponent } from '../components/UnitComponent';
import { SensorUsageComponent } from '../components/SensorUsageComponent';

export interface SensorConfigModalProps {
    open: boolean;
    onClose: () => void;
    selectId: string | undefined;
    //props
}

export const SensorConfigModal: React.FC<SensorConfigModalProps> = ({ open, onClose, selectId }): JSX.Element => {
    const { translate: _ } = useI18n();

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        maxWidth: 'lg',
                        width: '800px',
                    },
                }}
            >
                <DialogTitle align={'center'} id="alert-dialog-title">
                    {_('sensorConfig', selectId ? selectId : '')}
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            justifyContent: 'space-around',
                        }}
                    >
                        <SensorTypeComponent />
                        <ColorClassComponent />
                        <SensorUsageComponent />
                        <UnitComponent />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <NumberInput label={'maxValue'} type={'deviceSensorMax'} />
                            <NumberInput label={'minValue'} type={'deviceSensorMin'} />
                            <NumberInput label={'resolution'} type={'deviceSensorResolution'} />
                            <NumberInput label={'multiplier'} type={'sensorMultiplier'} />
                        </Box>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>{_('cancel')}</Button>
                    <Button onClick={onClose} autoFocus>
                        {_('success')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
