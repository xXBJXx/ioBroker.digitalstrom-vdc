/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { SensorType } from '../components/SensorType';
import { ColorClass } from '../components/ColorClass';
import { NumberInput } from '../components/NumberInput';
import { UnitComponent } from '../components/UnitComponent';
import { SensorUsage } from '../components/SensorUsage';

export interface SensorConfigModalProps {
    open: boolean;
    onClose: () => void;
    selectId: { id: string; index?: number };
    sensorType: 'sensor' | 'multiSensor';
    success?: (index: number) => void;
    //props
}

export const SensorConfigModal: React.FC<SensorConfigModalProps> = ({
    open,
    onClose,
    selectId,
    sensorType,
    success,
}): JSX.Element => {
    const { translate: _ } = useI18n();

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        maxWidth: 'lg',
                        width: '800px',
                    },
                }}
            >
                <DialogTitle align={'center'} id="alert-dialog-title">
                    {_('sensorConfigModal-sensorConfig', selectId.id ? selectId.id : '')}
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            justifyContent: 'space-around',
                        }}
                    >
                        <SensorType sensorType={sensorType} index={selectId.index} />
                        <ColorClass sensorType={sensorType} index={selectId.index} />
                        <SensorUsage sensorType={sensorType} index={selectId.index} />
                        <UnitComponent sensorType={sensorType} index={selectId.index} />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <NumberInput
                                label={_('sensorConfigModal-maxValue')}
                                type={'deviceSensorMax'}
                                sensorType={sensorType}
                                index={selectId.index}
                            />
                            <NumberInput
                                label={_('sensorConfigModal-minValue')}
                                type={'deviceSensorMin'}
                                sensorType={sensorType}
                                index={selectId.index}
                            />
                            <NumberInput
                                label={_('sensorConfigModal-resolution')}
                                type={'deviceSensorResolution'}
                                sensorType={sensorType}
                                index={selectId.index}
                            />
                            <NumberInput
                                label={_('sensorConfigModal-multiplier')}
                                type={'sensorMultiplier'}
                                sensorType={sensorType}
                                index={selectId.index}
                            />
                        </Box>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>{_('sensorConfigModal-cancel')}</Button>
                    <Button
                        onClick={() => {
                            if (success) {
                                if (selectId.index !== undefined) {
                                    if (selectId.index === 0 || selectId.index !== 0) {
                                        success(selectId.index);
                                    }
                                }
                            }
                            onClose();
                        }}
                        autoFocus
                    >
                        {_('sensorConfigModal-success')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
