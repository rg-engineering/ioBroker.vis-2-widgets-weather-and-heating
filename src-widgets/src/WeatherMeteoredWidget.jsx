import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';


import {
    Box,
    TextField,
    Typography,
} from "@mui/material";



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

// todo oid nach Instanz neu belegen
// todo reload script after timeout or reopen



const setDataStructures = async (field, data, changeData, socket) => {
    console.log(`WeatherMeteoredWidget - set new datastructure ` );


    changeData(data);
};

class WeatherMeteoredWidget extends (Generic) {
    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();

        this.reloadTimer = null;
    }

   

    async componentDidMount() {

        super.componentDidMount();

        console.log(`WeatherMeteoredWidget - componentDidMount ` );

        this.AppendScript();

        this.CreateTimer();
    }

    async componentWillUnmount() {
        super.componentWillUnmount();
        console.log("WeatherMeteoredWidget - componentWillUnmount");
        if (this.reloadTimer != null) {
            clearTimeout(this.reloadTimer);
            this.reloadTimer = null;
        }
        const WidgetID = this.state.rxData["WidgetID"];
        const id = "script_mrwid" + WidgetID;
        // Prüfen, ob das Skript bereits geladen wurde
        if (document.getElementById(id)) {
            console.log(`WeatherMeteoredWidget - script already loaded, need to remove `);
            let element = document.getElementById(id);
            element.remove();
        }
    }

    async onPropertyUpdate() {

        console.log("WeatherMeteoredWidget - onPropertyUpdate");

        this.CreateTimer();
    }

    CreateTimer() {
        if (this.state.rxData.EnableReload) {

            console.log("WeatherMeteoredWidget - create intervall timer");
            //only once per hour
            const refreshInterval = 1000*60*60;

            if (this.reloadTimer != null) {
                clearTimeout(this.reloadTimer);
                this.reloadTimer = null;
            }

            this.reloadTimer = setInterval(() => {
                console.log("WeatherMeteoredWidget - reload script");
                this.AppendScript();
            }, refreshInterval);

        }
        else {
            console.log("WeatherMeteoredWidget - clear intervall timer");
            if (this.reloadTimer != null) {
                clearTimeout(this.reloadTimer);
                this.reloadTimer = null;
            }
        }
    }


    AppendScript() {
        const WidgetID = this.state.rxData["WidgetID"];

       
        //ce1253dd6597325da4b49b518529938d

        const src = "https://api.meteored.com/widget/loader/" + WidgetID;
        const id = "script_mrwid" + WidgetID;

        //const html = "<script type='text/javascript' async src=" + src + " onLoad={() => console.log('Meteored script loaded')}></script >";

        // Prüfen, ob das Skript bereits geladen wurde
        if (document.getElementById(id)) {
            console.log(`WeatherMeteoredWidget - script already loaded, need to remove `);

            let element = document.getElementById(id);
            element.remove();
        }


        console.log(`WeatherMeteoredWidget - script new created `);
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = true;
        document.body.appendChild(script);
    }



    static getWidgetInfo() {
        return {
            id: "tplWeatherMeteoredWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

            //visset -> see HeatingGeneralParamsWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "WeatherMeteoredWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-WeatherMeteoredWidget", // Label of widget
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
                            name: "WidgetID",    // name in data structure
                            label: "MeteoredWidgetID", // translated field label
                            type: "text",
                            default: "",
                            onChange: setDataStructures,
                            tooltip: "MeteoredWidgetID_tooltip",
                        },
                        {
                            name: "EnableReload",    // name in data structure
                            label: "ReloadEnabled", // translated field label
                            type: "checkbox",
                            default: true,
                            tooltip: "MeteoredWidgetEnableReload_tooltip",
                        },
                    ],
                },
                
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-WeatherMeteored.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return WeatherMeteoredWidget.getWidgetInfo();
    }

    createTable() {

        const WidgetID = this.state.rxData["WidgetID"];
        const id = "mrwid" + WidgetID;


        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >

            <div id={id}>

            </div>


        </div>;
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        console.log(`WeatherMeteoredWidget - renderWidgetBody `);

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`WeatherMeteoredWidget - renderWidgetBody size ${size}`);
      

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("WeatherMeteoredWidget - content only");
            return content;
        }



        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

WeatherMeteoredWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default WeatherMeteoredWidget;

