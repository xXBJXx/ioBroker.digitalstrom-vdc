import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { clearConfig, Config } from '../lib/Config';
import { useAPI } from '../lib/useAPI';
import { Sensor } from '../device/SensorComponents';
import { Lamp } from '../device/LampComponent';
import { ButtonComponent } from '../device/ButtonComponent';
import { DoorbellComponent } from '../device/DoorbellComponent';
import { SmokeAlarmComponent } from '../device/SmokeAlarmComponent';
import { AwayButtonComponent } from '../device/AwayButtonComponent';
import { SensorConfigModal } from '../modal/SensorConfigModal';

const deviceTypeOptions = [
    {
        label: 'Select Device type',
        disabled: true,
        value: 'selectDevice',
    },
    {
        label: 'lamp',
        value: 'lamp',
    },
    {
        label: 'sensor',
        value: 'sensor',
    },
    {
        label: 'smokeAlarm',
        value: 'smokeAlarm',
    },
    {
        label: 'button',
        value: 'button',
    },
    {
        label: 'doorbell',
        value: 'doorbell',
    },
    {
        label: 'awayButton',
        value: 'awayButton',
    },
];

export const SelectDeviceType = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [deviceType, setDeviceType] = useState('selectDevice');
    const [open, setOpen] = React.useState(false);

    const handleDeviceType = (event: SelectChangeEvent) => {
        console.log(Config);
        setDeviceType(event.target.value);
    };

    const clear = () => {
        setDeviceType('selectDevice');
        clearConfig();
    };

    const api = useAPI();

    const deviceTypeSelect = () => {
        const menuItem: JSX.Element[] = [];
        for (const key in deviceTypeOptions) {
            menuItem.push(
                <MenuItem
                    disabled={deviceTypeOptions[key].disabled}
                    key={key + deviceTypeOptions[key].label}
                    value={deviceTypeOptions[key].value}
                >{`${_(deviceTypeOptions[key].label)}`}</MenuItem>,
            );
        }
        return menuItem;
    };

    return (
        <React.Fragment>
            <React.Fragment>
                {/*<SensorConfigModal*/}
                {/*    open={true}*/}
                {/*    onClose={() => setOpen(false)}*/}
                {/*    selectId={'digitalstrom-vdc.0.plugins.sentry.enabled'}*/}
                {/*/>*/}
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
                    <Box sx={{ minWidth: 120, maxWidth: 300, width: '250px' }}>
                        <FormControl>
                            <InputLabel id="DeviceType-select-label">{_('Select Device type')}</InputLabel>
                            <Select
                                labelId="DeviceType-select-label"
                                id="DeviceType"
                                value={deviceType}
                                label="select device Type"
                                onChange={handleDeviceType}
                                sx={{ width: 250 }}
                            >
                                {deviceTypeSelect()}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </React.Fragment>
            {deviceType === 'lamp' ? <Lamp api={api} clearInput={() => clear()} /> : null}
            {deviceType === 'sensor' ? (
                <React.Fragment>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            marginTop: '10px',
                            paddingBottom: '15px',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <Sensor api={api} clearInput={() => clear()} />
                    </Grid>
                </React.Fragment>
            ) : null}
            {deviceType === 'smokeAlarm' ? (
                <React.Fragment>
                    <SmokeAlarmComponent api={api} clearInput={() => clear()} />
                </React.Fragment>
            ) : null}
            {deviceType === 'button' ? (
                <React.Fragment>
                    <ButtonComponent api={api} clearInput={() => clear()} />
                </React.Fragment>
            ) : null}
            {deviceType === 'doorbell' ? (
                <React.Fragment>
                    <DoorbellComponent api={api} clearInput={() => clear()} />
                </React.Fragment>
            ) : null}
            {deviceType === 'awayButton' ? (
                <React.Fragment>
                    <AwayButtonComponent api={api} clearInput={() => clear()} />
                </React.Fragment>
            ) : null}
        </React.Fragment>
    );
};
