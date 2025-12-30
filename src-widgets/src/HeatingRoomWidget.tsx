/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { type CSSProperties } from 'react';
import type {
    RxRenderWidgetProps,
    RxWidgetInfo,
    VisRxWidgetProps,
    WidgetData,
    VisRxWidgetState,
    RxWidgetInfoAttributesField
} from '@iobroker/types-vis-2';
import type { LegacyConnection } from '@iobroker/adapter-react-v5';

import {
    Box,
    TextField,
    Typography,
} from "@mui/material";

import {
    Battery1Bar as Battery1BarIcon,
    Battery2Bar as Battery2BarIcon,
    Battery3Bar as Battery3BarIcon,
    Battery4Bar as Battery4BarIcon,
    Battery5Bar as Battery5BarIcon,
    Battery6Bar as Battery6BarIcon,
    BatteryFull,
    RadioButtonChecked as RadioButtonCheckedIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    SignalCellular0Bar as SignalWifi0BarIcon,
    SignalCellular1Bar as SignalWifi1BarIcon,
    SignalCellular2Bar as SignalWifi2BarIcon,
    SignalCellular3Bar as SignalWifi3BarIcon,
    SignalCellular4Bar as SignalWifi4BarIcon,
    Thermostat as ThermostatIcon,
} from "@mui/icons-material";

import Generic from "./Generic";

const styles: Record<string, CSSProperties> =  {
    cardContent: {
        flex: 1,
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
};

// todo oid nach Instanz neu belegen
// todo: Status zentrieren
// todo: button unter Status zum Rücksetzen manueller Mode



const setDataStructures = async (
    field: RxWidgetInfoAttributesField,
    data: WidgetData,
    changeData: (newData: WidgetData) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket: LegacyConnection
    // eslint-disable-next-line @typescript-eslint/require-await
): Promise<void> => {
    console.log(`set new datastructure instance ${data["instance"]}` );

    const instance = data["instance"];
    //const roomName = data["RoomName"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {
        // todo
        data["oid_TargetTemperature"] = instance;
        //data["oid_CurrentTemperature"] = instance;
        //data["oid_CurrentTemperatureExtSensor"] = instance;
        //data["oid_CurrentActorState"] = instance;
        //data["oid_CurrentValveValue"] = instance;
        //data["oid_RoomState"] = instance;
        //data["oid_RoomLog"] = instance;
        //data["oid_ThermostatBatteryState"] = instance;
        //data["oid_ThermostatBatteryVoltage"] = instance;
        //data["oid_ThermostatRSSI"] = instance;
    }
    changeData(data);
};



interface StaticRxData {
    noCard: boolean;
    widgetTitle: string;
    instance: string;
    RoomName: string;
    dataCount: number;
    oid_RoomState: string;
    oid_RoomLog: string;

    [key: `oid_TargetTemperature${number}`]: string;
    [key: `oid_CurrentTemperature${number}`]: string;
    [key: `oid_CurrentTemperatureExtSensor${number}`]: string;
    [key: `oid_CurrentActorState${number}`]: string;
    [key: `oid_CurrentValveValue${number}`]: string;
    [key: `oid_ThermostatBatteryState${number}`]: string;
    [key: `oid_ThermostatBatteryVoltage${number}`]: string;
    [key: `oid_ThermostatRSSI${number}`]: string;
}

interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
}

export default class HeatingRoomWidget extends Generic < StaticRxData, StaticState > {
    private readonly refCardContent: React.RefObject<HTMLDivElement | null> = React.createRef();
    private lastRxData: string | undefined;
    private updateTimeout: ReturnType<typeof setTimeout> | undefined;
    constructor(props: VisRxWidgetProps) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo(): RxWidgetInfo {
        return {
            id: "tplHeatingRoomWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

            //visset -> see HeatingGeneralParamsWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "HeatingRoomWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-HeatingRoom", // Label of widget
            visWidgetColor: "#005cc4",               // Optional widget color. If not set, default color of widget set will be used.
            visResizeLocked: false,                   // require, that width is always equal to height
            visResizable: true,                     // widget is not resizable
            visDraggable: true,                     // widget is not draggable
            visAttrs: [
                {
                    // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
                    name: "common", // group name
                    label: "common", // group label
                    fields: [

                        {
                            name: "noCard",
                            label: "without_card",
                            type: "checkbox",
                        },
                        {
                            name: "instance",    // name in data structure
                            label: "instance", // translated field label
                            type: "instance",
                            default: "heatingcontrol.0",
                            onChange: setDataStructures, 
                        },
                        {
                            name: "RoomName",    // name in data structure
                            label: "widgets_heating_label_roomname", // translated field label
                            type: "text",
                            default: "Wohnzimmer",
                            onChange: setDataStructures, 
                        },
                        {
                            name: "dataCount",
                            type: "number",
                            label: "widgets_thermostats_datacount",
                            default: 0,
                        },
                    ],
                },
                {
                    name: "OIDS_general", // group name
                    label: "OIDS_general", // group label
                    fields: [
                       
                        {
                            name: "oid_RoomState",    // name in data structure
                            label: "widgets_heating_label_oid_roomstate", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        {
                            name: "oid_RoomLog",    // name in data structure
                            label: "widgets_heating_label_oid_roomlog", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                       
                    ],
                },
                {
                    name: "OIDS_thermostats", // group name
                    label: "OIDS_thermostats", // group label
                    indexFrom: 1,
                    indexTo: "dataCount",
                    fields: [
                        {
                            name: "oid_TargetTemperature",    // name in data structure
                            label: "widgets_heating_label_oid_currenttarget", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        {
                            name: "oid_CurrentTemperature",    // name in data structure
                            label: "widgets_heating_label_oid_currenttemperature", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        {
                            name: "oid_CurrentTemperatureExtSensor",    // name in data structure
                            label: "widgets_heating_label_oid_currenttemperatureextsensor", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        {
                            name: "oid_CurrentActorState",    // name in data structure
                            label: "widgets_heating_label_oid_currentactorstate", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        {
                            name: "oid_CurrentValveValue",    // name in data structure
                            label: "widgets_heating_label_oid_currentvalvevalue", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        
                        {
                            name: "oid_ThermostatBatteryState",    // name in data structure
                            label: "widgets_heating_label_oid_thermostatbatterystate", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        {
                            name: "oid_ThermostatBatteryVoltage",    // name in data structure
                            label: "widgets_heating_label_oid_thermostatbatteryvoltage", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        {
                            name: "oid_ThermostatRSSI",    // name in data structure
                            label: "widgets_heating_label_oid_thermostatrssi", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                    ],
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-HeatingRoom.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    getWidgetInfo(): RxWidgetInfo {
        return HeatingRoomWidget.getWidgetInfo();
    }

    getOid(obj: StaticRxData, key: keyof StaticRxData): string {
        return obj[key] as string;
    }


    getCurrentTargetTemperature(d: number): React.JSX.Element | null {
        let content = null;

        //const oid_name = "oid_TargetTemperature" + d;
        //console.log(oid_name);
        //const oid = this.state.rxData[`${oid_name}`];
        const oid = this.getOid(this.state.rxData, `oid_TargetTemperature${d}` as keyof StaticRxData);
        console.log(oid);

        if (oid !== undefined && oid!=null && oid.length > 5) {
            const targetTemperature = this.state.values[`${oid}.val`];

            const sTemperature = `${(Math.round(targetTemperature * 100) / 100).toFixed(1)}°C`;

            content = <TextField
                size="small"
                type="text"
                label={Generic.t("Target")}
                value={sTemperature}
                disabled
                sx={{
                    m: 0,
                    width: "10ch",
                    marginLeft: "2px",
                    marginRight: "2px",
                }}
            />;
        }

        return content;
    }

    getBatteryState(d: number): React.JSX.Element | null {
        let content = null;

        //const oid_name = "oid_ThermostatBatteryState" + d;
        //console.log(oid_name);
        //const oid = this.state.rxData[`${oid_name}`];
        const oid = this.getOid(this.state.rxData, `oid_ThermostatBatteryState${d}` as keyof StaticRxData);
        console.log(oid);

        // nur true / false

        if (oid !== undefined && oid != null && oid.length > 5) {
            const thermostatBatteryState = this.state.values[`${oid}.val`];

            console.log("getBatteryState got " + thermostatBatteryState + " / " + typeof thermostatBatteryState);

            if (thermostatBatteryState == false && typeof thermostatBatteryState == "boolean") {
                content = <BatteryFull />;
            }            else if (thermostatBatteryState == true && typeof thermostatBatteryState == "boolean") {
                content = <Battery1BarIcon />;
            }            else if (Number(thermostatBatteryState) > 70) {
                content = <BatteryFull />;
            } else if (Number(thermostatBatteryState) > 60) {
                content = <Battery6BarIcon />;
            } else if (Number(thermostatBatteryState) > 50) {
                content = <Battery5BarIcon />;
            } else if (Number(thermostatBatteryState) > 40) {
                content = <Battery4BarIcon />;
            } else if (Number(thermostatBatteryState) > 30) {
                content = <Battery3BarIcon />;
            } else if (Number(thermostatBatteryState) > 20) {
                content = <Battery2BarIcon />;
            } else {
                content = <Battery1BarIcon />;
            }
        }
        return content;
    }

    getRSSIState(d: number): React.JSX.Element | null {
        let content = null;

        //const oid_name = "oid_ThermostatRSSI" + d;
        //console.log(oid_name);
        //const oid = this.state.rxData[oid_name];
        const oid = this.getOid(this.state.rxData, `oid_ThermostatRSSI${d}` as keyof StaticRxData);
        console.log(oid);

        // RSSI in dBm
        // -55 bis - 85 dBm: einwandfreier Empfang
        //- 85 bis - 90 dBm: guter Empfang
        //- 90 bis - 95 dBm: mäßiger Empfang
        //- 95 bis - 104 dBm: ungenügender Empfang
        //niedriger als - 104 dBm: instabiler bis gar kein Empfang


        if (oid !== undefined && oid != null && oid.length > 5) {
            const thermostatRSSI = this.state.values[`${oid}.val`];

            if (thermostatRSSI < 0) {

                if (Number(thermostatRSSI) < -104) {
                    content = <SignalWifi0BarIcon />;
                } else if (Number(thermostatRSSI) < -95) {
                    content = <SignalWifi1BarIcon />;
                } else if (Number(thermostatRSSI) < -90) {
                    content = <SignalWifi2BarIcon />;
                } else if (Number(thermostatRSSI) < -85) {
                    content = <SignalWifi3BarIcon />;
                } else {
                    content = <SignalWifi4BarIcon />;
                }
            }            else {
                if (Number(thermostatRSSI) > 70) {
                    content = <SignalWifi4BarIcon />;
                } else if (Number(thermostatRSSI) > 50) {
                    content = <SignalWifi3BarIcon />;
                } else if (Number(thermostatRSSI) > 30) {
                    content = <SignalWifi2BarIcon />;
                } else if (Number(thermostatRSSI) > 10) {
                    content = <SignalWifi1BarIcon />;
                } else {
                    content = <SignalWifi0BarIcon />;
                }
            }
        }
        return content;
    }

    getCurrentActorState(d: number): React.JSX.Element | null {
        let content = null;

        //const oid_name = "oid_CurrentActorState" + d;
        //console.log(oid_name);
        //const oid = this.state.rxData[oid_name];
        const oid = this.getOid(this.state.rxData, `oid_CurrentActorState${d}` as keyof StaticRxData);
        console.log(oid);

        if (oid !== undefined && oid != null && oid.length > 5) {
            const currentActorState = this.state.values[`${oid}.val`];

            if (currentActorState) {
                content = <RadioButtonCheckedIcon />;
            } else {
                content = <RadioButtonUncheckedIcon />;
            }
        }
        return content;
    }

    getCurrentValveValue(d: number): React.JSX.Element | null {
        let content = null;

        //const oid_name = "oid_CurrentValveValue" + d;
        //console.log(oid_name);
        //const oid = this.state.rxData[oid_name];
        const oid = this.getOid(this.state.rxData, `oid_CurrentValveValue${d}` as keyof StaticRxData);
        console.log(oid);

        if (oid !== undefined && oid != null && oid.length > 5) {
            const currentValveValue = this.state.values[`${oid}.val`];

            //in% deshalb keine Nachkommerstellen
            const sValveValue = `${(Math.round(currentValveValue * 100) / 100).toFixed(0)}%`;

            content = <TextField
                size="small"
                type="text"
                label={Generic.t("Valve")}
                value={sValveValue}
                disabled
                sx={{
                    m: 0,
                    width: "8ch",
                    marginLeft: "2px",
                    marginRight: "2px",

                }}
            />;
        }
        return content;
    }

    getCurrentThermostatBatteryVoltage(d: number): React.JSX.Element | null {
        let content = null;

        //const oid_name = "oid_ThermostatBatteryVoltage" + d;
        //console.log(oid_name);
        //const oid = this.state.rxData[oid_name];
        const oid = this.getOid(this.state.rxData, `oid_ThermostatBatteryVoltage${d}` as keyof StaticRxData);
        console.log(oid);

        if (oid !== undefined && oid != null && oid.length > 5) {
            const thermostatBatteryVoltage = this.state.values[`${oid}.val`];

            const sBatteryVoltage = `${thermostatBatteryVoltage}V`;

            content = <TextField
                size="small"
                type="text"
                label={Generic.t("Bat")}
                value={sBatteryVoltage}
                disabled
                style={{
                    margin: 0,
                    width: "8ch",
                    marginLeft: "2px",
                    marginRight: "2px",

                }}
            />;
        }
        return content;
    }

    getCurrentTemperature(d: number): React.JSX.Element | null {
        let content = null;

        //const oid_name = "oid_CurrentTemperature" + d;
        //console.log(oid_name);
        //const oid = this.state.rxData[oid_name];
        const oid = this.getOid(this.state.rxData, `oid_CurrentTemperature${d}` as keyof StaticRxData);
        console.log(oid);

        if (oid !== undefined && oid != null && oid.length > 5) {
            const currentTemperature = this.state.values[`${oid}.val`];

            //nur eine Nachkommerstelle
            const sCurrentTemperature = (Math.round(currentTemperature * 100) / 100).toFixed(1) + "°C";

            content = <div>
                <ThermostatIcon style={{ marginRight: 8 }} />
                {sCurrentTemperature}
            </div>;
        }
        return content;
    }

    getCurrentTemperatureExtSensor(d: number): React.JSX.Element | null{
        let content = null;

        //const oid_name = "oid_CurrentTemperatureExtSensor" + d;
        //console.log(oid_name);
        //const oid = this.state.rxData[oid_name];
        const oid = this.getOid(this.state.rxData, `oid_CurrentTemperatureExtSensor${d}` as keyof StaticRxData);
        console.log(oid);

        if (oid !== undefined && oid != null && oid.length > 5) {
            const currentTemperatureExtSensor = this.state.values[`${oid}.val`];
            const sCurrentTemperatureExtSensor = (Math.round(currentTemperatureExtSensor * 100) / 100).toFixed(1) + "°C";

            content = <div>
                <ThermostatIcon style={{ marginRight: 8 }} />
                {sCurrentTemperatureExtSensor}
            </div>;
        }
        return content;
    }


    

    getThermostats(): React.JSX.Element | React.JSX.Element[] | null{

        const content = [];

        for (let d = 1; d <= this.state.rxData["dataCount"]; d++) {

            const cont = 
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    borderRadius: "5px",
                    borderColor: "primary.main",
                    backgroundColor: "rgba(255, 255, 255, 0.09)",
                    m: "5px"

                }}>
                    {this.getCurrentTargetTemperature(d)}
                    {this.getCurrentTemperature(d)}
                    {this.getCurrentTemperatureExtSensor(d)}

                    {this.getBatteryState(d)}
                    {this.getRSSIState(d)}
                    {this.getCurrentThermostatBatteryVoltage(d)}

                    {this.getCurrentActorState(d)}
                    {this.getCurrentValveValue(d)}
                </Box>



            content.push(cont);
        }
        return content;

    }


    createTable(): React.JSX.Element  {
        const roomName = this.state.rxData["RoomName"];
        const roomState = this.state.values[`${this.state.rxData["oid_RoomState"]}.val`];
        const roomLog = this.state.values[`${this.state.rxData["oid_RoomLog"]}.val`];

        //const style = {
        //    width: "100%",
        //    height: "100%",
        //    border: 1,
        //    textAlign: "left",
        //    fontSize: "smaller",
        //};

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    borderRadius: "5px",
                    borderColor: "primary.main",
                    backgroundColor: "rgba(255, 255, 255, 0.09)",
                    m: "2px",
                    alignItems: "center",
                    
                }}
            >
                <Box>
                    <Typography gutterBottom variant="h5" component="div">
                        {roomName}
                    </Typography>
                </Box>
            </Box>

            {this.getThermostats()}
            

            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "5px",
                borderColor: "primary.main",
                backgroundColor: "rgba(255, 255, 255, 0.09)",
                m: "2px",
                alignItems: "center",
            }}>
                <Typography sx={{ width: "100%", textAlign: "center" }}>{roomState}</Typography>
            </Box>


            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "5px",
                borderColor: "primary.main",
                backgroundColor: "rgba(255, 255, 255, 0.09)",
                m: "2px"
            }}>
                <div dangerouslySetInnerHTML={{ __html: roomLog }} style={{
                    width: "100%",
                    height: "300px",
                    border: "1px solid",      // Border muss als string, nicht Zahl!
                    textAlign: "center",
                    fontSize: "14px"
                }} />
            </Box>
        </div>;
    }

    /*
    <img class="mdui-green-glow" height='32px' src='/vis.0/HeatingControl/images/it_wifi.svg'></img>

                <img class="mdui-red-blink" height='32px' src='/vis.0/HeatingControl/images/it_wifi.svg'></img>
    */

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
        super.renderWidgetBody(props);

        console.log("HeatingRoomWidget values ${JSON.stringify(this.state.values)");
        console.log("HeatingRoomWidget rxData ${JSON.stringify(this.state.rxData)");

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`heating room state: size ${size}`);

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("heating room state: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}



