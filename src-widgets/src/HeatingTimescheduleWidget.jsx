import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@mui/styles";

import Grid from "@mui/material/Grid";


//import { Card, CardContent } from "@mui/material";

import { I18n } from "@iobroker/adapter-react-v5";

import Generic from "./Generic";

const styles = () => ({
    cardContent: {
        flex: 1,
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
});

const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure instance" + data["instance"] );

    const instance = data["instance"];
    
    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {


    }
    changeData(data);
};


class HeatingTimescheduleWidget extends (Generic) {

    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }


    static getWidgetInfo() {

       


        return {
            id: "tplHeatingTimescheduleWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather",        // Unique ID of widget set

            //visset -> see WeatherWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "HeatingTimescheduleWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-heatingtimeschedule", // Label of widget
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
                            label: "widgets_weather_label_instance", // translated field label
                            type: "instance",
                            default: "daswetter.0",
                            onChange: setDataStructures,
                        },
                        
                        
                    ],
                },
                {



                    name: "OIDS", // group name
                    fields: [

                        

                    ],
                },
               

            ],
            visPrev: "widgets/vis-2-widgets-weather/img/vis-widget-heatingtimeschedule.png",
        };
    }

    // eslint-disable-next-line class-methods-use-this
    propertiesUpdate() {
        // Widget has 3 important states
        // 1. this.state.values - contains all state values, that are used in widget (automatically collected from widget info).
        //                        So you can use `this.state.values[this.state.rxData.oid + ".val"]` to get value of state with id this.state.rxData.oid
        // 2. this.state.rxData - contains all widget data with replaced bindings. E.g. if this.state.data.type is `{system.adapter.admin.0.alive}`,
        //                        then this.state.rxData.type will have state value of `system.adapter.admin.0.alive`
        // 3. this.state.rxStyle - contains all widget styles with replaced bindings. E.g. if this.state.styles.width is `{javascript.0.width}px`,
        //                        then this.state.rxData.type will have state value of `javascript.0.width` + "px
    }



    async componentDidMount() {
        super.componentDidMount();

        // Update data
        this.propertiesUpdate();
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return HeatingTimescheduleWidget.getWidgetInfo();
    }

    // This function is called every time when rxData is changed
    async onRxDataChanged() {

        this.propertiesUpdate();
    }

    // This function is called every time when rxStyle is changed
    // eslint-disable-next-line class-methods-use-this
    onRxStyleChanged() {

    }

    // This function is called every time when some Object State updated, but all changes lands into this.state.values too
    // eslint-disable-next-line class-methods-use-this, no-unused-vars
    onStateUpdated(id, state) {

    }

    
   

    renderWidgetBody(props) {
        super.renderWidgetBody(props);


        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }
        
        console.log("heating time schedule: size " + size);

        

        const content = <div
            ref={this.refCardContent}
            className={this.props.classes.cardContent}
        >

            <Grid
                container spacing={0.5}
                alignItems="center"
                justifyContent="center"
            >

                <Grid item xs={12}>
                    <div>
                        <p>{this.state.values[`${this.state.rxData["oid_dayname"]}.val`]}</p>    
                        <p>{oDate.toLocaleDateString()}</p>
                    </div>
                </Grid>
                
        
            </Grid>
        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("heating time schedule: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

HeatingTimescheduleWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default withStyles(styles)(withTheme(HeatingTimescheduleWidget));

