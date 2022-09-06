"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var utils = __toESM(require("@iobroker/adapter-core"));
var import_libdsvdcts = require("libdsvdcts");
var import_rgbhelper = require("rgbhelper");
let dsDevices = [];
class DigitalstromVdc extends utils.Adapter {
  constructor(options = {}) {
    super({
      ...options,
      name: "digitalstrom-vdc"
    });
    this.setOutputChannel = [];
    this.allDevices = { backEnd: [], frondEnd: [] };
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("objectChange", this.onObjectChange.bind(this));
    this.on("message", this.onMessage.bind(this));
    this.on("unload", this.onUnload.bind(this));
    this.allDevices = { backEnd: [], frondEnd: [] };
  }
  async onReady() {
    this.setState("info.connection", false, true);
    await this.setObjectNotExistsAsync("DS-Devices.VDC.running", {
      type: "state",
      common: {
        name: "running",
        type: "boolean",
        role: "indicator",
        read: true,
        write: true
      },
      native: {
        Name: "running"
      }
    });
    this.allDevices = await this.refreshDeviceList();
    dsDevices = [];
    this.allDevices.backEnd.forEach((d) => {
      this.log.info(JSON.stringify(d.dsConfig));
      console.log(JSON.stringify(d.dsConfig));
      if (typeof d.watchStateID == "object") {
        for (const [key, value] of Object.entries(d.watchStateID)) {
          this.log.debug(`subscribing to ${key} / ${value}`);
          this.subscribeForeignStates(value);
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
    this.log.debug(`dsDevices: ${JSON.stringify(this.allDevices.backEnd)}`);
    const vdc = new import_libdsvdcts.libdsvdc({ debug: this.config.vdcDebug });
    if (this.config.vdcName && this.config.vdcName.length > 0 && this.config.vdcDSUID && this.config.vdcDSUID.length > 0 && this.config.vdcPort) {
      this.log.info(`Connecting to VDC ${this.config.vdcName}`);
      this.log.debug(`dsDevices vor dem start: ${JSON.stringify(dsDevices)}`);
      vdc.start({
        vdcName: this.config.vdcName,
        vdcDSUID: this.config.vdcDSUID,
        port: this.config.vdcPort,
        configURL: this.config.vdcConfigURL
      }, dsDevices);
      this.log.debug(`dsDevices nach dem start: ${JSON.stringify(dsDevices)}`);
    }
    this.vdc = vdc;
    vdc.on("messageReceived", (msg) => {
      this.log.debug(`MSG RECEIVED" ${JSON.stringify(msg)}`);
    });
    vdc.on("messageSent", (msg) => {
      this.log.debug(`MSG SENT" ${JSON.stringify(msg)}`);
    });
    vdc.on("VDSM_NOTIFICATION_SET_CONTROL_VALUE", (msg) => {
      this.log.info(`received control value ${JSON.stringify(msg)}`);
      if (msg && msg.name) {
        if (msg && msg.dSUID) {
          msg.dSUID.forEach((id) => {
            const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == id.toLowerCase());
            if (affectedDevice) {
              if (affectedDevice.deviceType == "rgbLamp") {
                if (msg.channelId == "x" || msg.channelId == "y") {
                } else {
                  const affectedState = affectedDevice.watchStateID[msg.channelId];
                  if (affectedState) {
                    this.log.info(`Received an update for state ${affectedState} in device ${affectedDevice.name} with value ${msg.value}`);
                    this.setForeignStateAsync(affectedState, {
                      val: msg.value,
                      ack: false
                    }).then((error) => {
                      this.log.info(`set ${affectedState} ${error}`);
                    });
                  }
                }
              }
            } else if (msg.name === "TemperatureOutside") {
              this.setStateAsync("DS-Devices.outdoorValues.temperature", {
                val: msg.value,
                ack: true
              }).then((error) => {
                this.log.info(`set temperature ${error}`);
              });
            } else if (msg.name === "BrightnessOutside") {
              this.setStateAsync("DS-Devices.outdoorValues.brightness", {
                val: msg.value,
                ack: true
              }).then((error) => {
                this.log.info(`set brightness ${error}`);
              });
            }
          });
        }
      }
    });
    vdc.on("VDSM_NOTIFICATION_SET_OUTPUT_CHANNEL_VALUE", (msg) => {
      this.log.info(`received OUTPUTCHANNELVALUE value ${JSON.stringify(msg)}`);
      if (msg && msg.dSUID) {
        msg.dSUID.forEach((id) => {
          const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == id.toLowerCase());
          if (affectedDevice) {
            if (affectedDevice.deviceType == "rgbLamp") {
              if (msg.channelId == "x" || msg.channelId == "y") {
              } else {
                const affectedState = affectedDevice.watchStateID[msg.channelId];
                if (affectedState) {
                  this.log.info(`Received an update for state ${affectedState} in device ${affectedDevice.name} with value ${msg.value} and ${msg.applyNow}`);
                  this.setOutputChannel.push({
                    name: msg.channelId,
                    state: affectedState,
                    value: msg.value
                  });
                  if (msg.applyNow) {
                    this.setOutputChannel.push({
                      name: msg.channelId,
                      state: affectedState,
                      value: msg.value
                    });
                    const sat = this.setOutputChannel.find((v) => v.name == "saturation");
                    const hue = this.setOutputChannel.find((v) => v.name == "hue");
                    const brightness = this.setOutputChannel.find((v) => v.name == "brightness");
                    const colortemp = this.setOutputChannel.find((v) => v.name == "colortemp");
                    if (sat && hue && brightness) {
                      this.log.debug(`Hue: ${hue.value} Saturation: ${sat.value} Brightness: ${brightness.value}`);
                      const rgb = import_rgbhelper.rgbhelper.hsvTOrgb(hue.value, sat.value, brightness.value);
                      const rgbHex = import_rgbhelper.rgbhelper.rgbTOhex(rgb);
                      this.setForeignStateAsync(affectedDevice.watchStateID["rgb"], {
                        val: rgbHex,
                        ack: false
                      }).then((error) => {
                        if (error) {
                        } else {
                          this.log.info(`Successful update of RGB to ${rgb} / ${rgbHex} on ${affectedDevice.name}`);
                        }
                      });
                      this.setOutputChannel.forEach((c) => {
                        this.setForeignStateAsync(c.state, {
                          val: c.value,
                          ack: false
                        }).then((error) => {
                          if (error) {
                          } else {
                            this.log.info(`Successful update of ${c.name} to ${c.value} on ${affectedDevice.name}`);
                          }
                        });
                      });
                      this.setForeignStateAsync(affectedDevice.watchStateID.switchModeColor, {
                        val: true,
                        ack: false
                      }).then((error) => {
                        if (error) {
                        } else {
                          this.log.info(`Successful update of colorMode to false on ${affectedDevice.name}`);
                        }
                      });
                    } else if (brightness) {
                      this.log.debug(`Brightness: ${brightness.value}`);
                      if (brightness.value == 0) {
                        const affectedStateSwitch = affectedDevice.watchStateID["switch"];
                        this.setOutputChannel.push({
                          name: "switch",
                          state: affectedStateSwitch,
                          value: false
                        });
                      } else {
                        const affectedStateSwitch = affectedDevice.watchStateID["switch"];
                        this.setOutputChannel.push({
                          name: "switch",
                          state: affectedStateSwitch,
                          value: true
                        });
                      }
                      this.setOutputChannel.forEach((c) => {
                        this.setForeignStateAsync(c.state, {
                          val: c.value,
                          ack: false
                        }).then((error) => {
                          if (error) {
                          } else {
                            this.log.info(`Successful update of ${c.name} to ${c.value} on ${affectedDevice.name}`);
                          }
                        });
                      });
                    } else if (colortemp) {
                      this.log.debug(`Colortemp: ${colortemp.value}`);
                      const kelvinValue = Math.floor(1e6 / colortemp.value);
                      this.setForeignStateAsync(affectedDevice.watchStateID.colortemp, {
                        val: kelvinValue,
                        ack: false
                      }).then((error) => {
                        if (error) {
                        } else {
                          this.log.info(`Successful update of colortemp to ${kelvinValue} on ${affectedDevice.name}`);
                        }
                      });
                      this.setForeignStateAsync(affectedDevice.watchStateID.switchModeColor, {
                        val: false,
                        ack: false
                      }).then((error) => {
                        if (error) {
                        } else {
                          this.log.info(`Successful update of colorMode to false on ${affectedDevice.name}`);
                        }
                      });
                    } else {
                      this.log.error(`Could not set the color on ${affectedDevice.name} because some values where missing inside the buffer ${JSON.stringify(this.setOutputChannel)}`);
                    }
                    this.setOutputChannel = [];
                  }
                }
              }
            }
          }
        });
      }
    });
    vdc.on("VDSM_NOTIFICATION_SAVE_SCENE", (msg) => {
      this.log.info(`received save scene event ${JSON.stringify(msg)}`);
      if (msg && msg.dSUID) {
        msg.dSUID.forEach(async (id) => {
          const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == id.toLowerCase());
          if (affectedDevice) {
            if (affectedDevice.deviceType == "rgbLamp") {
              let key;
              let value;
              const sceneVals = {};
              const SMC = await this.getForeignStateAsync(affectedDevice.watchStateID.switchModeColor);
              for ([key, value] of Object.entries(affectedDevice.watchStateID)) {
                const state = await this.getForeignStateAsync(value);
                if (!affectedDevice.scenes) {
                  affectedDevice.scenes = [];
                }
                let dC = false;
                switch (key) {
                  case "colorTemp":
                    dC = SMC.val ? true : false;
                    break;
                  case "hue":
                    dC = SMC.val ? false : true;
                    break;
                  case "saturation":
                    dC = SMC.val ? false : true;
                    break;
                }
                sceneVals[key] = { value: state.val, dontCare: dC };
              }
              affectedDevice.scenes = affectedDevice.scenes.filter((d) => d.sceneId != msg.scene);
              affectedDevice.scenes.push({ sceneId: msg.scene, values: sceneVals });
              this.log.debug(`Set scene ${msg.scene} on ${affectedDevice.name} ::: ${JSON.stringify(this.allDevices.backEnd)}`);
              await this.setObjectAsync(`digitalstrom-vdc.0.DS-Devices.configuredDevices.${affectedDevice.id}`, {
                type: "state",
                common: {
                  name: affectedDevice.name,
                  type: "boolean",
                  role: "indicator",
                  read: true,
                  write: true
                },
                native: {
                  deviceObj: affectedDevice
                }
              }).then(async (success) => {
                this.log.debug(`Device created ${success}`);
                this.allDevices = await this.refreshDeviceList();
              });
            } else if (affectedDevice.deviceType == "lamp") {
              let key;
              let value;
              const sceneVals = {};
              for ([key, value] of Object.entries(affectedDevice.watchStateID)) {
                const state = await this.getForeignStateAsync(value);
                if (!affectedDevice.scenes) {
                  affectedDevice.scenes = [];
                }
                const dC = false;
                sceneVals[key] = { value: state.val, dontCare: dC };
              }
              affectedDevice.scenes = affectedDevice.scenes.filter((d) => d.sceneId != msg.scene);
              affectedDevice.scenes.push({ sceneId: msg.scene, values: sceneVals });
              this.log.debug(`Set scene ${msg.scene} on ${affectedDevice.name} ::: ${JSON.stringify(this.allDevices.backEnd)}`);
              await this.setObjectAsync(`digitalstrom-vdc.0.DS-Devices.configuredDevices.${affectedDevice.id}`, {
                type: "state",
                common: {
                  name: affectedDevice.name,
                  type: "boolean",
                  role: "indicator",
                  read: true,
                  write: true
                },
                native: {
                  deviceObj: affectedDevice
                }
              }).then(async (success) => {
                this.log.debug(`Device created ${success}`);
                this.allDevices = await this.refreshDeviceList();
              });
            }
          }
        });
      }
    });
    vdc.on("VDSM_NOTIFICATION_CALL_SCENE", (msg) => {
      this.log.info(`received call scene event ${JSON.stringify(msg)}`);
      if (msg && msg.dSUID) {
        msg.dSUID.forEach((id) => {
          const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == id.toLowerCase());
          if (affectedDevice) {
            if (affectedDevice.deviceType == "lamp") {
              switch (msg.scene) {
                case 5:
                  this.setForeignState(affectedDevice.watchStateID.light, true, false);
                  break;
                case 14:
                  this.setForeignState(affectedDevice.watchStateID.light, true, false);
                  break;
                case 13:
                  this.setForeignState(affectedDevice.watchStateID.light, false);
                  break;
                case 69:
                  this.setForeignState(affectedDevice.watchStateID.light, false);
                  break;
                case 72:
                  this.setForeignState(affectedDevice.watchStateID.light, false);
                  break;
                case 0:
                  this.setForeignState(affectedDevice.watchStateID.light, false);
                  break;
                default:
                  const dScene = affectedDevice.scenes.find((s) => {
                    return s.sceneId == msg.scene;
                  });
                  if (dScene) {
                    let key;
                    let value;
                    this.log.debug(`looping the values inside scene ${msg.scene} -> ${JSON.stringify(dScene)}`);
                    for ([key, value] of Object.entries(dScene.values)) {
                      this.log.debug(`performing update on state: ${key} ${JSON.stringify(affectedDevice.watchStateID)} with key ${key} value ${value.value}`);
                      this.log.debug(`setting ${value.value} of ${affectedDevice.name} to on ${affectedDevice.watchStateID[key]}`);
                      this.setForeignState(affectedDevice.watchStateID[key], value.value);
                    }
                  }
                  break;
              }
            } else if (affectedDevice.deviceType == "rgbLamp") {
              this.log.debug(JSON.stringify(affectedDevice));
              if (msg.scene == "13") {
                this.setForeignState(affectedDevice.watchStateID.switch, false);
              } else if (msg.scene == "0") {
                this.setForeignState(affectedDevice.watchStateID.switch, false);
              } else if (msg.scene == "72") {
                this.setForeignState(affectedDevice.watchStateID.switch, false);
              } else if (msg.scene == "69") {
                this.setForeignState(affectedDevice.watchStateID.switch, false);
              } else if (affectedDevice.scenes) {
                const dScene = affectedDevice.scenes.find((s) => {
                  return s.sceneId == msg.scene;
                });
                if (dScene) {
                  let key;
                  let value;
                  this.log.debug(`looping the values inside scene ${msg.scene} -> ${JSON.stringify(dScene)}`);
                  for ([key, value] of Object.entries(dScene.values)) {
                    this.log.debug(`performing update on state: ${key} ${JSON.stringify(affectedDevice.watchStateID)} with key ${key} value ${value.value}`);
                    this.log.debug(`setting ${value.value} of ${affectedDevice.name} to on ${affectedDevice.watchStateID[key]}`);
                    this.setForeignState(affectedDevice.watchStateID[key], value.value);
                  }
                }
              }
            }
          }
        });
      }
    });
    vdc.on("channelStatesRequest", async (msg) => {
      this.log.debug(`received request for status ${JSON.stringify(msg)}`);
      if (msg && msg.dSUID) {
        const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase());
        this.log.debug("FOUND DEVICE: " + JSON.stringify(affectedDevice));
        if (affectedDevice && affectedDevice.deviceType == "lamp") {
          const state = await this.getForeignStateAsync(affectedDevice.watchStateID.light);
          this.log.info("msg value from state: " + JSON.stringify(state));
          msg.value = state.val ? 100 : 0;
          this.log.info("msg value from state: " + msg.value);
          vdc.sendState(msg.value, msg.messageId);
        } else if (affectedDevice && affectedDevice.deviceType == "rgbLamp") {
          msg.names.forEach(async (e) => {
            this.log.debug(`searching state on ${affectedDevice.name} for state ${e}`);
            let affectedState = affectedDevice.watchStateID[e];
            if (affectedState) {
              this.log.debug(`Received request for status for device  ${affectedDevice.name} and state ${affectedState}`);
              const state = await this.getForeignStateAsync(affectedState);
              this.log.debug("msg value from state: " + JSON.stringify(state));
              const subElement = {
                name: e,
                elements: [{ name: "value", value: { vDouble: state.val } }]
              };
              vdc.sendComplexState(msg.messageId, subElement);
            } else if (e == "x" || e == "y") {
              affectedState = affectedDevice.watchStateID["rgb"];
              if (affectedState) {
                this.log.debug(`getting rgb value from ${affectedState}`);
                const state = await this.getForeignStateAsync(affectedState);
                this.log.debug(`got a state for rgb: ${JSON.stringify(state)}`);
                if (state) {
                  if (state.val.indexOf("#") == 0) {
                    state.val = state.val.substring(1);
                  } else {
                    state.val = parseInt(state.val).toString(16);
                  }
                  const rgb = import_rgbhelper.rgbhelper.hexToRgb(state.val);
                  this.log.debug(`did some math and got me some rgb from ${state.val} to ${JSON.stringify(rgb)}`);
                  if (rgb) {
                    const cie = import_rgbhelper.rgbhelper.rgb_to_cie(rgb.r, rgb.g, rgb.b);
                    this.log.debug(`did some more math and found me some CIE values from ${JSON.stringify(rgb)} to ${cie}`);
                    let subElement = {};
                    switch (e) {
                      case "x":
                        subElement = {
                          name: "x",
                          elements: [{ name: "value", value: { vDouble: cie[0] } }]
                        };
                        vdc.sendComplexState(msg.messageId, subElement);
                        break;
                      case "y":
                        subElement = {
                          name: "y",
                          elements: [{ name: "value", value: { vDouble: cie[1] } }]
                        };
                        vdc.sendComplexState(msg.messageId, subElement);
                        break;
                    }
                  }
                }
              }
            } else {
              this.log.error(`The device ${affectedDevice.name} has no watchState for ${e}`);
            }
          });
        } else if (affectedDevice && affectedDevice.deviceType == "multiSensor") {
          const elements = [];
          for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
            const subState = await this.getForeignStateAsync(value);
            if (subState) {
              elements.push({
                name: key,
                elements: [
                  { name: "age", value: { vDouble: 1 } },
                  { name: "error", value: { vUint64: "0" } },
                  { name: "value", value: { vDouble: subState.val } }
                ]
              });
            }
          }
          this.log.debug("Sending complex state " + JSON.stringify(elements));
          vdc.sendComplexState(msg.messageId, elements);
        } else if (affectedDevice && affectedDevice.deviceType == "sensor") {
          const elements = [];
          for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
            const subState = await this.getForeignStateAsync(value);
            if (subState) {
              elements.push({
                name: key,
                elements: [
                  { name: "age", value: { vDouble: 1 } },
                  { name: "error", value: { vUint64: "0" } },
                  { name: "value", value: { vDouble: subState.val } }
                ]
              });
            }
          }
          vdc.sendComplexState(msg.messageId, elements);
        } else if (affectedDevice && affectedDevice.deviceType == "presenceSensor") {
          const elements = [];
          for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
            const subState = await this.getForeignStateAsync(value);
            if (subState) {
              elements.push({
                name: key,
                elements: [
                  { name: "age", value: { vDouble: 1 } },
                  { name: "error", value: { vUint64: "0" } },
                  { name: "value", value: { vBool: subState.val } }
                ]
              });
            }
          }
          vdc.sendComplexState(msg.messageId, elements);
        } else {
          vdc.sendState(msg.value, msg.messageId);
        }
      }
    });
    vdc.on("binaryInputStateRequest", async (msg) => {
      this.log.info(`received request for binaryInputStateRequest ${JSON.stringify(msg)}`);
      if (msg && msg.dSUID) {
        const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase());
        this.log.debug(`found device ${JSON.stringify(affectedDevice)}`);
        if (affectedDevice && affectedDevice.deviceType == "presenceSensor") {
          const inputStates = [];
          affectedDevice.dsConfig.binaryInputDescriptions.forEach((i) => {
            inputStates.push({
              name: i.objName,
              age: 1,
              value: null
            });
          });
          vdc.sendBinaryInputState(inputStates, msg.messageId);
        } else if (affectedDevice && affectedDevice.deviceType == "binarySensor") {
          const elements = [];
          for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
            const subState = await this.getForeignStateAsync(value);
            if (subState) {
              elements.push({
                name: key,
                elements: [
                  { name: "age", value: { vDouble: 1 } },
                  { name: "error", value: { vUint64: "0" } },
                  { name: "value", value: { vBool: subState.val } }
                ]
              });
            }
          }
          vdc.sendComplexState(msg.messageId, elements);
        } else {
          vdc.sendState(msg.value, msg.messageId);
        }
      }
    });
    vdc.on("binaryInputStateRequest", async (msg) => {
      this.log.info(`received request for binaryInputStateRequest ${JSON.stringify(msg)}`);
      if (msg && msg.dSUID) {
        const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase());
        this.log.debug(`found device ${JSON.stringify(affectedDevice)}`);
        if (affectedDevice && affectedDevice.deviceType == "binarySensor") {
          const inputStates = [];
          affectedDevice.dsConfig.binaryInputDescriptions.forEach((i) => {
            inputStates.push({
              name: i.objName,
              age: 1,
              value: null
            });
          });
          vdc.sendBinaryInputState(inputStates, msg.messageId);
        } else if (affectedDevice && affectedDevice.deviceType == "smokeAlarm") {
          const inputStates = [];
          affectedDevice.dsConfig.binaryInputDescriptions.forEach((i) => {
            inputStates.push({
              name: i.objName,
              age: 1,
              value: null
            });
          });
          try {
            vdc.sendBinaryInputState(inputStates, msg.messageId);
          } catch (e) {
            this.log.error(JSON.stringify(e));
          }
        }
      }
    });
    vdc.on("sensorStatesRequest", async (msg) => {
      if (msg && msg.dSUID) {
        const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase());
        if (affectedDevice && affectedDevice.deviceType == "sensor") {
          if (typeof affectedDevice.watchStateID == "object") {
            const sensorStates = [];
            for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
              const state = await this.getForeignStateAsync(value);
              this.log.info("msg value from state: " + JSON.stringify(state));
              if (affectedDevice.modifiers && typeof affectedDevice.modifiers == "object" && key && affectedDevice.modifiers[key]) {
                state.val = state.val * parseFloat(affectedDevice.modifiers[key]);
              }
              sensorStates.push({
                name: key,
                age: 5,
                value: state.val
              });
            }
            vdc.sendSensorStatesRequest(sensorStates, msg.messageId);
          } else {
            const state = await this.getForeignStateAsync(affectedDevice.watchStateID);
            this.log.info("msg value from state: " + JSON.stringify(state));
            const sensorStates = [];
            affectedDevice.dsConfig.sensorDescriptions.forEach((i) => {
              if (affectedDevice.modifiers && typeof affectedDevice.modifiers == "object" && i.objName && affectedDevice.modifiers[i.objName]) {
                state.val = state.val * parseFloat(affectedDevice.modifiers[i.objName]);
              }
              sensorStates.push({
                name: i.objName,
                age: 5,
                value: state.val
              });
            });
            vdc.sendSensorStatesRequest(sensorStates, msg.messageId);
          }
        } else if (affectedDevice && affectedDevice.deviceType == "multiSensor") {
          const sensorStates = [];
          for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
            const state = await this.getForeignStateAsync(value);
            this.log.info("msg value from state: " + JSON.stringify(state));
            if (affectedDevice.modifiers && typeof affectedDevice.modifiers == "object" && key && affectedDevice.modifiers[key]) {
              state.val = state.val * parseFloat(affectedDevice.modifiers[key]);
            }
            sensorStates.push({
              name: key,
              age: 1,
              value: state.val
            });
          }
          this.log.warn("MultiSensorStates" + JSON.stringify(sensorStates));
          vdc.sendSensorStatesRequest(sensorStates, msg.messageId);
        }
      }
    });
    vdc.on("vdcRunningState", () => {
      this.setStateAsync("DS-Devices.VDC.running", { val: true, ack: true });
      this.log.info(`VDC <${this.config.vdcName}> is running on port ${this.config.vdcPort}`);
    });
    vdc.on("deviceZoneChange", (msg) => {
      this.log.info(`deviceZoneChange event received with the following information ${JSON.stringify(msg)}`);
    });
    vdc.on("updateDeviceValues", async (msg) => {
      this.log.info(`deviceUpdate received with the following information ${JSON.stringify(msg)}`);
      const affectedDevice = this.allDevices.backEnd.find((d) => d.dsConfig.dSUID.toLowerCase() == msg.dSUID.toLowerCase());
      if (affectedDevice) {
        affectedDevice.dsConfig = msg;
        await this.setObjectAsync(`digitalstrom-vdc.0.DS-Devices.configuredDevices.${affectedDevice.id}`, {
          type: "state",
          common: {
            name: affectedDevice.name,
            type: "boolean",
            role: "indicator",
            read: true,
            write: true
          },
          native: {
            deviceObj: affectedDevice
          }
        }).then(async (success) => {
          this.log.debug(`Device created ${success}`);
          this.allDevices = await this.refreshDeviceList();
        });
      }
    });
    this.setState("info.connection", true, true);
  }
  onUnload(callback) {
    try {
      callback();
    } catch (e) {
      callback();
    }
  }
  async refreshDeviceList() {
    return await this.getObjectViewAsync("digitalstrom-vdc", "listDevicesFullObj", {
      startkey: "digitalstrom-vdc." + this.instance + ".",
      endkey: "digitalstrom-vdc." + this.instance + ".\u9999"
    }).then((doc) => {
      if (doc && doc.rows) {
        const deviceObjects = { backEnd: [], frondEnd: [] };
        for (let i = 0; i < doc.rows.length; i++) {
          const id = doc.rows[i].id;
          const obj = doc.rows[i].value;
          if (obj && Object.keys(obj).length > 0) {
            if (obj.deviceObj && typeof obj.deviceObj == "object" && Object.keys(obj.deviceObj).length > 0) {
              this.log.debug("Found " + id + ": " + JSON.stringify(obj.deviceObj));
              this.log.debug("Found " + id + ": " + JSON.stringify(obj));
              deviceObjects.backEnd.push(obj.deviceObj.native.deviceObj);
              deviceObjects.frondEnd.push(obj.deviceObj);
            }
          }
        }
        if (!doc.rows.length)
          console.log("No objects found.");
        this.log.debug("add deviceObjects: " + JSON.stringify(deviceObjects.backEnd));
        return deviceObjects;
      } else {
        console.log("No objects found: ");
        return [];
      }
    });
  }
  onObjectChange(id, obj) {
    if (obj) {
      this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
    } else {
      this.log.info(`object ${id} deleted`);
    }
  }
  async replyMultiSensor(affectedDevice) {
    const elements = [];
    for (const [key, value] of Object.entries(affectedDevice.watchStateID)) {
      const subState = await this.getForeignStateAsync(value);
      if (subState) {
        elements.push({
          name: key,
          elements: [
            { name: "age", value: { vDouble: 10 } },
            { name: "error", value: { vUint64: "0" } },
            { name: "value", value: { vDouble: subState.val } }
          ]
        });
      }
    }
    this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
      {
        name: "sensorStates",
        elements
      }
    ]);
  }
  onStateChange(id, state) {
    if (state) {
      this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
      const affectedDevice = this.allDevices.backEnd.find((d) => d.watchStateID == id || Object.values(d.watchStateID).indexOf(id) > -1);
      if (affectedDevice && typeof affectedDevice.watchStateID == "object") {
        const updateName = Object.keys(affectedDevice.watchStateID).find((key) => affectedDevice.watchStateID[key] === id);
        if (affectedDevice.deviceType == "multiSensor") {
          if (affectedDevice.modifiers && typeof affectedDevice.modifiers == "object" && updateName && affectedDevice.modifiers[updateName]) {
            state.val = state.val * parseFloat(affectedDevice.modifiers[updateName]);
          }
          this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
            {
              name: "sensorStates",
              elements: [
                {
                  name: updateName,
                  elements: [
                    { name: "age", value: null },
                    { name: "error", value: { vUint64: "0" } },
                    { name: "value", value: { vDouble: state.val } }
                  ]
                }
              ]
            }
          ]);
        } else if (affectedDevice.deviceType == "sensor") {
          if (affectedDevice.modifiers && typeof affectedDevice.modifiers == "object" && updateName && affectedDevice.modifiers[updateName]) {
            state.val = state.val * parseFloat(affectedDevice.modifiers[updateName]);
          }
          this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
            {
              name: "sensorStates",
              elements: [
                {
                  name: updateName,
                  elements: [
                    { name: "age", value: { vDouble: 0.1 } },
                    { name: "error", value: { vUint64: "0" } },
                    { name: "value", value: { vDouble: state.val } }
                  ]
                }
              ]
            }
          ]);
        } else if (affectedDevice.deviceType == "presenceSensor") {
          const newState = state.val ? 1 : 0;
          this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
            {
              name: "binaryInputStates",
              elements: [
                {
                  name: updateName,
                  elements: [
                    { name: "age", value: { vDouble: 1 } },
                    { name: "error", value: { vUint64: "0" } },
                    { name: "value", value: { vBool: newState } }
                  ]
                }
              ]
            }
          ]);
        } else if (affectedDevice.deviceType == "binarySensor") {
          const newState = state.val ? 1 : 0;
          this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
            {
              name: "binaryInputStates",
              elements: [
                {
                  name: updateName,
                  elements: [
                    { name: "age", value: { vDouble: 1 } },
                    { name: "error", value: { vUint64: "0" } },
                    { name: "value", value: { vBool: newState } }
                  ]
                }
              ]
            }
          ]);
        } else if (affectedDevice.deviceType == "smokeAlarm") {
          const newState = state.val ? 1 : 0;
          this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
            {
              name: "binaryInputStates",
              elements: [
                {
                  name: updateName,
                  elements: [
                    { name: "age", value: { vDouble: 1 } },
                    { name: "error", value: { vUint64: "0" } },
                    { name: "value", value: { vBool: newState } }
                  ]
                }
              ]
            }
          ]);
        } else if (affectedDevice.deviceType == "button") {
          let newState = 0;
          if (state && state.val >= 0 && state.val <= 14)
            newState = state.val;
          this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
            {
              name: "buttonInputStates",
              elements: [
                {
                  name: updateName,
                  elements: [
                    { name: "age", value: { vDouble: 1 } },
                    { name: "clickType", value: { vUint64: newState } },
                    { name: "error", value: { vUint64: "0" } },
                    { name: "value", value: { vBool: 0 } }
                  ]
                }
              ]
            }
          ]);
        } else if (affectedDevice.deviceType == "awayButton") {
          this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
            {
              name: "buttonInputStates",
              elements: [
                {
                  name: updateName,
                  elements: [
                    { name: "age", value: { vDouble: 1 } },
                    { name: "clickType", value: { vUint64: 4 } },
                    { name: "error", value: { vUint64: "0" } },
                    { name: "value", value: { vBool: 0 } }
                  ]
                }
              ]
            }
          ]);
          setTimeout(() => {
            this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
              {
                name: "buttonInputStates",
                elements: [
                  {
                    name: updateName,
                    elements: [
                      { name: "age", value: { vDouble: 1 } },
                      { name: "clickType", value: { vUint64: 6 } },
                      { name: "error", value: { vUint64: "0" } },
                      { name: "value", value: { vBool: 0 } }
                    ]
                  }
                ]
              }
            ]);
          }, 3.5 * 1e3);
        } else if (affectedDevice.deviceType == "doorbell") {
          if (state.val) {
            this.vdc.sendUpdate(affectedDevice.dsConfig.dSUID, [
              {
                name: "buttonInputStates",
                elements: [
                  {
                    name: updateName,
                    elements: [
                      { name: "age", value: { vDouble: 1 } },
                      { name: "clickType", value: { vUint64: 0 } },
                      { name: "error", value: { vUint64: "0" } },
                      { name: "value", value: { vBool: 0 } }
                    ]
                  }
                ]
              }
            ]);
          }
        }
      }
    } else {
      this.log.info(`state ${id} deleted`);
    }
  }
  async onMessage(obj) {
    const respond = (response) => {
      if (obj.callback)
        this.sendTo(obj.from, obj.command, response, obj.callback);
    };
    const responses = {
      ACK: { error: null },
      OK: { error: null, result: "ok" },
      ERROR_UNKNOWN_COMMAND: { error: "Unknown command!" },
      MISSING_PARAMETER: (paramName) => {
        return { error: 'missing parameter "' + paramName + '"!' };
      },
      COMMAND_ACTIVE: { error: "command already active" },
      RESULT: (result) => ({ error: null, result }),
      ERROR: (error) => ({ error })
    };
    this.log.debug(`received onMessage ${JSON.stringify(obj)}`);
    if (typeof obj === "object") {
      switch (obj.command) {
        case "addNewDevice": {
          this.log.debug("Add devices command received " + JSON.stringify(obj));
          try {
            const deviceObj = obj.message;
            this.log.debug(JSON.stringify(deviceObj));
            await this.setObjectNotExistsAsync(`DS-Devices.configuredDevices.${deviceObj.id}`, {
              type: "state",
              common: {
                name: deviceObj.name,
                type: "boolean",
                role: "indicator",
                read: true,
                write: true
              },
              native: {
                deviceObj
              }
            });
            await this.setStateAsync(`DS-Devices.configuredDevices.${deviceObj.id}`, true);
            this.allDevices = await this.refreshDeviceList();
            return respond(responses.OK);
          } catch (err) {
            console.error("Error while parsing object", err);
            return respond(responses.ERROR(err));
          }
        }
        case "VanishDevice": {
          this.log.info(`sendVanishDevice command receveid for device ${obj.message}`);
          break;
        }
        case "ListDevices": {
          this.allDevices = await this.refreshDeviceList();
          this.log.debug(`sendToListDevices - ${JSON.stringify(this.allDevices.frondEnd)}`);
          return respond(responses.RESULT(this.allDevices.frondEnd));
        }
        case "RemoveDevice": {
          this.log.debug(`Remove device for ${JSON.stringify(obj.message)} received`);
          const deviceObj = obj.message;
          this.log.debug(`removing ${deviceObj._id}`);
          await this.delObject(deviceObj._id);
          this.log.debug(`Device ${JSON.stringify(obj.message)} successfully removed`);
          this.allDevices = await this.refreshDeviceList();
          return respond(responses.OK);
        }
        case "getHostIp": {
          this.log.debug(`getHostIp command received`);
          const hostObj = await this.getForeignObjectAsync(`system.host.${this.host}`);
          const ipv4 = hostObj == null ? void 0 : hostObj.common.address.filter((ip) => ip.includes("."));
          return respond(responses.RESULT(ipv4));
        }
      }
    }
  }
}
if (require.main !== module) {
  module.exports = (options) => new DigitalstromVdc(options);
} else {
  (() => new DigitalstromVdc())();
}
//# sourceMappingURL=main.js.map
