import { Config } from './Config';
import { genDSUID } from './genDSUID';
import {
    binaryInputDescription,
    binaryInputSetting,
    dsDevice,
    modifiers,
    sensorDescription,
    sensorSetting,
    watchStateID,
} from '../types/dsDevice';
import { scenes } from './Scenes';

export const createDevice = (deviceType: { type: string; function?: string }): dsDevice | null => {
    if (deviceType.type === 'lamp') {
        const device: dsDevice = {
            name: Config.name,
            deviceType: Config.deviceType,
            watchStateID: { light: Config.OnOffSelectID },
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            dsConfig: {
                dSUID: genDSUID(34),
                primaryGroup: 1,
                name: Config.name,
                configURL: Config.configUrl,
                modelFeatures: {
                    blink: true,
                    dontcare: true,
                    identification: true,
                    outmode: true,
                    outvalue8: true,
                    transt: true,
                },
                displayId: '',
                model: 'ioBroker',
                modelUID: genDSUID(34),
                modelVersion: '0.0.1',
                vendorName: 'KYUKA',
                channelDescriptions: [
                    {
                        brightness: {
                            channelType: 1,
                            dsIndex: 0,
                            max: 100,
                            min: 0,
                            name: 'brightness',
                            resolution: 0.39215686274509803,
                            siunit: 'percent',
                            symbol: '%',
                        },
                    },
                ],
                outputDescription: [
                    {
                        objName: 'light_0',
                        name: 'light',
                        dsIndex: 0,
                        maxPower: -1,
                        function: 1,
                        outputUsage: 0,
                        type: 'output',
                        variableRamp: false,
                    },
                ],
                outputSettings: [
                    {
                        objName: 'light_0',
                        dimTimeDown: 15,
                        dimTimeDownAlt1: 162,
                        dimTimeDownAlt2: 104,
                        dimTimeUp: 15,
                        dimTimeUpAlt1: 162,
                        dimTimeUpAlt2: 104,
                        minBrightness: 0.39215686274509803,
                        onThreshold: 50,
                        pushChanges: false,
                        mode: 2,
                        groups: [1],
                    },
                ],
                scenes: scenes,
            },
        };
        if (deviceType.function !== undefined) {
            if (parseFloat(deviceType.function) === 0) {
                if (device.dsConfig.outputDescription) {
                    device.dsConfig.outputDescription[0].function = 0;
                }
            }
            if (parseFloat(deviceType.function) === 1) {
                if (device.dsConfig.outputDescription) {
                    device.dsConfig.outputDescription[0].function = 1;
                    device.watchStateID.brightness = Config.DimmerSelectID;
                }
            }
            if (parseFloat(deviceType.function) === 3) {
                if (device.dsConfig.outputDescription) {
                    device.dsConfig.outputDescription[0].function = 3;
                    device.watchStateID.brightness = Config.DimmerSelectID;
                    device.watchStateID.colortemp = Config.ColorTempSelectID;
                    if (device.dsConfig.channelDescriptions) {
                        device.dsConfig.channelDescriptions.push({
                            colortemp: {
                                channelType: 4,
                                dsIndex: 3,
                                max: 1000,
                                min: 100,
                                name: 'color temperature',
                                resolution: 1,
                                siunit: 'mired',
                                symbol: 'mired',
                            },
                        });
                    }
                }
            }
        }
        return device;
    }
    if (deviceType.type === 'rgbLamp') {
        return {
            name: Config.name,
            deviceType: Config.deviceType,
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            watchStateID: {
                //switch: Config.OnOffSelectID,
                //switchModeColor: Config.ColorModeSelectID,
                brightness: Config.DimmerSelectID,
                colortemp: Config.ColorTempSelectID,
                hue: Config.HueSelectID,
                saturation: Config.SaturationSelectID,
                //rgb: Config.RGBSelectID,
                x: '',
                y: '',
            },
            dsConfig: {
                dSUID: genDSUID(34),
                primaryGroup: 1,
                name: Config.name,
                configURL: Config.configUrl,
                modelFeatures: {
                    blink: true,
                    dontcare: true,
                    identification: true,
                    outmode: true,
                    outputchannels: true,
                    outvalue8: true,
                    transt: true,
                },
                displayId: '',
                model: 'ioBroker',
                modelUID: genDSUID(34),
                modelVersion: '0.0.1',
                vendorName: 'KYUKA',
                channelDescriptions: [
                    {
                        brightness: {
                            channelType: 1,
                            dsIndex: 0,
                            max: 100,
                            min: 0,
                            name: 'brightness',
                            resolution: 0.39215686274509803,
                            siunit: 'percent',
                            symbol: '%',
                        },
                        colortemp: {
                            channelType: 4,
                            dsIndex: 3,
                            max: 1000,
                            min: 100,
                            name: 'color temperature',
                            resolution: 1,
                            siunit: 'mired',
                            symbol: 'mired',
                        },
                        hue: {
                            channelType: 2,
                            dsIndex: 1,
                            max: 360,
                            min: 0,
                            name: 'hue',
                            resolution: 0.1,
                            siunit: 'degree',
                            symbol: '°',
                        },
                        saturation: {
                            channelType: 3,
                            dsIndex: 2,
                            max: 100,
                            min: 0,
                            name: 'saturation',
                            resolution: 0.1,
                            siunit: 'percent',
                            symbol: '%',
                        },
                        x: {
                            channelType: 5,
                            dsIndex: 4,
                            max: 1,
                            min: 0,
                            name: 'CIE x',
                            resolution: 0.01,
                            siunit: 'none',
                            symbol: '',
                        },
                        y: {
                            channelType: 6,
                            dsIndex: 5,
                            max: 1,
                            min: 0,
                            name: 'CIE y',
                            resolution: 0.01,
                            siunit: 'none',
                            symbol: '',
                        },
                    },
                ],
                outputDescription: [
                    {
                        objName: 'light_0',
                        name: 'rgblight',
                        dsIndex: 0,
                        maxPower: -1,
                        function: 4,
                        outputUsage: 0,
                        type: 'output',
                        variableRamp: true,
                    },
                ],
                outputSettings: [
                    {
                        objName: 'light_0',
                        dimTimeDown: 15,
                        dimTimeDownAlt1: 162,
                        dimTimeDownAlt2: 104,
                        dimTimeUp: 15,
                        dimTimeUpAlt1: 162,
                        dimTimeUpAlt2: 104,
                        minBrightness: 0.39215686274509803,
                        onThreshold: 50,
                        pushChanges: false,
                        mode: 2,
                        groups: [1],
                    },
                ],
                scenes: scenes,
            },
        };
    }
    if (deviceType.type === 'button') {
        const device: dsDevice = {
            name: Config.name,
            deviceType: Config.deviceType,
            watchStateID: { button_0: Config.buttonSelectID },
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            dsConfig: {
                dSUID: genDSUID(34),
                primaryGroup: 8,
                name: Config.name,
                configURL: Config.configUrl,
                modelFeatures: {
                    highlevel: true,
                    jokerconfig: true,
                    pushbadvanced: true,
                    pushbarea: true,
                    pushbutton: true,
                },
                displayId: '',
                model: 'ioBroker',
                modelUID: genDSUID(34),
                modelVersion: '0.0.1',
                vendorName: 'KYUKA',
                buttonInputDescriptions: [
                    {
                        objName: 'button_0',
                        name: 'button_0',
                        buttonElementID: 0,
                        buttonID: 0,
                        buttonType: 1,
                        combinables: 0,
                        dsIndex: 0,
                        supportsLocalKeyMode: 0,
                        type: 'buttonInput',
                    },
                ],
                buttonInputSettings: [
                    {
                        callsPresent: 0,
                        channel: 0,
                        function: 0,
                        group: 1,
                        mode: 0,
                        setsLocalPriority: 0,
                        objName: 'button_0',
                    },
                ],
            },
        };
        if (deviceType.function !== undefined) {
            if (parseFloat(deviceType.function) === 1) {
                if (device.dsConfig.buttonInputDescriptions) {
                    device.dsConfig.buttonInputDescriptions[0].buttonType = 1;
                }
            }
            if (parseFloat(deviceType.function) === 2) {
                if (device.dsConfig.buttonInputDescriptions) {
                    device.dsConfig.buttonInputDescriptions[0].buttonType = 2;
                    device.watchStateID.button_1 = Config.buttonSelectID1;
                }
            }
            if (parseFloat(deviceType.function) === 3) {
                if (device.dsConfig.buttonInputDescriptions) {
                    device.dsConfig.buttonInputDescriptions[0].buttonType = 3;
                    device.watchStateID.button_1 = Config.buttonSelectID1;
                    device.watchStateID.button_2 = Config.buttonSelectID2;
                    device.watchStateID.button_3 = Config.buttonSelectID3;
                }
            }
            if (parseFloat(deviceType.function) === 6) {
                if (device.dsConfig.buttonInputDescriptions) {
                    device.dsConfig.buttonInputDescriptions[0].buttonType = 6;
                }
            }
        }
        return device;
    }
    if (deviceType.type === 'doorbell') {
        return {
            name: Config.name,
            deviceType: Config.deviceType,
            watchStateID: { button_0: Config.doorbellSelectID },
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            dsConfig: {
                dSUID: genDSUID(34),
                primaryGroup: 8,
                name: Config.name,
                configURL: Config.configUrl,
                modelFeatures: {
                    highlevel: true,
                    jokerconfig: true,
                    pushbadvanced: true,
                    pushbarea: true,
                    pushbutton: true,
                },
                displayId: '',
                model: 'ioBroker',
                modelUID: genDSUID(34),
                modelVersion: '0.0.1',
                vendorName: 'KYUKA',
                buttonInputDescriptions: [
                    {
                        objName: 'button_0',
                        name: 'button_0',
                        buttonElementID: 0,
                        buttonID: 0,
                        buttonType: 1,
                        dsIndex: 0,
                        supportsLocalKeyMode: 0,
                        type: 'buttonInput',
                    },
                ],
                buttonInputSettings: [
                    {
                        callsPresent: 0,
                        channel: 0,
                        function: 5,
                        group: 8,
                        mode: 0,
                        setsLocalPriority: 0,
                        objName: 'button_0',
                    },
                ],
            },
        };
    }
    if (deviceType.type === 'awayButton') {
        return {
            name: Config.name,
            deviceType: Config.deviceType,
            watchStateID: { button_0: Config.awayButtonSelectID },
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            dsConfig: {
                dSUID: genDSUID(34),
                primaryGroup: 8,
                name: Config.name,
                configURL: Config.configUrl,
                modelFeatures: {
                    highlevel: true,
                    jokerconfig: true,
                    pushbadvanced: true,
                    pushbarea: true,
                    pushbutton: true,
                },
                displayId: '',
                model: 'ioBroker',
                modelUID: genDSUID(34),
                modelVersion: '0.0.1',
                vendorName: 'KYUKA',
                buttonInputDescriptions: [
                    {
                        objName: 'button_0',
                        name: 'button_0',
                        buttonElementID: 0,
                        buttonID: 0,
                        buttonType: 1,
                        combinables: 0,
                        dsIndex: 0,
                        supportsLocalKeyMode: 0,
                        type: 'buttonInput',
                    },
                ],
                buttonInputSettings: [
                    {
                        callsPresent: 0,
                        channel: 0,
                        function: 3,
                        group: 1,
                        mode: 0,
                        setsLocalPriority: 0,
                        objName: 'button_0',
                    },
                ],
            },
        };
    }
    if (deviceType.type === 'binarySensor') {
        return {
            name: Config.name,
            deviceType: Config.deviceType,
            watchStateID: { generic_0: Config.binarySensorSelectID },
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            dsConfig: {
                dSUID: genDSUID(34),
                primaryGroup: 8,
                name: Config.name,
                configURL: Config.configUrl,
                modelFeatures: {
                    highlevel: true,
                    akmsensor: true,
                    jokerconfig: true,
                },
                displayId: '',
                model: 'ioBroker',
                modelUID: genDSUID(34),
                modelVersion: '0.0.1',
                vendorName: 'KYUKA',
                binaryInputDescriptions: [
                    {
                        objName: 'generic_0',
                        name: 'generic_0',
                        dsIndex: 0,
                        inputType: 0,
                        inputUsage: Config.deviceInputUsage as binaryInputDescription['inputUsage'],
                        updateInterval: 0,
                        sensorFunction: Config.deviceSensorFunction as binaryInputDescription['sensorFunction'],
                        type: 'binaryInput',
                    },
                ],
                binaryInputSettings: [
                    {
                        group: 8,
                        inputName: 'generic_0',
                        objName: 'generic_0',
                        sensorFunction: Config.deviceSensorFunction as binaryInputSetting['sensorFunction'],
                    },
                ],
            },
        };
    }
    if (deviceType.type === 'sensor') {
        return {
            name: Config.name,
            deviceType: Config.deviceType,
            watchStateID: { sensor_0: Config.sensorSelectID },
            modifiers: {
                sensor_0: Config.sensorMultiplier,
            },
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            dsConfig: {
                dSUID: genDSUID(34),
                primaryGroup: Config.color,
                name: Config.name,
                configURL: Config.configUrl,
                modelFeatures: {},
                displayId: '',
                model: 'ioBroker',
                modelUID: genDSUID(34),
                modelVersion: '0.0.1',
                vendorName: 'KYUKA',
                sensorDescriptions: [
                    {
                        objName: 'sensor_0',
                        name: 'sensor_0',
                        aliveSignInterval: 0,
                        dsIndex: 0,
                        max: Config.deviceSensorMax,
                        maxPushInterval: 0,
                        min: Config.deviceSensorMin,
                        resolution: Config.deviceSensorResolution,
                        sensorType: Config.deviceSensorType as sensorDescription['sensorType'],
                        sensorUsage: Config.deviceSensorUsage as sensorDescription['sensorUsage'],
                        siunit: Config.deviceSensorSIUnit,
                        symbol: Config.deviceSensorSymbol,
                        type: 'sensor',
                        updateInterval: 0,
                    },
                ],
            },
        };
    }
    if (deviceType.type === 'multiSensor') {
        const watchStateID: watchStateID = {};
        const sensorDescription: Array<sensorDescription> = [];
        const sensorSetting: Array<sensorSetting> = [];
        const sensorModifiers: modifiers = {};
        Config.sensorList.forEach((s, i) => {
            watchStateID[`sensor_${i}`] = s.selectSensor;
            sensorModifiers[`sensor_${i}`] = s.sensorMultiplier;
            sensorDescription.push({
                objName: `sensor_${i}`,
                name: `sensor_${i}`,
                aliveSignInterval: 0,
                dsIndex: i,
                max: s.deviceSensorMax,
                maxPushInterval: 0,
                min: s.deviceSensorMin,
                resolution: s.deviceSensorResolution,
                sensorType: s.deviceSensorType as sensorDescription['sensorType'],
                sensorUsage: s.deviceSensorUsage as sensorDescription['sensorUsage'],
                siunit: s.deviceSensorSIUnit,
                symbol: s.deviceSensorSymbol,
                type: 'sensor',
                updateInterval: 10,
            });
            sensorSetting.push({
                group: s.color,
                minPushInterval: 2,
                changesOnlyInterval: 0,
                objName: `sensor_${i}`,
            });
        });

        return {
            name: Config.name,
            deviceType: Config.deviceType,
            watchStateID: watchStateID,
            modifiers: sensorModifiers,
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            dsConfig: {
                dSUID: genDSUID(34),
                primaryGroup: Config.color,
                name: Config.name,
                configURL: Config.configUrl,
                modelFeatures: {},
                displayId: '',
                model: 'ioBroker',
                modelUID: genDSUID(34),
                modelVersion: '0.0.1',
                vendorName: 'KYUKA',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                sensorDescriptions: sensorDescription,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                sensorSettings: sensorSetting,
            },
        };
    }
    return null;
};
