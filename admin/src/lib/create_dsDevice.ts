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
                scenes: [
                    {
                        sceneId: 0,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: true,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 1,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: true,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 2,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: true,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 3,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: true,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 4,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: true,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 5,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 6,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 7,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 8,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 9,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 10,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 11,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 12,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 13,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 14,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 15,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 16,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 17,
                        values: {
                            brightness: {
                                value: 75,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 18,
                        values: {
                            brightness: {
                                value: 50,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 19,
                        values: {
                            brightness: {
                                value: 25,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 20,
                        values: {
                            brightness: {
                                value: 75,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 21,
                        values: {
                            brightness: {
                                value: 50,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 22,
                        values: {
                            brightness: {
                                value: 25,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 23,
                        values: {
                            brightness: {
                                value: 75,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 24,
                        values: {
                            brightness: {
                                value: 65,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 25,
                        values: {
                            brightness: {
                                value: 64,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 26,
                        values: {
                            brightness: {
                                value: 75,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 27,
                        values: {
                            brightness: {
                                value: 65,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 28,
                        values: {
                            brightness: {
                                value: 25,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 29,
                        values: {
                            brightness: {
                                value: 75,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 30,
                        values: {
                            brightness: {
                                value: 65,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 31,
                        values: {
                            brightness: {
                                value: 25,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 32,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: true,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 33,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 34,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 35,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 36,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 37,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 38,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 39,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 40,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 41,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 42,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 43,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 44,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 45,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 46,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 47,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 48,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 49,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 50,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 51,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 52,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 53,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 54,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 55,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 56,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 57,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 58,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 59,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 60,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 61,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 62,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 63,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 64,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 65,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '153',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 66,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 67,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 68,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '0',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 69,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 70,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 71,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 72,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 73,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 74,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 75,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 76,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '153',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 77,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 78,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 79,
                        values: {
                            brightness: {
                                value: 100,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 80,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 81,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 82,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 83,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 84,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 85,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 86,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 87,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 88,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 89,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 90,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 91,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 92,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                    {
                        sceneId: 93,
                        values: {
                            brightness: {
                                value: 0,
                                dontCare: false,
                            },
                            hue: {
                                value: 0,
                                dontCare: true,
                            },
                            saturation: {
                                value: 0,
                                dontCare: true,
                            },
                            colortemp: {
                                value: '370',
                                dontCare: false,
                            },
                            x: {
                                value: '0',
                                dontCare: true,
                            },
                            y: {
                                value: '0',
                                dontCare: true,
                            },
                        },
                    },
                ],
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
