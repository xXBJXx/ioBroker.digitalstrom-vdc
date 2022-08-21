import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React from 'react';
import { clearConfig, Config } from '../lib/Config';
import { useAPI } from '../lib/useAPI';
import { SensorComponents } from '../device/SensorComponents';
import { LampComponent } from '../device/LampComponent';
import { ButtonComponent } from '../device/ButtonComponent';
import { DoorbellComponent } from '../device/DoorbellComponent';
import { AwayButtonComponent } from '../device/AwayButtonComponent';
import { ConfigHeader } from '../components/ConfigHeader';

const deviceTypeOptions = [
    {
        label: 'deviceTypeOptions-select_device_type',
        disabled: true,
        value: 'selectDevice',
    },
    {
        label: 'deviceTypeOptions-lamp',
        value: 'lamp',
    },
    {
        label: 'deviceTypeOptions-sensor',
        value: 'sensor',
    },
    {
        label: 'deviceTypeOptions-button',
        value: 'button',
    },
    {
        label: 'deviceTypeOptions-doorbell',
        value: 'doorbell',
    },
    {
        label: 'deviceTypeOptions-awayButton',
        value: 'awayButton',
    },
];

export const SelectDeviceType = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [deviceType, setDeviceType] = React.useState('selectDevice');
    const [clearHeader, setClearHeader] = React.useState(false);

    const handleDeviceType = (event: SelectChangeEvent) => {
        console.log(Config);
        setDeviceType(event.target.value);
    };

    const clear = () => {
        setDeviceType('selectDevice');
        clearConfig();
        setClearHeader(!clearHeader);
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
                    divider
                    sx={{
                        justifyContent: 'center',
                    }}
                >{`${_(deviceTypeOptions[key].label)}`}</MenuItem>,
            );
        }
        return menuItem;
    };

    return (
        <React.Fragment>
            <React.Fragment>
                <ConfigHeader api={api} clearInput={clearHeader} />
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
                            <InputLabel id="deviceType-select-label">
                                {_('deviceTypeOptions-device_types-select')}
                            </InputLabel>
                            <Select
                                labelId="deviceType-select-label"
                                id="deviceType"
                                value={deviceType}
                                label={_('deviceTypeOptions-device_types-select')}
                                onChange={handleDeviceType}
                                sx={{ width: 250 }}
                            >
                                {deviceTypeSelect()}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </React.Fragment>
            {deviceType === 'lamp' ? <LampComponent api={api} clearInput={() => clear()} /> : null}
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
                        <SensorComponents api={api} clearInput={() => clear()} />
                    </Grid>
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
