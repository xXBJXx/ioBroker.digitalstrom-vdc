import { colorGroup } from '../types/dsDevice';
export interface SensorList {
    selectSensor: string;
    sensorMultiplier: number;
    deviceSensorMax: number;
    deviceSensorMin: number;
    deviceSensorSIUnit: string;
    deviceSensorSymbol: string;
    deviceSensorResolution: number;
    color: colorGroup;
    deviceSensorType: number;
    deviceSensorUsage: number;
}

interface Config {
    light: boolean;
    configUrl: string;
    name: string;
    deviceType: string;
    color: colorGroup;
    watchStateID: any;
    addDeviceDeviceType: string;
    basicButton: string;
    DeviceSensorColorClass: string;
    deviceSensorResolution: number;
    DeviceSensorState: string;
    deviceSensorType: number;
    deviceSensorFunction: number;
    deviceSensorUsage: number;
    deviceInputUsage: number;
    deviceSensorMax: number;
    deviceSensorMin: number;
    deviceSensorSIUnit: string;
    deviceSensorSymbol: string;
    showCreateConfirmation: string;
    manualDeviceId: string;
    showSelectId: string;
    selectIdValue: string;
    basicDoorbell: string;
    DeviceRGBLampPowerSwitch: string;
    DeviceRGBLampColormode: string;
    DeviceRGBLampDimmer: string;
    DeviceRGBLampColortemp: string;
    DeviceRGBLampHue: string;
    DeviceRGBLampSaturation: string;
    DeviceRGBLampRGB: string;
    sensorList: SensorList[];
    unitValue: string;
    sensorMultiplier: number;
    OnOffSelectID: string;
    ColorModeSelectID: string;
    ColorTempSelectID: string;
    DimmerSelectID: string;
    HueSelectID: string;
    SaturationSelectID: string;
    RGBSelectID: string;
    sensorSelectID: any;
    buttonSelectID: string;
    buttonSelectID1: string;
    buttonSelectID2: string;
    buttonSelectID3: string;
    doorbellSelectID: string;
    awayButtonSelectID: string;
    binarySensorSelectID: string;
    smokeAlarmSelectID: string;
}

export const initialConfig = {
    deviceConfig: {
        light: false,
        addDeviceDeviceType: '',
        configUrl: '',
        name: '',
        deviceType: '',
        color: 1,
        watchStateID: '',
        deviceSensorResolution: 0,
        basicButton: '',
        DeviceSensorColorClass: '',
        DeviceSensorState: '',
        deviceSensorType: 0,
        deviceSensorFunction: 0,
        deviceSensorUsage: 0,
        deviceInputUsage: 0,
        deviceSensorMax: 0,
        deviceSensorMin: 0,
        deviceSensorSIUnit: '',
        deviceSensorSymbol: '',
        showCreateConfirmation: '',
        manualDeviceId: '',
        showSelectId: '',
        selectIdValue: '',
        basicDoorbell: '',
        DeviceRGBLampPowerSwitch: '',
        DeviceRGBLampColormode: '',
        DeviceRGBLampDimmer: '',
        DeviceRGBLampColortemp: '',
        DeviceRGBLampHue: '',
        DeviceRGBLampSaturation: '',
        DeviceRGBLampRGB: '',
        sensorList: [],
        unitValue: '',
        sensorMultiplier: 1,
        OnOffSelectID: '',
        ColorModeSelectID: '',
        ColorTempSelectID: '',
        DimmerSelectID: '',
        HueSelectID: '',
        SaturationSelectID: '',
        RGBSelectID: '',
        sensorSelectID: '',
        buttonSelectID: '',
        buttonSelectID1: '',
        buttonSelectID2: '',
        buttonSelectID3: '',
        doorbellSelectID: '',
        awayButtonSelectID: '',
        binarySensorSelectID: '',
        smokeAlarmSelectID: '',
    },
};

export let Config: Config = {
    light: false,
    configUrl: '',
    name: '',
    deviceType: '',
    color: 1,
    watchStateID: '',
    addDeviceDeviceType: '',
    basicButton: '',
    DeviceSensorColorClass: '',
    deviceSensorResolution: 0,
    DeviceSensorState: '',
    deviceSensorType: 0,
    deviceSensorFunction: 0,
    deviceSensorUsage: 0,
    deviceInputUsage: 0,
    deviceSensorMax: 0,
    deviceSensorMin: 0,
    deviceSensorSIUnit: '',
    deviceSensorSymbol: '',
    showCreateConfirmation: '',
    manualDeviceId: '',
    showSelectId: '',
    selectIdValue: '',
    basicDoorbell: '',
    DeviceRGBLampPowerSwitch: '',
    DeviceRGBLampColormode: '',
    DeviceRGBLampDimmer: '',
    DeviceRGBLampColortemp: '',
    DeviceRGBLampHue: '',
    DeviceRGBLampSaturation: '',
    DeviceRGBLampRGB: '',
    sensorList: [],
    unitValue: '',
    sensorMultiplier: 1,
    OnOffSelectID: '',
    ColorModeSelectID: '',
    ColorTempSelectID: '',
    DimmerSelectID: '',
    HueSelectID: '',
    SaturationSelectID: '',
    RGBSelectID: '',
    sensorSelectID: '',
    buttonSelectID: '',
    buttonSelectID1: '',
    buttonSelectID2: '',
    buttonSelectID3: '',
    doorbellSelectID: '',
    awayButtonSelectID: '',
    binarySensorSelectID: '',
    smokeAlarmSelectID: '',
};

export const clearConfig = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Config = initialConfig.deviceConfig;
    console.log('Config cleared');
    console.log(Config);
};
