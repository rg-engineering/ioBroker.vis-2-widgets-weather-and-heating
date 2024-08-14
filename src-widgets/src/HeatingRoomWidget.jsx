import React from "react";
import PropTypes from "prop-types";

import {
    //  Checkbox,
    //  FormControlLabel,
    //  FormGroup,
    Box,
    //  Switch,
    //  Slider,
    //  Stack,
    Typography,
    TextField,
    //  IconButton,
    //  Input,
    //  InputAdornment,
    //  InputLabel,
    //  FormControl,
    //  FilledInput,
    //  FormHelperText,
    //  OutlinedInput,
    //  Visibility,
    //  VisibilityOff,
} from "@mui/material";

import Battery1BarIcon from "@mui/icons-material/Battery1Bar";
import Battery2BarIcon from "@mui/icons-material/Battery2Bar";
import Battery3BarIcon from "@mui/icons-material/Battery3Bar";
import Battery4BarIcon from "@mui/icons-material/Battery4Bar";
import Battery5BarIcon from "@mui/icons-material/Battery5Bar";
import Battery6BarIcon from "@mui/icons-material/Battery6Bar";
import BatteryFull from "@mui/icons-material/BatteryFull";

import SignalWifi0BarIcon from "@mui/icons-material/SignalCellular0Bar";
import SignalWifi1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalWifi2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalWifi3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalWifi4BarIcon from "@mui/icons-material/SignalCellular4Bar";

import ThermostatIcon from "@mui/icons-material/Thermostat";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";


import Generic from "./Generic";


const styles = {
    cardContent: {
        flex: 1,
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
};

//todo oid nach Instanz neu belegen
//todo alles anzeigen

//todo Übersetzungen
//todo Images

const setDataStructures = async (field, data, changeData, socket) => {
    console.log("set new datastructure instance" + data["instance"] );

    const instance = data["instance"];
    const roomName = data["RoomName"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {

        //todo
        data["oid_TargetTemperature"] = instance;
        data["oid_CurrentTemperature"] = instance;
        data["oid_CurrentTemperatureExtSensor"] = instance;
        data["oid_CurrentActorState"] = instance;
        data["oid_CurrentValveValue"] = instance;
        data["oid_RoomState"] = instance;
        data["oid_RoomLog"] = instance;
        data["oid_ThermostatBatteryState"] = instance;
        data["oid_ThermostatBattreryVoltage"] = instance;
        data["oid_ThermostatRSSI"] = instance;
    }
    changeData(data);
};

class HeatingRoomWidget extends (Generic) {
    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo() {
        return {
            id: "tplHeatingRoomWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-heating",        // Unique ID of widget set

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


                    ],
                },
                {
                    name: "OIDS_General", // group name
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
                        {
                            name: "oid_ThermostatBatteryState",    // name in data structure
                            label: "widgets_heating_label_oid_thermostatbatterystate", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_ThermostatBattreryVoltage",    // name in data structure
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
            visPrev: "widgets/vis-2-widgets-weather_heating/img/vis-widget-HeatingRoom.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return HeatingRoomWidget.getWidgetInfo();
    }

    GetCurrentTargetTemperature() {

        let content = null;
        const oid = this.state.rxData["oid_TargetTemperature"];

        console.log(oid);

        if (oid !== undefined && oid.length > 5) {
            const targetTemperature = this.state.values[oid + ".val"];

            const sTemperature = (Math.round(targetTemperature * 100) / 100).toFixed(2)  + "°C";

            content = <TextField
                size="small"
                type="text"
                value={sTemperature}
                disabled={true}
                sx={{ m: 0, width: "8ch" }}
            />;
        }

        return content;
    }


    GetBatteryState() {

        let content = null;
        const oid = this.state.rxData["oid_ThermostatBatteryState"];
        
        if (oid !== undefined && oid.length > 5) {
            const thermostatBatteryState = this.state.values[oid + ".val"];

            if (Number(thermostatBatteryState) > 70) {
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

    GetRSSIState() {

        let content = null;
        const oid = this.state.rxData["oid_ThermostatRSSI"];

        if (oid !== undefined && oid.length > 5) {
            const thermostatRSSI = this.state.values[oid + ".val"];

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
        return content;
    }


    GetCurrentActorState() {

        let content = null;
        const oid = this.state.rxData["oid_CurrentActorState"];

        if (oid !== undefined && oid.length > 5) {
            const currentActorState = this.state.values[oid + ".val"];

            if (currentActorState) {
                content = <RadioButtonCheckedIcon />;
            }
            else {
                content = <RadioButtonUncheckedIcon />;
            }
        }
        return content;

    }

    GetCurrentValveValue() {

        let content = null;
        const oid = this.state.rxData["oid_CurrentValveValue"];

        if (oid !== undefined && oid.length > 5) {
            const currentValveValue = this.state.values[oid + ".val"];

            const sValveValue = (Math.round(currentValveValue * 100) / 100).toFixed(2) + "%";

            content = <TextField
                size="small"
                type="text"
                value={sValveValue}
                disabled={true}
                sx={{ m: 0, width: "8ch" }}
            />;
        }
        return content;

    }

    GetCurentThermostatBatteryVoltage() {

        let content = null;
        const oid = this.state.rxData["oid_ThermostatBattreryVoltage"];

        if (oid !== undefined && oid.length > 5) {
            const thermostatBatteryVoltage = this.state.values[oid + ".val"];

            const sBatteryVoltage = thermostatBatteryVoltage + "V";

            content = <TextField
                size="small"
                type="text"
                value={sBatteryVoltage}
                disabled={true}
                sx={{ m: 0, width: "8ch" }}
            />;
        }
        return content;
    }

    getCurrentTemperature() {
        let content = null;
        const oid = this.state.rxData["oid_CurrentTemperature"];

        if (oid !== undefined && oid.length > 5) {
            const currentTemperature = this.state.values[oid + ".val"];


            const sCurrentTemperature = (Math.round(currentTemperature * 100) / 100).toFixed(2) + "°C";

            content = <div>
                <ThermostatIcon /> {sCurrentTemperature}
            </div>;
        }
        return content;
    }

    getCurrentTemperatureExtSensor() {
        let content = null;
        const oid = this.state.rxData["oid_CurrentTemperatureExtSensor"];

        if (oid !== undefined && oid.length > 5) {
            const currentTemperatureExtSensor = this.state.values[oid + ".val"];



            const sCurrentTemperatureExtSensor = (Math.round(currentTemperatureExtSensor * 100) / 100).toFixed(2) + "°C";

            content = <div>
                <ThermostatIcon /> {sCurrentTemperatureExtSensor}
            </div>;
        }
        return content;
    }


    createTable() {

        const roomName = this.state.rxData["RoomName"];


        const roomState = this.state.values[`${this.state.rxData["oid_RoomState"]}.val`];
        const roomLog = this.state.values[`${this.state.rxData["oid_RoomLog"]}.val`];

        const style = {
            width: "100%",
            height: "100%",
            border: "1px",

            "text-align": "left",
            "font-size": "smaller",


        };

        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <Box sx={{ display: "flex", flexWrap: "wrap", borderRadius: "5px", "border-color": "primary.main", "background-color": "rgba(255, 255, 255, 0.09)", margin: "2px" }}>

                <Box>
                    <Typography gutterBottom variant="h5" component="div">
                        {roomName}
                    </Typography>
                </Box>
                <Box>
                    {this.GetCurrentTargetTemperature()}
                    {this.GetBatteryState()}
                    {this.GetRSSIState()}
                    {this.GetCurentThermostatBatteryVoltage()}
                </Box>

                <Box>
                    {this.getCurrentTemperature()}
                    {this.getCurrentTemperatureExtSensor()}
                </Box>

                <Box>
                    {this.GetCurrentActorState()}
                    {this.GetCurrentValveValue()}
                </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", borderRadius: "5px", "border-color": "primary.main", "background-color": "rgba(255, 255, 255, 0.09)", margin: "2px" }}>

                <p> {roomState}</p>

            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", borderRadius: "5px", "border-color": "primary.main", "background-color": "rgba(255, 255, 255, 0.09)", margin: "2px" }}>
                <div dangerouslySetInnerHTML={{ __html: roomLog }} style={style} ></div>
            </Box>





        </div>;


        return content;

    }

    /*



    <img class="mdui-green-glow" height='32px' src='/vis.0/HeatingControl/images/it_wifi.svg'></img>

                <img class="mdui-red-blink" height='32px' src='/vis.0/HeatingControl/images/it_wifi.svg'></img>
    */



    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        console.log("HeatingRoomWidget values ${JSON.stringify(this.state.values)");
        console.log("HeatingRoomWidget rxData ${JSON.stringify(this.state.rxData)");

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log("heating room state: size " + size);


        const content = this.createTable();


        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("heating room state: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

HeatingRoomWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default HeatingRoomWidget;

