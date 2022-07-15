import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';
import React, { useState } from 'react';
import { Config } from '../lib/Config';
import { SelectColorClassOptions } from './ColorClassOption';
import DefineConfigURL from './DefineConfigURL';
import DefineName from './DefineName';
import DefineResolution from './DefineResolution';
import { useAPI } from '../lib/useAPI';
import { dsDevice } from '../types/dsDevice';
import { SelectID } from '../components/SelectID';
import { handleSelectId } from '../lib/handleSelectID';
import { Lamp } from '../device/Lamp';
import { MultiSelectTable } from '../components/MultiSelectTable';
import { Sensor } from '../device/Sensor';

//const deviceTypeOptions: { value: string; title: string }[] = [
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
        label: 'presenceSensor',
        value: 'presenceSensor',
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
        label: 'multiSensor',
        value: 'multiSensor',
    },
    {
        label: 'awayButton',
        value: 'awayButton',
    },
];

export const SelectDeviceType = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [deviceType, sethandleDeviceType] = useState('selectDevice');

    const handleDeviceType = (event: SelectChangeEvent) => {
        console.log(Config);

        sethandleDeviceType(event.target.value);
        console.log(event.target.value);
        Config.deviceType = event.target.value;
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
            {deviceType === 'lamp' ? <Lamp api={api} /> : null}

            {deviceType === 'rgbLamp' ? (
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
                        <React.Fragment>
                            <DefineName />
                            <DefineConfigURL />
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
                        <SelectID
                            title={'OnOffSelectID'}
                            type={'lamp'}
                            buttonTitle={'onOffSelectID'}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'DimmerSelectID'}
                            type={'dimmer'}
                            buttonTitle={'dimmerSelectID'}
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
                        <SelectID
                            title={'ColorModeSelectID'}
                            type={'colorMode'}
                            buttonTitle={'colorModeSelectID'}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'ColorTempSelectID'}
                            type={'colorTemp'}
                            buttonTitle={'colorTempSelectID'}
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
                        <SelectID
                            title={'HueSelectID'}
                            type={'hue'}
                            buttonTitle={'hueSelectID'}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'SaturationSelectID'}
                            type={'saturation'}
                            buttonTitle={'saturationSelectID'}
                            onSelect={(selectId, type) => handleSelectId(selectId, type)}
                        />
                        <SelectID
                            title={'RGBSelectID'}
                            type={'rgbLamp'}
                            buttonTitle={'rgbSelectID'}
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
                                // {
                                //     console.log('click to open Add Mock Device');
                                //     console.log(JSON.stringify(await api.listDevices()));
                                //     const testDevice: dsDevice = {
                                //         name: Config.name,
                                //         deviceType: Config.deviceType,
                                //         watchStateID: { button_0: 'test2' },
                                //         id: '1234567',
                                //         dsConfig: {
                                //             dSUID: '123455678',
                                //             primaryGroup: 1,
                                //             name: Config.name,
                                //             modelFeatures: {
                                //                 highlevel: true,
                                //             },
                                //             displayId: '',
                                //             model: 'ioBroker',
                                //             modelUID: 'UUID',
                                //             modelVersion: '0.0.1',
                                //             vendorName: 'KOS',
                                //         },
                                //     };
                                //     console.log(JSON.stringify(await api.createDevice(testDevice)));
                                //     console.log(JSON.stringify(await api.listDevices()));
                                // }
                            }}
                            variant="outlined"
                        >
                            Add New Device
                        </Button>
                    </Grid>
                </React.Fragment>
            ) : null}
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
                        <React.Fragment>
                            <Sensor />
                        </React.Fragment>
                    </Grid>
                </React.Fragment>
            ) : null}
            {deviceType === 'presenceSensor' ? (
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
                        <React.Fragment>
                            <DefineName />
                            <DefineConfigURL />
                        </React.Fragment>
                    </Grid>
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
                        <h1>test1</h1>
                    </Grid>
                </React.Fragment>
            ) : null}
            {deviceType === 'smokeAlarm' ? (
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
                        <React.Fragment>
                            <DefineName />
                            <DefineConfigURL />
                        </React.Fragment>
                    </Grid>
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
                        <h1>test1</h1>
                    </Grid>
                </React.Fragment>
            ) : null}
            {deviceType === 'button' ? (
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
                        <React.Fragment>
                            <DefineName />
                            <DefineConfigURL />
                        </React.Fragment>
                    </Grid>
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
                        <h1>test1</h1>
                    </Grid>
                </React.Fragment>
            ) : null}
            {deviceType === 'doorbell' ? (
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
                        <React.Fragment>
                            <DefineName />
                            <DefineConfigURL />
                        </React.Fragment>
                    </Grid>
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
                        <h1>test1</h1>
                    </Grid>
                </React.Fragment>
            ) : null}
            {deviceType === 'multiSensor' ? (
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
                        <DefineName />
                        <DefineConfigURL />
                    </Grid>
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
                        <MultiSelectTable />
                    </Grid>
                </React.Fragment>
            ) : null}
            {deviceType === 'awayButton' ? (
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
                        <DefineName />
                        <DefineConfigURL />
                    </Grid>
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
                        <h1>test2</h1>
                        <h1>test2</h1>
                    </Grid>
                </React.Fragment>
            ) : null}
        </React.Fragment>
    );
};
