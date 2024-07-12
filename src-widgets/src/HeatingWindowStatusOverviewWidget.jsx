import React from "react";
import PropTypes from "prop-types";

import Generic from "./Generic";

//todo Zeit / Temperatur eingebbar
//todo aktuelle Periode markieren
//todo Breite optimieren
//todo bei mehreren Perioden : untereinander darstellen, wenn breite zu klein

const setDataStructures = async (field, data, changeData, socket) => {

    console.log(`set new datastructure instance ${data["instance"]}` );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {

    }
    changeData(data);
};


class HeatingWindowStatusOverviewWidget extends (Generic) {
    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo() {
        return {
            id: "tplHeatingWindowStatusOverviewWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather",        // Unique ID of widget set

            //visset -> see WeatherWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "HeatingWindowStatusOverviewWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-HeatingWindowStatusOverview", // Label of widget
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
                    ],
                },
                {
                    name: "OIDS_General", // group name
                    fields: [
                        {
                            name: "oid_CurrentProfile",    // name in data structure
                            label: "currentprofile", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.CurrentProfile",
                        },
                    ],
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather/img/vis-widget-HeatingWindowStatusOverview.png",
        };
    }


    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return HeatingWindowStatusOverviewWidget.getWidgetInfo();
    }

    createTable() {

        //to do
        return null;
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

        console.log("heating time schedule: size " + size);

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("heating time schedule: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

HeatingWindowStatusOverviewWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default HeatingWindowStatusOverviewWidget;

