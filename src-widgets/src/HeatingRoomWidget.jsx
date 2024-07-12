import React from "react";
import PropTypes from "prop-types";

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
            visSet: "vis-2-widgets-weather",        // Unique ID of widget set

            //visset -> see WeatherWidget
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
                            label: "widgets_weather_label_roomname", // translated field label
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
                            label: "currentprofile", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                        {
                            name: "oid_CurrentTemperature",    // name in data structure
                            label: "currenttemperature", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_CurrentTemperatureExtSensor",    // name in data structure
                            label: "currenttemperatureextsensor", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_CurrentActorState",    // name in data structure
                            label: "currentactorstate", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_CurrentValveValue",    // name in data structure
                            label: "currentvalvevalue", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_RoomState",    // name in data structure
                            label: "roomstate", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_RoomLog",    // name in data structure
                            label: "roomlog", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_ThermostatBatteryState",    // name in data structure
                            label: "thermostatbatterystate", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_ThermostatBattreryVoltage",    // name in data structure
                            label: "thermostatbatteryvoltage", // translated field label
                            type: "id",
                            default: "", //todo
                        }, 
                        {
                            name: "oid_ThermostatRSSI",    // name in data structure
                            label: "thermostatrssi", // translated field label
                            type: "id",
                            default: "", //todo
                        },
                    ],
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather/img/vis-widget-HeatingRoom.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return HeatingRoomWidget.getWidgetInfo();
    }

    createTable() {

        const roomName = this.state.rxData["RoomName"];

        const targetTemperature = this.state.values[`${this.state.rxData["oid_TargetTemperature"]}.val`];
        const currentTemperature = this.state.values[`${this.state.rxData["oid_CurrentTemperature"]}.val`];
        const currentTemperatureExtSensor = this.state.values[`${this.state.rxData["oid_CurrentTemperatureExtSensor"]}.val`];
        const currentActorState = this.state.values[`${this.state.rxData["oid_CurrentActorState"]}.val`];

        const currentValveValue = this.state.values[`${this.state.rxData["oid_CurrentValveValue"]}.val`];
        const roomState = this.state.values[`${this.state.rxData["oid_RoomState"]}.val`];
        const roomLog = this.state.values[`${this.state.rxData["oid_RoomLog"]}.val`];
        const thermostatBatteryState = this.state.values[`${this.state.rxData["oid_ThermostatBatteryState"]}.val`];
        const thermostatBatteryVoltage = this.state.values[`${this.state.rxData["oid_ThermostatBattreryVoltage"]}.val`];
        const thermostatRSSI = this.state.values[`${this.state.rxData["oid_ThermostatRSSI"]}.val`];


        const style = {
            width: '100%',
            height: '100%',
            border: '0',
        };

        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div>
                <p>{Generic.t("Room")}  {roomName}</p>
            </div>

            <div>
                <p> {targetTemperature} °C</p>
            </div>

            <div>
                <p> {currentTemperature} °C</p>
                <p> {currentTemperatureExtSensor} °C</p>
                <p> {currentActorState}</p>
                <p> {currentValveValue} %</p>

            </div>

            <div>
                <p> {roomState}</p>
            </div>

            <div dangerouslySetInnerHTML={{ __html: roomLog }} style={style} ></div>

            <div>
                <p> {thermostatBatteryState}</p>
                <p> {thermostatBatteryVoltage} V</p>
                <p> {thermostatRSSI} dB</p>
            </div>

        </div>;


        return content;

    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        console.log("values" + JSON.stringify(this.state.values));
        console.log("rxData " + JSON.stringify(this.state.rxData));

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

