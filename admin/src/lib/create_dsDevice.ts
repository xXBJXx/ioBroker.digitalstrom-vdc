import { Config } from './Config';
import { genDSUID } from './genDSUID';
import { dsDevice } from '../types/dsDevice';

export const createDevice = (deviceType: { type: string; function: string }): dsDevice | null => {
    if (deviceType.type === 'lamp') {
        const device: dsDevice = {
            name: Config.name,
            deviceType: Config.deviceType,
            watchStateID: { light: Config.OnOffSelectID },
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            dsConfig: {
                dSUID: genDSUID(32),
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
                modelUID: genDSUID(32),
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
                watchStateID: { light: Config.OnOffSelectID },
                scenes: [],
                zoneID: '',
            },
            scenes: [],
        };
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
        return device;
    }
    if (deviceType.type === 'rgbLamp') {
        return {
            name: Config.name,
            deviceType: Config.deviceType,
            id: `${genDSUID(5)}_${genDSUID(5)}`,
            watchStateID: {
                switch: Config.OnOffSelectID,
                switchModeColor: Config.ColorModeSelectID,
                brightness: Config.DimmerSelectID,
                colortemp: Config.ColorTempSelectID,
                hue: Config.HueSelectID,
                saturation: Config.SaturationSelectID,
                rgb: Config.RGBSelectID,
            },
            dsConfig: {
                dSUID: genDSUID(32),
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
                modelUID: genDSUID(32),
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
                watchStateID: {
                    switch: Config.OnOffSelectID,
                    switchModeColor: Config.ColorModeSelectID,
                    brightness: Config.DimmerSelectID,
                    colortemp: Config.ColorTempSelectID,
                    hue: Config.HueSelectID,
                    saturation: Config.SaturationSelectID,
                    rgb: Config.RGBSelectID,
                },
                scenes: [],
                zoneID: '',
            },
            scenes: [],
        };
    }
    return null;
};
