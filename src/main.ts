/*
 * Created with @iobroker/create-adapter v2.0.1
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from '@iobroker/adapter-core';

// Load your modules here, e.g.:
// import * as fs from "fs";
import { libdsvdc } from 'libdsvdcts';
//import { rgbhelper } from 'rgbhelper';

let dsDevices: Array<any> = [];

class DigitalstromVdc extends utils.Adapter {
    vdc: any;
    setOutputChannel: Array<any> = [];
    allDevices: any = { backEnd: [], frondEnd: [] };

    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: 'digitalstrom-vdc',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('objectChange', this.onObjectChange.bind(this));
        this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
        this.allDevices = { backEnd: [], frondEnd: [] };
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {
        // Initialize your adapter here

        this.setState('info.connection', false, true);

        /*
        For every state in the system there has to be also an object of type state
        Here a simple template for a boolean variable named "testVariable"
        Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
        */
        await this.setObjectNotExistsAsync('DS-Devices.VDC.running', {
            type: 'state',
            common: {
                name: 'running',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: true,
            },
            native: {
                Name: 'running',
            },
        });

        this.allDevices = await this.refreshDeviceList();

        dsDevices = [];
        this.allDevices.backEnd.forEach((d: any) => {
            this.log.info(JSON.stringify(d.dsConfig));
            console.log(JSON.stringify(d.dsConfig));
            if (typeof d.watchStateID == 'object') {
                for (const [key, value] of Object.entries(d.watchStateID)) {
                    this.log.debug(`subscribing to ${key} / ${value}`);
                    this.subscribeForeignStates(value as string);
                }
            } else if (d.watchStateID && d.watchStateID.length > 0) {
                this.log.debug(`subscribing to ${d.watchStateID}`);
                this.subscribeForeignStates(d.watchStateID);
            }
            if (d.dsConfig) {
                this.log.debug(`Pushing ${JSON.stringify(d.dsConfig)} to devices`);
                dsDevices.push(d.dsConfig);
            }
        });

        // In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.
        // this.subscribeStates("testVariable");
        // You can also add a subscription for multiple states. The following line watches all states starting with "lights."
        // this.subscribeStates("lights.*");
        // Or, if you really must, you can also watch all states. Don't do this if you don't need to. Otherwise, this will cause a lot of unnecessary load on the system:
        // this.subscribeStates("*");

        /*
			setState examples
			you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
		*/
        // the variable testVariable is set to true as command (ack=false)
        // await this.setStateAsync("testVariable", true);

        // same thing, but the value is flagged "ack"
        // ack should be always set to true if the value is received from or acknowledged from the target system
        // await this.setStateAsync("testVariable", { val: true, ack: true });

        // same thing, but the state is deleted after 30s (getState will return null afterwards)
        // await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

        // examples for the checkPassword/checkGroup functions
        /* let result = await this.checkPasswordAsync("admin", "iobroker");
        this.log.info("check user admin pw iobroker: " + result);

        result = await this.checkGroupAsync("admin", "admin");
        this.log.info("check group user admin group admin: " + result);*/

        this.log.debug(`dsDevices: ${JSON.stringify(this.allDevices.backEnd)}`);

        const vdc = new libdsvdc({ debug: this.config.vdcDebug });

        if (
            this.config.vdcName &&
            this.config.vdcName.length > 0 &&
            this.config.vdcDSUID &&
            this.config.vdcDSUID.length > 0 &&
            this.config.vdcPort
        ) {
            this.log.info(`Connecting to VDC ${this.config.vdcName}`);
            this.log.debug(`dsDevices vor dem start: ${JSON.stringify(dsDevices)}`);
            vdc.start(
                {
                    vdcName: this.config.vdcName,
                    vdcDSUID: this.config.vdcDSUID,
                    port: this.config.vdcPort,
                    configURL: this.config.vdcConfigURL,
                },
                dsDevices,
            );
            this.log.debug(`dsDevices nach dem start: ${JSON.stringify(dsDevices)}`);
        }

        this.vdc = vdc;

        vdc.on('messageReceived', (msg: JSON) => {
            this.log.debug(`MSG RECEIVED" ${JSON.stringify(msg)}`);
        });

        vdc.on('messageSent', (msg: JSON) => {
            this.log.debug(`MSG SENT" ${JSON.stringify(msg)}`);
        });

        vdc.on('VDSM_NOTIFICATION_SET_CONTROL_VALUE', (msg: any) => {
            this.log.debug(`received control value ${JSON.stringify(msg)}`);
        });

        vdc.on('VDSM_NOTIFICATION_SET_OUTPUT_CHANNEL_VALUE', (msg: any) => {
            this.log.debug(`received OUTPUTCHANNELVALUE value ${JSON.stringify(msg)}`);

            if (msg && msg.dSUID) {
                msg.dSUID.forEach((id: string) => {
                    const affectedDevice = this.allDevices.backEnd.find(
                        (d: any) => d.dsConfig.dSUID.toLowerCase() == id.toLowerCase(),
                    );
                    if (affectedDevice) {
                        // found the device -> it's an update for the device
                        const affectedState = affectedDevice.watchStateID[msg.channelId];
                        if (!affectedState) {
                            return;
                        }
                        this.log.debug(
                            `Received an update for state ${affectedState} in device ${affectedDevice.name} with value ${msg.value} and ${msg.applyNow}`,
                        );
                        this.setOutputChannel.push({
                            name: msg.channelId,
                            state: affectedState,
                            value: msg.value,
                        });
                        const brightness = this.setOutputChannel.find((v) => v.name == 'brightness');
                        if (brightness) {
                            this.log.debug(`Brightness: ${brightness.value}`);
                            if (brightness.value == 0) {
                                const affectedStateSwitch = affectedDevice.watchStateID['switch'];
                                this.setOutputChannel.push({
                                    name: 'switch',
                                    state: affectedStateSwitch,
                                    value: false,
                                });
                            }
                        } else {
                            const affectedStateSwitch = affectedDevice.watchStateID['switch'];
                            this.setOutputChannel.push({
                                name: 'switch',
                                state: affectedStateSwitch,
                                value: true,
                            });
                        }
                        this.setOutputChannel.forEach((c) => {
                            this.setForeignStateAsync(c.state, {
                                val: c.value,
                                ack: false,
                            }).then((error) => {
                                if (error) {
                                    /* this.log.error(
                                        `Error performing update of the ${c.name} value (${c.value}) on ${affectedDevice.name} - ${error}`,
                                    ); */
                                } else {
                                    this.log.debug(
                                        `Successful update of ${c.name} to ${c.value} on ${affectedDevice.name}`,
                                    );
                                }
                            });
                        });
                        this.setOutputChannel = [];
                    }
                });
            }
        });

        /*      vdc.on('VDSM_NOTIFICATION_SAVE_SCENE', (msg: any) => {
            this.log.debug(`received save scene event ${JSON.stringify(msg)}`);
            if (msg && msg.dSUID) {
                msg.dSUID.forEach(async (id: string) => {
                    // this.log.debug(`searching for ${id} in ${JSON.stringify(this.config.dsDevices)}`);
                    const affectedDevice = this.allDevices.backEnd.find(
                        (d: any) => d.dsConfig.dSUID.toLowerCase() == id.toLowerCase(),
                    );
                    if (affectedDevice) {
                        // found device -> storing current values into devicearray
                        if (affectedDevice.deviceType == 'rgbLamp') {
                            //  rgbLamp
                            let key: string;
                            let value: any;
                            const sceneVals: any = {};
                            // get the info on switchModeColor
                            const SMC: any = await this.getForeignStateAsync(
                                affectedDevice.watchStateID.switchModeColor,
                            );
                            for ([key, value] of Object.entries(affectedDevice.watchStateID)) {
                                const state: any = await this.getForeignStateAsync(value);
                                if (!affectedDevice.scenes) {
                                    affectedDevice.scenes = [];
                                }

                                // delete scene first
                                let dC = false;

                                switch (key) {
                                    case 'colorTemp':
                                        dC = SMC.val ? true : false;
                                        break;
                                    case 'hue':
                                        dC = SMC.val ? false : true;
                                        break;
                                    case 'saturation':
                                        dC = SMC.val ? false : true;
                                        break;
                                }
                                sceneVals[key] = { value: state.val, dontCare: dC }; // TODO understand and make it dynamic
                            }
                            affectedDevice.scenes = affectedDevice.scenes.filter((d: any) => d.sceneId != msg.scene);
                            affectedDevice.scenes.push({ sceneId: msg.scene, values: sceneVals });
                            this.log.debug(
                                `Set scene ${msg.scene} on ${affectedDevice.name} ::: ${JSON.stringify(
                                    this.allDevices.backEnd,
                                )}`,
                            );
                            // make it persistent by storing it back to the device
                            await this.setObjectAsync(
                                `digitalstrom-vdc.0.DS-Devices.configuredDevices.${affectedDevice.id}`,
                                {
                                    type: 'state',
                                    common: {
                                        name: affectedDevice.name,
                                        type: 'boolean',
                                        role: 'indicator',
                                        read: true,
                                        write: true,
                                    },
                                    native: {
                                        deviceObj: affectedDevice,
                                    },
                                },
                            ).then(async (success) => {
                                this.log.debug(`Device created ${success}`);
                                this.allDevices = await this.refreshDeviceList();
                            });
                        } else if (affectedDevice.deviceType == 'lamp') {
                            // lamp -> store nothing since only power on / off is supported

                            let key: string;
                            let value: any;
                            const sceneVals: any = {};

                            for ([key, value] of Object.entries(affectedDevice.watchStateID)) {
                                const state: any = await this.getForeignStateAsync(value);
                                if (!affectedDevice.scenes) {
                                    affectedDevice.scenes = [];
                                }

                                // delete scene first
                                const dC = false;

                                sceneVals[key] = { value: state.val, dontCare: dC }; // TODO understand and make it dynamic
                            }

                            affectedDevice.scenes = affectedDevice.scenes.filter((d: any) => d.sceneId != msg.scene);
                            affectedDevice.scenes.push({ sceneId: msg.scene, values: sceneVals });
                            this.log.debug(
                                `Set scene ${msg.scene} on ${affectedDevice.name} ::: ${JSON.stringify(
                                    this.allDevices.backEnd,
                                )}`,
                            );
                            // make it persistent by storing it back to the device
                            await this.setObjectAsync(
                                `digitalstrom-vdc.0.DS-Devices.configuredDevices.${affectedDevice.id}`,
                                {
                                    type: 'state',
                                    common: {
                                        name: affectedDevice.name,
                                        type: 'boolean',
                                        role: 'indicator',
                                        read: true,
                                        write: true,
                                    },
                                    native: {
                                        deviceObj: affectedDevice,
                                    },
                                },
                            ).then(async (success) => {
                                this.log.debug(`Device created ${success}`);
                                this.allDevices = await this.refreshDeviceList();
                            });
                        }
                    }
                });
            }
        });*/

        vdc.on('VDSM_NOTIFICATION_SAVE_SCENE', (msg: any) => {
            this.log.debug(`received save scene event ${JSON.stringify(msg)}`);
            if (msg && msg.dSUID) {
                msg.dSUID.forEach(async (id: string) => {
                    // this.log.debug(`searching for ${id} in ${JSON.stringify(this.config.dsDevices)}`);
                    const affectedDevice = this.allDevices.backEnd.find(
                        (d: any) => d.dsConfig.dSUID.toLowerCase() == id.toLowerCase(),
                    );
                    let dontCare: any;
                    if (affectedDevice) {
                        // found device -> looking if scene is already available
                        const dScene = affectedDevice.scenes.find((s: any) => {
                            return s.sceneId == msg.scene;
                        });
                        if (dScene) {
                            // scene is already defined... loop it and get value for dc
                            let key: any;
                            let value: any;
                            this.log.debug(
                                `looking for dontCare value inside scene ${msg.scene} -> ${JSON.stringify(dScene)}`,
                            );
                            for ([key, value] of Object.entries(dScene.values)) {
                                if (key == 'dontCare') dontCare = value; // set dontCare to current SceneValue
                            }
                        } else dontCare = false; //if Scene not defined until now set dontCare to false
                        const sceneVals: any = {};
                        let key: any;
                        let value: any;
                        for ([key, value] of Object.entries(affectedDevice.watchStateID)) {
                            const state: any = await this.getForeignStateAsync(value);
                            if (!affectedDevice.scenes) {
                                affectedDevice.scenes = [];
                            }
                            sceneVals[key] = { value: state.val, dontCare: dontCare }; // set SceneValues
                        }
                        affectedDevice.scenes = affectedDevice.scenes.filter((d: any) => d.sceneId != msg.scene);
                        affectedDevice.scenes.push({ sceneId: msg.scene, values: sceneVals });
                        this.log.debug(
                            `Set scene ${msg.scene} on ${affectedDevice.name} ::: ${JSON.stringify(
                                this.allDevices.backEnd,
                            )}`,
                        );
                        // make it persistent by storing it back to the device
                        await this.setObjectAsync(
                            `digitalstrom-vdc.0.DS-Devices.configuredDevices.${affectedDevice.id}`,
                            {
                                type: 'state',
                                common: {
                                    name: affectedDevice.name,
                                    type: 'boolean',
                                    role: 'indicator',
                                    read: true,
                                    write: true,
                                },
                                native: {
                                    deviceObj: affectedDevice,
                                },
                            },
                        ).then(async (success) => {
                            this.log.debug(`Device created ${success}`);
                            this.allDevices = await this.refreshDeviceList();
                        });
                    }
                });
            }
        });

        vdc.on('VDSM_NOTIFICATION_CALL_SCENE', (msg: any) => {
            this.log.debug(`received call scene event ${JSON.stringify(msg)}`);
            // search if the dsUID is known
            if (msg && msg.dSUID) {
                msg.dSUID.forEach((id: string) => {
                    const affectedDevice = this.allDevices.backEnd.find(
                        (d: any) => d.dsConfig.dSUID.toLowerCase() == id.toLowerCase(),
                    );
                    this.log.debug(JSON.stringify(affectedDevice));
                    const dScene = affectedDevice.scenes.find((s: any) => {
                        return s.sceneId == msg.scene;
                    });
                    if (dScene) {
                        // scene is defined... loop it and set all values
                        let key: any;
                        let value: any;
                        this.log.debug(`looping the values inside scene ${msg.scene} -> ${JSON.stringify(dScene)}`);
                        for ([key, value] of Object.entries(dScene.values)) {
                            this.log.debug(
                                `performing update on state: ${key} ${JSON.stringify(
                                    affectedDevice.watchStateID,
                                )} with key ${key} value ${value.value}`,
                            );
                            // if (key == "switch") value.value = true; // set power state on
                            this.log.debug(
                                `setting ${value.value} of ${affectedDevice.name} to on ${affectedDevice.watchStateID[key]}`,
                            );
                            this.setForeignState(affectedDevice.watchStateID[key], value.value);
                        }
                    }
                });
            }
        });

        vdc.on('channelStatesRequest', async (msg: any) => {
            this.log.debug(`received request for channel status ${JSON.stringify(msg)}`);
            // search if the dsUID is known
            if (!(msg && msg.dSUID)) {
                return;
            }
            const affectedDevice = this.allDevices.backEnd.find(
                (d: any) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase(),
            );
            this.log.debug('FOUND DEVICE: ' + JSON.stringify(affectedDevice));
            for (const e of msg.names) {
                this.log.debug(`searching state on ${affectedDevice.name} for state ${e}`);
                const affectedState = affectedDevice.watchStateID[e];
                if (affectedState) {
                    this.log.debug(
                        `Received request for status for device  ${affectedDevice.name} and state ${affectedState}`,
                    );
                    const state: any = await this.getForeignStateAsync(affectedState);
                    this.log.debug('msg value from state: ' + JSON.stringify(state));
                    const subElement = {
                        name: e,
                        elements: [
                            { name: 'value', value: { vDouble: state.val } },
                            { name: 'age', value: { vDouble: 1 } },
                        ],
                    };
                    vdc.sendComplexState(msg.messageId, subElement);
                } else {
                    this.log.error(`The device ${affectedDevice.name} has no watchState for ${e}`);
                }
            }
            {
                // send generic response
                vdc.sendState(msg.value, msg.messageId);
            }
        });

        vdc.on('binaryInputStateRequest', async (msg: any) => {
            this.log.debug(`received request for binaryInputStateRequest ${JSON.stringify(msg)}`);

            // search if the dsUID is known
            if (msg && msg.dSUID) {
                const affectedDevice = this.allDevices.backEnd.find(
                    (d: any) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase(),
                );
                this.log.debug(`found device ${JSON.stringify(affectedDevice)}`);
                if (affectedDevice && affectedDevice.deviceType == 'presenceSensor') {
                    // const state: any = await this.getForeignStateAsync(affectedDevice.watchStateID);
                    // const state: any = await getFState(affectedDevice.watchStateID);
                    // this.log.debug("msg value from state: " + JSON.stringify(state));
                    // msg.value = state.val ? 1 : 0;
                    // this.log.debug("msg value from state: " + msg.value);
                    const inputStates: Array<any> = [];
                    affectedDevice.dsConfig.binaryInputDescriptions.forEach((i: any) => {
                        inputStates.push({
                            name: i.objName,
                            age: 1,
                            value: null,
                        });
                    });
                    vdc.sendBinaryInputState(inputStates, msg.messageId);
                } else if (affectedDevice && affectedDevice.deviceType == 'binarySensor') {
                    const elements: Array<any> = [];
                    for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
                        const subState = await this.getForeignStateAsync(value as string);
                        if (subState) {
                            elements.push({
                                name: key as string,
                                elements: [
                                    { name: 'age', value: { vDouble: 1 } },
                                    { name: 'error', value: { vUint64: '0' } },
                                    { name: 'value', value: { vBool: subState.val } },
                                ],
                            });
                        }
                    }
                    vdc.sendComplexState(msg.messageId, elements);
                } else {
                    // send generic response
                    vdc.sendState(msg.value, msg.messageId);
                }
            }
        });

        vdc.on('binaryInputStateRequest', async (msg: any) => {
            this.log.info(`received request for binaryInputStateRequest ${JSON.stringify(msg)}`);
            // search if the dsUID is known
            if (msg && msg.dSUID) {
                const affectedDevice = this.allDevices.backEnd.find(
                    (d: any) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase(),
                );
                this.log.debug(`found device ${JSON.stringify(affectedDevice)}`);
                const elements: Array<any> = [];
                for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
                    const subState = await this.getForeignStateAsync(value as string);
                    if (subState) {
                        elements.push({
                            name: key as string,
                            elements: [
                                { name: 'age', value: { vDouble: 1 } },
                                { name: 'error', value: { vUint64: '0' } },
                                { name: 'value', value: { vBool: subState.val } },
                            ],
                        });
                    }
                    vdc.sendComplexState(msg.messageId, elements);
                }
            } else {
                // send generic response
                vdc.sendState(msg.value, msg.messageId);
            }
        });

        vdc.on('vdcRunningState', () => {
            this.setStateAsync('DS-Devices.VDC.running', { val: true, ack: true });
            this.log.debug(`VDC <${this.config.vdcName}> is running on port ${this.config.vdcPort}`);
        });

        vdc.on('deviceZoneChange', (msg: any) => {
            this.log.debug(`deviceZoneChange event received with the following information ${JSON.stringify(msg)}`);
        });

        vdc.on('updateDeviceValues', async (msg: any) => {
            this.log.debug(`deviceUpdate received with the following information ${JSON.stringify(msg)}`);
            const affectedDevice = this.allDevices.backEnd.find(
                (d: any) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase(),
            );
            if (affectedDevice) {
                affectedDevice.dsConfig = msg;
                await this.setObjectAsync(`digitalstrom-vdc.0.DS-Devices.configuredDevices.${affectedDevice.id}`, {
                    type: 'state',
                    common: {
                        name: affectedDevice.name,
                        type: 'boolean',
                        role: 'indicator',
                        read: true,
                        write: true,
                    },
                    native: {
                        deviceObj: affectedDevice,
                    },
                }).then(async (success) => {
                    this.log.debug(`Device created ${success}`);
                    this.allDevices = await this.refreshDeviceList();
                });
            }
        });
        this.setState('info.connection', true, true); // TODO check right place?
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     */
    private onUnload(callback: () => void): void {
        try {
            // Here you must clear all timeouts or intervals that may still be active
            // clearTimeout(timeout1);
            // clearTimeout(timeout2);
            // ...
            // clearInterval(interval1);

            // TODO end all connections and such here!!

            callback();
        } catch (e) {
            callback();
        }
    }

    // If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
    // You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
    // /**
    //  * Is called if a subscribed object changes
    //  */
    // private onObjectChange(id: string, obj: ioBroker.Object | null | undefined): void {
    // 	if (obj) {
    // 		// The object was changed
    // 		this.log.debug(`object ${id} changed: ${JSON.stringify(obj)}`);
    // 	} else {
    // 		// The object was deleted
    // 		this.log.debug(`object ${id} deleted`);
    // 	}
    // }

    /**
     * private function used to fill the alldevices array
     * @private
     */
    private async refreshDeviceList(): Promise<any> {
        interface GetObjectViewItem {
            /** The ID of this object */
            id: string;
            /** A copy of the object from the DB */
            value: ioBroker.Object | null;
        }

        return await this.getObjectViewAsync('digitalstrom-vdc', 'listDevicesFullObj', {
            startkey: 'digitalstrom-vdc.' + this.instance + '.',
            endkey: 'digitalstrom-vdc.' + this.instance + '.\u9999',
        }).then((doc: { rows: GetObjectViewItem[] }) => {
            if (doc && doc.rows) {
                const deviceObjects: any = { backEnd: [], frondEnd: [] };
                for (let i = 0; i < doc.rows.length; i++) {
                    const id = doc.rows[i].id;
                    const obj: any = doc.rows[i].value;
                    if (obj && Object.keys(obj).length > 0) {
                        if (
                            obj.deviceObj &&
                            typeof obj.deviceObj == 'object' &&
                            Object.keys(obj.deviceObj).length > 0
                        ) {
                            // TODO check old code: if (obj.deviceObj.dsConfig) {
                            this.log.debug('Found ' + id + ': ' + JSON.stringify(obj.deviceObj));
                            this.log.debug('Found ' + id + ': ' + JSON.stringify(obj));
                            deviceObjects.backEnd.push(obj.deviceObj.native.deviceObj);
                            deviceObjects.frondEnd.push(obj.deviceObj);
                        }
                    }
                }
                if (!doc.rows.length) console.log('No objects found.');
                this.log.debug('add deviceObjects: ' + JSON.stringify(deviceObjects.backEnd));
                return deviceObjects;
            } else {
                console.log('No objects found: ');
                return [];
            }
        });
    }

    // If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
    // You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
    // /**
    //  * Is called if a subscribed object changes
    //  */
    private onObjectChange(id: string, obj: ioBroker.Object | null | undefined): void {
        if (obj) {
            // The object was changed
            this.log.debug(`object ${id} changed: ${JSON.stringify(obj)}`);
        } else {
            // The object was deleted
            this.log.debug(`object ${id} deleted`);
        }
    }

    // TODO: This function is not used, should be checked, if not, required delete Greeting issi
    private async replyMultiSensor(affectedDevice: any): Promise<void> {
        const elements: Array<any> = [];
        for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
            const subState = await this.getForeignStateAsync(value as string);
            if (subState) {
                elements.push({
                    name: key as string,
                    elements: [
                        { name: 'age', value: { vDouble: 10 } },
                        { name: 'error', value: { vUint64: '0' } },
                        { name: 'value', value: { vDouble: subState.val } },
                    ],
                });
            }
        }
        this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
            {
                name: 'sensorStates',
                elements: elements,
            },
        ]);
    }

    /**
     * Is called if a subscribed state changes
     */
    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (state) {
            // The state was changed
            //this.log.debug(`state ${id} changed: ${state.val} (ack = ${state.ack})`);

            // inform vdc
            const affectedDevice = this.allDevices.backEnd.find(
                (d: any) => d.watchStateID == id || Object.values(d.watchStateID).indexOf(id) > -1,
            );
            if (affectedDevice && typeof affectedDevice.watchStateID == 'object') {
                const updateName = Object.keys(affectedDevice.watchStateID).find(
                    (key) => affectedDevice.watchStateID[key] === id,
                );
                if (affectedDevice.deviceType == 'multiSensor') {
                    // this.replyMultiSensor(affectedDevice);
                    if (
                        affectedDevice.modifiers &&
                        typeof affectedDevice.modifiers == 'object' &&
                        updateName &&
                        affectedDevice.modifiers[updateName]
                    ) {
                        state.val = (state.val as number) * parseFloat(affectedDevice.modifiers[updateName]);
                    }
                    this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                        {
                            name: 'sensorStates',
                            elements: [
                                {
                                    name: updateName,
                                    elements: [
                                        { name: 'age', value: null },
                                        { name: 'error', value: { vUint64: '0' } },
                                        { name: 'value', value: { vDouble: state.val } },
                                    ],
                                },
                            ],
                        },
                    ]);
                } else if (affectedDevice.deviceType == 'sensor') {
                    if (
                        affectedDevice.modifiers &&
                        typeof affectedDevice.modifiers == 'object' &&
                        updateName &&
                        affectedDevice.modifiers[updateName]
                    ) {
                        state.val = (state.val as number) * parseFloat(affectedDevice.modifiers[updateName]);
                    }
                    this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                        {
                            name: 'sensorStates',
                            elements: [
                                {
                                    name: updateName,
                                    elements: [
                                        { name: 'age', value: { vDouble: 0.1 } },
                                        { name: 'error', value: { vUint64: '0' } },
                                        { name: 'value', value: { vDouble: state.val } },
                                    ],
                                },
                            ],
                        },
                    ]);
                } else if (affectedDevice.deviceType == 'presenceSensor') {
                    const newState = state.val ? 1 : 0;
                    this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                        {
                            name: 'binaryInputStates',
                            elements: [
                                {
                                    name: updateName,
                                    elements: [
                                        { name: 'age', value: { vDouble: 1 } },
                                        { name: 'error', value: { vUint64: '0' } },
                                        { name: 'value', value: { vBool: newState } },
                                    ],
                                },
                            ],
                        },
                    ]);
                } else if (affectedDevice.deviceType == 'binarySensor') {
                    const newState = state.val ? 1 : 0;
                    this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                        {
                            name: 'binaryInputStates',
                            elements: [
                                {
                                    name: updateName,
                                    elements: [
                                        { name: 'age', value: { vDouble: 1 } },
                                        { name: 'error', value: { vUint64: '0' } },
                                        { name: 'value', value: { vBool: newState } },
                                    ],
                                },
                            ],
                        },
                    ]);
                } else if (affectedDevice.deviceType == 'smokeAlarm') {
                    const newState = state.val ? 1 : 0;
                    this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                        {
                            name: 'binaryInputStates',
                            elements: [
                                {
                                    name: updateName,
                                    elements: [
                                        { name: 'age', value: { vDouble: 1 } },
                                        { name: 'error', value: { vUint64: '0' } },
                                        { name: 'value', value: { vBool: newState } },
                                    ],
                                },
                            ],
                        },
                    ]);
                } else if (affectedDevice.deviceType == 'button') {
                    let newState = 0;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (state && state.val >= 0 && state.val <= 14) newState = state.val;

                    this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                        {
                            name: 'buttonInputStates',
                            elements: [
                                {
                                    name: updateName,
                                    elements: [
                                        { name: 'age', value: { vDouble: 1 } },
                                        { name: 'clickType', value: { vUint64: newState } },
                                        { name: 'error', value: { vUint64: '0' } },
                                        { name: 'value', value: { vBool: 0 } },
                                    ],
                                },
                            ],
                        },
                    ]);
                } else if (affectedDevice.deviceType == 'awayButton') {
                    // const newState = state.val ? 1 : 0;
                    this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                        {
                            name: 'buttonInputStates',
                            elements: [
                                {
                                    name: updateName,
                                    elements: [
                                        { name: 'age', value: { vDouble: 1 } },
                                        { name: 'clickType', value: { vUint64: 4 } },
                                        { name: 'error', value: { vUint64: '0' } },
                                        { name: 'value', value: { vBool: 0 } },
                                    ],
                                },
                            ],
                        },
                    ]);
                    setTimeout(() => {
                        this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                            {
                                name: 'buttonInputStates',
                                elements: [
                                    {
                                        name: updateName,
                                        elements: [
                                            { name: 'age', value: { vDouble: 1 } },
                                            { name: 'clickType', value: { vUint64: 6 } },
                                            { name: 'error', value: { vUint64: '0' } },
                                            { name: 'value', value: { vBool: 0 } },
                                        ],
                                    },
                                ],
                            },
                        ]);
                    }, 3.5 * 1000);
                } else if (affectedDevice.deviceType == 'doorbell') {
                    // const newState = state.val ? 1 : 0;
                    if (state.val) {
                        // send event only if val is true
                        this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
                            {
                                name: 'buttonInputStates',
                                elements: [
                                    {
                                        name: updateName,
                                        elements: [
                                            { name: 'age', value: { vDouble: 1 } },
                                            { name: 'clickType', value: { vUint64: 0 } },
                                            { name: 'error', value: { vUint64: '0' } },
                                            { name: 'value', value: { vBool: 0 } },
                                        ],
                                    },
                                ],
                            },
                        ]);
                    }
                }
            }
        } else {
            // The state was deleted
            this.log.debug(`state ${id} deleted`);
        }
    }

    // If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
    // /**
    //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
    //  * Using this method requires "common.messagebox" property to be set to true in io-package.json
    //  */
    private async onMessage(obj: ioBroker.Message): Promise<void> {
        const respond = (response: any): void => {
            if (obj.callback) this.sendTo(obj.from, obj.command, response, obj.callback);
        };
        // some predefined responses, so we only have to define them once
        const responses = {
            ACK: { error: null },
            OK: { error: null, result: 'ok' },
            ERROR_UNKNOWN_COMMAND: { error: 'Unknown command!' },
            MISSING_PARAMETER: (paramName: string) => {
                return { error: 'missing parameter "' + paramName + '"!' };
            },
            COMMAND_ACTIVE: { error: 'command already active' },
            RESULT: (result: unknown) => ({ error: null, result }),
            ERROR: (error: string) => ({ error }),
        };
        this.log.debug(`received onMessage ${JSON.stringify(obj)}`);
        if (typeof obj === 'object') {
            switch (obj.command) {
                case 'addNewDevice': {
                    this.log.debug('Add devices command received ' + JSON.stringify(obj));
                    try {
                        const deviceObj = obj.message as any;
                        this.log.debug(JSON.stringify(deviceObj));
                        await this.setObjectNotExistsAsync(`DS-Devices.configuredDevices.${deviceObj.id}`, {
                            type: 'state',
                            common: {
                                name: deviceObj.name,
                                type: 'boolean',
                                role: 'indicator',
                                read: true,
                                write: true,
                            },
                            native: {
                                deviceObj,
                            },
                        });
                        await this.setStateAsync(`DS-Devices.configuredDevices.${deviceObj.id}`, true);
                        this.allDevices = await this.refreshDeviceList();
                        return respond(responses.OK);
                        //
                    } catch (err: any) {
                        console.error('Error while parsing object', err);
                        return respond(responses.ERROR(err));
                    }
                }
                case 'VanishDevice': {
                    this.log.debug(`sendVanishDevice command receveid for device ${obj.message}`);
                    break;
                }
                case 'ListDevices': {
                    this.allDevices = await this.refreshDeviceList();
                    this.log.debug(`sendToListDevices - ${JSON.stringify(this.allDevices.frondEnd)}`);
                    return respond(responses.RESULT(this.allDevices.frondEnd));
                }
                case 'RemoveDevice': {
                    this.log.debug(`Remove device for ${JSON.stringify(obj.message)} received`);
                    const deviceObj = obj.message as any;
                    this.log.debug(`removing ${deviceObj._id}`);
                    await this.delObject(deviceObj._id as string);
                    this.log.debug(`Device ${JSON.stringify(obj.message)} successfully removed`);
                    // if (deviceObj.dSUID) this.vdc.sendVanish(deviceObj.dSUID as string);
                    this.allDevices = await this.refreshDeviceList();
                    return respond(responses.OK);
                }
                case 'getHostIp': {
                    this.log.debug(`getHostIp command received`);
                    const hostObj = await this.getForeignObjectAsync(`system.host.${this.host}`);
                    const ipv4 = hostObj?.common.address.filter((ip: string) => ip.includes('.'));
                    return respond(responses.RESULT(ipv4));
                }
            }

            /* TODO check old stuff from other brancch!

			            if (obj.command === "send") {
                // e.g. send email or pushover or whatever
                this.log.debug("send command");

                // Send response in callback if required
                if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
            }
            if (obj.command === "genSDUID") {
                this.log.debug("genSDUID command receveid");
                if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
            }

            if (obj.command === "getRunning") {
                // this.log.debug("getRunning command received");
                this.getState("DS-Devices.VDC.running", (error, state) => {
                    //this.log.debug(JSON.stringify(state));
                    // this.log.debug(JSON.stringify(obj));
                    if (obj.callback) this.sendTo(obj.from, obj.command, { state }, obj.callback);
                });
            }

            if (obj.command === "sendVanishDevice") {
                this.log.debug(`sendVanishDevice command receveid for device ${obj.message}`);
            }

            if (obj.command === "sendListDevices") {
                this.log.debug(`sendListDevices command receveid`);
                /* this.getStates("DS-Devices.configuredDevices.*", (error, devices) => {
                    this.log.debug(`the following devices are configured on the system ${JSON.stringify(devices)}`);
                    if (obj.callback) this.sendTo(obj.from, obj.command, { devices }, obj.callback);
                }); */
            /*
			if (obj.callback) this.sendTo(obj.from, obj.command, this.allDevices, obj.callback);
		}

		if (obj.command === "sendRemoveDevice") {
			this.log.debug(`Remove device for ${JSON.stringify(obj.message)} received`);
			const deviceObj = obj.message as any;
			this.delObject(`DS-Devices.configuredDevices.${deviceObj.id as string}`, async (error: any) => {
				this.log.debug(`Device ${JSON.stringify(obj.message)} successfully with message ${error} removed`);
				this.log.debug(JSON.stringify(deviceObj));
				if (obj.callback) this.sendTo(obj.from, obj.command, {}, obj.callback);

				if (deviceObj.dSUID) this.vdc.sendVanish(deviceObj.dSUID as string);
				this.allDevices = await this.refreshDeviceList();
			});
		}

		if (obj.command === "sendAddDevice") {
			this.log.debug("Add devices command received " + JSON.stringify(obj));
			try {
				const deviceObj = obj.message as any;
				this.log.debug(JSON.stringify(deviceObj));
				this.setObjectNotExistsAsync(`DS-Devices.configuredDevices.${deviceObj.id}`, {
					type: "state",
					common: {
						name: deviceObj.name,
						type: "boolean",
						role: "indicator",
						read: true,
						write: true,
					},
					native: {
						deviceObj,
					},
				}).then(async (success) => {
					this.log.debug(`Device created ${success}`);
					await this.setStateAsync(`DS-Devices.configuredDevices.${deviceObj.id}`, true);
					if (obj.callback) this.sendTo(obj.from, obj.command, { deviceObj }, obj.callback);
					this.allDevices = await this.refreshDeviceList();
				});
			} catch (err) {
				console.error("Error while parsing object", err);
			}
		}
			 */
        }
    }
}

if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new DigitalstromVdc(options);
} else {
    // otherwise start the instance directly
    (() => new DigitalstromVdc())();
}
