export type dsDevice = {
    name: string;
    deviceType: string;
    watchStateID: watchStateID;
    modifiers?: modifiers;
    id: string;
    dsConfig: dsConfig;
};

export type modifiers = {
    [key: string]: number;
};

export type watchStateID = {
    [key: string]: string;
};

export type dsConfig = {
    dSUID: string;
    primaryGroup: colorGroup;
    name: string;
    configURL?: string;
    modelFeatures: {
        highlevel?: boolean;
        jokerconfig?: boolean;
        pushbadvanced?: boolean;
        pushbarea?: boolean;
        pushbutton?: boolean;
        akmsensor?: boolean;
        blink?: boolean;
        dontcare?: boolean;
        identification?: boolean;
        outmode?: boolean;
        outputchannels?: boolean;
        outvalue8?: boolean;
        transt?: boolean;
    };
    displayId: string;
    model: 'ioBroker';
    modelUID: string;
    modelVersion: '0.0.1';
    vendorName: 'KOS' | 'KYUKA';
    channelDescriptions?: [channelDescription];
    outputDescription?: [outputDescription];
    outputSettings?: [outputSetting];
    sensorDescriptions?: [sensorDescription];
    sensorSettings?: [sensorSetting];
    binaryInputDescriptions?: [binaryInputDescription];
    binaryInputSettings?: [binaryInputSetting];
    buttonInputDescriptions?: [buttonInputDescription];
    buttonInputSettings?: [buttonInputSetting];
    scenes?: scenes[];
};

/**
 * function (colorGroup 8)
 * 0 reserved
 * 1 alarm
 * 2 panic
 * 3 leave/come Home
 * 4 reserved
 * 5 door bell
 * 6 .. 14 reserved
 * 15 app pushbutton
 *
 * function (other colorGroups)
 * 0 local pushbutton (local + presets 2-4)
 * 1 area 1 pushbutton (area 1 + presets 2-4)
 * 2 area 2 pushbutton (area 2 + presets 2-4)
 * 3 area 3 pushbutton (area 3 + presets 2-4)
 * 4 area 4 pushbutton (area 4 + presets 2-4)
 * 5 room pushbutton (presets 0-4)
 * 6 extended 1 pushbutton (presets 10-14)
 * 7 extended 2 pushbutton (presets 20-24)
 * 8 extended 3 pushbutton (presets 30-34)
 * 9 extended 4 pushbutton (presets 40-44)
 * 10 extended area 1 pushbutton (area 1 + presets 12-14)
 * 11 extended area 2 pushbutton (area 2 + presets 22-24)
 * 12 extended area 3 pushbutton (area 3 + presets 32-34)
 * 13 extended area 4 pushbutton (area 4 + presets 42-44)
 * 14 apartment pushbutton
 * 15 app pushbutton
 *
 * mode
 * 255: inactive
 * 0: standard
 * 2: presence
 * 5..8 : button1..4 down
 * 9..12 : button1..4 up
 */
export type buttonInputSetting = {
    objName: string;
    group: colorGroup;
    function: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    mode: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 255;
    channel: number;
    setsLocalPriority: number;
    callsPresent: number;
};
/**
 * buttonType
 * 0: undefined 1: single pushbutton
 * 2: 2-way pushbutton
 * 3: 4-way navigation button
 * 4: 4-way navigation with center button
 * 5: 8-way navigation with center button
 * 6: on-off switch
 *
 * buttonElementID
 * 0: center
 * 1: down
 * 2: up
 * 3: left
 * 4: right
 * 5: upper left
 * 6: lower left
 * 7: upper right
 * 8: lower right
 */
export type buttonInputDescription = {
    objName: string;
    name: string;
    type: 'buttonInput';
    dsIndex: number;
    supportsLocalKeyMode: number;
    buttonID?: number;
    combinables?: number;
    buttonType: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    buttonElementID: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

/**
 * inputType
 * 0: poll only
 * 1: detects changes
 *
 * InputUsage
 * 0: undefined (generic usage or unknown)
 * 1: room climate
 * 2: outdoor climate
 * 3: climate setting (from user)
 *
 * SensorFunction
 * 0 App Mode (no system function)
 * 1 Presence
 * 2 Light – not yet in use
 * 3 Presence in darkness – not yet in use
 * 4 Twilight
 * 5 Motion detector
 * 6 Motion in darkness– not yet in use
 * 7 Smoke detector
 * 8 Wind monitor
 * 9 Rain monitor
 * 10 Sun radiation
 * 11 Thermostat
 * 12 Battery low status (set when battery is low)
 * 13 Window contact (set when window is open)
 * 14 Door contact (set when door is open)
 * 15 Window handle, status is close, open, or tilted
 * 16 Garage door contact (set when garage door is open)
 * 17 Sun protection
 * 18 Frost detection
 * 19 Heating system enabled
 * 20 Heating change-over, switch between heating and cooling mode
 * 21 Initialization status (set during startup or powerup of devices)
 * 22 Malfunction: Connected device is broken and requires maintenance. Operation may have seized.
 * 23 Service: Connected device requires maintenance. Normal operation still possible.
 */
export type binaryInputDescription = {
    objName: string;
    name: string;
    dsIndex: number;
    inputType: 0 | 1;
    inputUsage: 0 | 1 | 2 | 3;
    sensorFunction:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23;
    updateInterval: number;
    type: 'binaryInput';
};

export type binaryInputSetting = {
    group: colorGroup;
    sensorFunction:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23;
    inputName: string;
    objName: string;
};
/**
 * channelType
 *
 * ID Description Channel Name Min Max Unit
 * 1 Light Brightness brightness 0 100 percent
 * 2 Colored Light Hue hue 0 360 degrees
 * 3 Colored Light Saturation saturation 0 100 percent
 * 4 Color Temperature colortemp 100 1000 mired
 * 5 Light CIE Color Model x x 0 10000 scaled to 0.0 to 1.0
 * 6 Light CIE Color Model y y 0 10000 scaled to 0.0 to 1.0
 * 7 Shade Position Outside (blinds) shadePositionOutside 0 100 percent
 * 8 Shade Position Outside (curtains) shadePositionIndoor 0 100 percent
 * 9 Shade Opening Angle Outside (blinds) shadeOpeningAngleOutside 0 100 percent
 * 10 Shade Opening Angle Indoor (curtains) shadeOpeningAngleIndoor 0 100 percent
 * 11 Transparency (e.g. smart glass) transparency 0 100 percent
 * 12 Air Flow Intensity airFlowIntensity 0 100 percent
 * 13 Air Flow Direction airFlowDirection
 * 0=both(undefined), 1=supply
 * (in), 2=exhaust (out)
 * 0 2 specific
 * 14 Flap Opening Angle airFlapPosition 0 100 percent
 * 15 Ventilation Louver Position airLouverPosition 0 100 percent
 * 16 Heating Power heatingPower 0 100 percent
 * 17 Cooling Capacity coolingCapacity 0 100 percent
 * 18 Audio Volume (loudness) audioVolume 0 100 percent
 * 19 Power State powerState
 * 0=powerOff, 1=powerOn,
 * 2=forcedOff, 3=standby
 * 0 2 specific
 * 20 Ventilation swing mode airLouverAuto
 * 0=not active, 1=active
 * 0 1 specific
 * 21 Ventilation auto intensity airFlowAuto
 * 0=not active, 1=active
 * 0 1 specific
 * 22 Water Temperature waterTemperature 0 150 celsius
 * 23 Water Flow Rate waterFlow 0 100 percent
 * 24 Power Level powerLevel 0 100 percent
 */
export type channelDescription = {
    // [key in 'brightness' | 'colortemp' | 'hue' | 'saturation' | 'x' | 'y']: {
    [key: string]: {
        channelType:
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24;
        dsIndex: number;
        max: number;
        min: number;
        name: string;
        resolution: number;
        siunit?: string;
        symbol?: string;
    };
};

export type outputSetting = {
    objName: string;
    dimTimeDown?: number;
    dimTimeDownAlt1?: number;
    dimTimeDownAlt2?: number;
    dimTimeUp?: number;
    dimTimeUpAlt1?: number;
    dimTimeUpAlt2?: number;
    minBrightness?: number;
    onThreshold?: number;
    pushChanges: boolean;
    mode: number;
    groups: [1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9];
};

/**
 * Function:
 * 0: on/off only (with channel 1, ”brightness”, switched on when
 * ”brightness”>”onThreshold”)
 * 1: dimmer (with channel 1, “brightness”)
 * 2: positional (e.g. valves, blinds)
 * 3: dimmer with color temperature (with channels 1 and 4, “brightness”, “ct”)
 * 4: full color dimmer (with channels 1-6, “brightness”, “hue”, “saturation”, “ct”, “cieX”, “cieY”
 * 5: bipolar, with negative and positive values (e.g. combined heating/-
 * cooling valve, in/out fan control)
 * 6: internally controlled (e.g. device has temperature control algorithm integrated)
 *
 * outputUsage:
 * 0: undefined (generic usage or unknown)
 * 1: room climate
 * 2: outdoor climate
 * 3: user (display/indicator)
 */
export type outputDescription = {
    objName: string;
    name: string;
    dsIndex: number;
    maxPower: number;
    function: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    outputUsage: 0 | 1 | 2;
    type: 'output';
    variableRamp: boolean;
};

/**
 * SensorType
 * 0 : none
 * 1 : Temperature in °C
 * 2 : Relative humitity in %
 * 3 : Illumination in lux
 * 4 : supply voltage level in V
 * 5 : CO concentration in ppm
 * 6 : Radon activity in Bq/m3
 * 7 : gas type sensor
 * 8 : particles <10µm in μg/m3
 * 9 : particles <2.5µm in μg/m3
 * 10 : particles <1µm in μg/m3
 * 11 : room operating panel set point, 0..100%
 * 12 : fan speed, 0..1 (0=off, <0=auto)
 * 13 : Wind speed in m/s (average)
 * 14 : Active Power in W
 * 15 : Electric current in A
 * 16 : Energy Meter in kWh
 * 17 : Apparent Power in VA
 * 18 : Air pressure in hPa
 * 19 : Wind direction in degrees
 * 20 : Sound pressure level in dB
 * 21 : Precipitation intensity in mm/m2 (sum of last hour)
 * 22 : CO2 concentration in ppm
 * 23 : Wind gust speed in m/s
 * 24 : Wind gust direction in degrees
 * 25 : Generated Active Power in W
 * 26 : Generated Energy in kWh
 * 27 : Water Quantity in l
 * 28 : Water Flow Rate in l/s
 *
 * SensorUsage
 * 0: undefined (generic usage or unknown)
 * 1: room
 * 2: outdoor
 * 3: user interaction (setting, dial)
 * 4: device level measurement (total, sum)
 * 5: device level last run
 * 6: device level average
 */
export type sensorDescription = {
    objName: string;
    name: string;
    dsIndex: number;
    sensorType:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23
        | 24
        | 25
        | 26
        | 27
        | 28;
    sensorUsage: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    min: number;
    max: number;
    resolution: number;
    updateInterval: number;
    aliveSignInterval: number;
    maxPushInterval?: number;
    siunit?: string;
    symbol?: string;
    type: 'sensor';
};

export type sensorSetting = {
    group: colorGroup;
    minPushInterval: number;
    changesOnlyInterval: number;
    objName: string;
};

/**
 * colorGroup
 * 0: undefined
 * 1: yellowColor
 * 2: greyColor
 * 3: blueColor
 * 4: cyanColor
 * 5: magentaColor
 * 6: redColor
 * 7: greenColor
 * 8: blackColor
 * 9: whiteColor
 */
export type colorGroup = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 */
export type scenes = {
    sceneId: number;
    values: {
        brightness: {
            value: number;
            dontCare: boolean;
        };
        hue: {
            value: number;
            dontCare: boolean;
        };
        saturation: {
            value: number;
            dontCare: boolean;
        };
        colortemp: {
            value: string;
            dontCare: boolean;
        };
        x: {
            value: string;
            dontCare: boolean;
        };
        y: {
            value: string;
            dontCare: boolean;
        };
    };
};
