import { SelectType } from '../types/selectType';
import { Config } from './Config';

export const handleSelectId = (select: string | undefined, deviceType: SelectType) => {
    console.log(`Type: ${deviceType} ID: ${select} `);
    if (deviceType === 'lamp') {
        if (select !== undefined) {
            console.log('lamp');
            Config.OnOffSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'rgbLamp') {
        if (select !== undefined) {
            console.log('rgbLamp');
            Config.RGBSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'colorMode') {
        if (select !== undefined) {
            console.log('colorMode');
            Config.ColorModeSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'colorTemp') {
        if (select !== undefined) {
            console.log('colorTemp');
            Config.ColorTempSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'dimmer') {
        if (select !== undefined) {
            console.log('dimmer');
            Config.DimmerSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'hue') {
        if (select !== undefined) {
            console.log('hue');
            Config.HueSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'saturation') {
        if (select !== undefined) {
            console.log('saturation');
            Config.SaturationSelectID = select;
            console.log(Config);
        }
    }

    if (deviceType === 'sensor') {
        if (select !== undefined) {
            console.log('sensor');
            Config.sensorSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'button0') {
        if (select !== undefined) {
            console.log('button');
            Config.buttonSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'button1') {
        if (select !== undefined) {
            console.log('button1');
            Config.buttonSelectID1 = select;
            console.log(Config);
        }
    }
    if (deviceType === 'button2') {
        if (select !== undefined) {
            console.log('button2');
            Config.buttonSelectID2 = select;
            console.log(Config);
        }
    }
    if (deviceType === 'button3') {
        if (select !== undefined) {
            console.log('button3');
            Config.buttonSelectID3 = select;
            console.log(Config);
        }
    }
    if (deviceType === 'doorbell') {
        if (select !== undefined) {
            console.log('doorbell');
            Config.doorbellSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'presenceSensor') {
        if (select !== undefined) {
            console.log('presenceSensor');
            Config.presenceSensorSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'smokeAlarm') {
        if (select !== undefined) {
            console.log('smokeAlarm');
            Config.smokeAlarmSelectID = select;
            console.log(Config);
        }
    }
    if (deviceType === 'awayButton') {
        if (select !== undefined) {
            console.log('awayButton');
            Config.awayButtonSelectID = select;
            console.log(Config);
        }
    }
};
