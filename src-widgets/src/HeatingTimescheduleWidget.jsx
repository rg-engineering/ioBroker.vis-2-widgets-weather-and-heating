import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@mui/styles";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";



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

//todo OID's konfigurierbar
//todo perioden nach Daten anzeigen
//todo Zeit / Temperatur eingebbar
//todo Mo - So, Mo -Fr + Sa So, jeder Tag einzeln


const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure instance" + data["instance"] );

    const instance = data["instance"];
    
    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {


        data["oid_CurrentProfile"] = instance + ".CurrentProfile";
        data["oid_ChoosenRoom"] = instance + ".vis.ChoosenRoom";
        data["oid_ProfileType"] = instance + ".info.ProfileType";
        data["oid_NumberOfPeriods"] = instance + ".info.NumberOfPeriods";
        data["oid_profile_MoSu_1_Temperature"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.1.Temperature";
        data["oid_profile_MoSu_1_Time"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.1.time";
        data["oid_profile_MoSu_2_Temperature"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.2.Temperature";
        data["oid_profile_MoSu_2_Time"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.2.time";
        data["oid_profile_MoSu_3_Temperature"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.3.Temperature";
        data["oid_profile_MoSu_3_Time"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.3.time";
        data["oid_profile_MoSu_4_Temperature"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.4.Temperature";
        data["oid_profile_MoSu_4_Time"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.4.time";
        data["oid_profile_MoSu_5_Temperature"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.5.Temperature";
        data["oid_profile_MoSu_5_Time"] = instance + ".vis.ProfileTypes.Mo-Su.Periods.5.time";


        /*
        heatingcontrol.0.CurrentProfile
        heatingcontrol.0.Profiles.1.ProfileName

        heatingcontrol.0.vis.ChoosenRoom

        heatingcontrol.0.info.ProfileType
        heatingcontrol.0.info.NumberOfPeriods
        heatingcontrol.0.info.NumberOfPeriods


        heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.Temperature
        heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.time
        */

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

                        /*
                               
        heatingcontrol.0.Profiles.1.ProfileName



        
        



        
        heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.time
                        */


                        {
                            name: "oid_CurrentProfile",    // name in data structure
                            label: "widgets_heating_label_currentprofile", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.CurrentProfile",
                        },
                        {
                            name: "oid_ChoosenRoom",    // name in data structure
                            label: "widgets_heating_label_choosenroom", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ChoosenRoom",
                        },
                        {
                            name: "oid_ProfileType",    // name in data structure
                            label: "widgets_heating_label_profiletype", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.info.ProfileType",
                        },
                        {
                            name: "oid_NumberOfPeriods",    // name in data structure
                            label: "widgets_heating_label_numberofperiods", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.info.NumberOfPeriods",
                        },

                        {
                            name: "oid_profile_MoSu_1_Temperature",    // name in data structure
                            label: "widgets_heating_label_profilemosu1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_1_Time",    // name in data structure
                            label: "widgets_heating_label_profilemosu1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.time",
                        },

                        {
                            name: "oid_profile_MoSu_2_Temperature",    // name in data structure
                            label: "widgets_heating_label_profilemosu2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_2_Time",    // name in data structure
                            label: "widgets_heating_label_profilemosu2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.2.time",
                        },

                        {
                            name: "oid_profile_MoSu_3_Temperature",    // name in data structure
                            label: "widgets_heating_label_profilemosu3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_3_Time",    // name in data structure
                            label: "widgets_heating_label_profilemosu3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.3.time",
                        },

                        {
                            name: "oid_profile_MoSu_4_Temperature",    // name in data structure
                            label: "widgets_heating_label_profilemosu4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_4_Time",    // name in data structure
                            label: "widgets_heating_label_profilemosu4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.4.time",
                        },

                        {
                            name: "oid_profile_MoSu_5_Temperature",    // name in data structure
                            label: "widgets_heating_label_profilemosu5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_5_Time",    // name in data structure
                            label: "widgets_heating_label_profilemosu5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.5.time",
                        },
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

    createData(index, time, temperature) {
        return { index, time, temperature };
    }
    

    createTable_MoSu(noOfPeriods, room) {

        console.log("createTable_MoSu called " + room);


        const periods = [];

        for (let p = 1; p <= noOfPeriods; p++) {

            const oid_time = "oid_profile_MoSu_" + p + "_Time";
            const oid_temperature = "oid_profile_MoSu_" + p + "_Temperature";

            const time = this.state.values[`${this.state.rxData[oid_temperature]}.val`];
            const temperature = this.state.values[`${this.state.rxData[oid_time]}.val`];

            console.log("map " + p + " " + time + " " + temperature + " " + oid_time + " " + oid_temperature);

            periods.push(this.createData(p, time, temperature));
        }


        const timetable = <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">{I18n.t("Period")}</TableCell>
                        <TableCell align="right">{I18n.t("from")}</TableCell>
                        <TableCell align="right" > {I18n.t("Temperature")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {periods.map((period) => (
                        <TableRow
                            key={period.index}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {period.index}
                            </TableCell>
                            <TableCell align="right">{period.time}</TableCell>
                            <TableCell align="right">{period.temperature}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>;


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
                        <p>{I18n.t("Zeiten / Woche")}</p>
                        <p> {I18n.t("Profil / ")} {room}</p>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <p>{I18n.t("Mo. - So.")}</p>
                    </div>
                </Grid>
            </Grid>

            {timetable}







        </div>;


        return content;
    }

    createTable_MoFr_SaSo(noOfPeriods, room) {
        console.log("createTable_MoFr_SaSo called " + room);

        for (let p = 1; p <= noOfPeriods; p++) {
        }

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
                        <p>{I18n.t("Zeiten / Woche")}</p>
                        <p> {I18n.t("Profil / ")} {room}</p>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <p>{I18n.t("Mo. - Fr. / Sa. - Su.")}</p>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div>
                        <p>{I18n.t("Per.")}</p>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div>
                        <p>{I18n.t("ab")}</p>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div>
                        <p>{I18n.t("°C")}</p>
                    </div>
                </Grid>

                
                



            </Grid>
        </div>;
        return content;
    }

    createTable_EveryDay(noOfPeriods, room) {

        console.log("createTable_EvreryDay called " + room);

        for (let p = 1; p <= noOfPeriods; p++) {
        }

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
                        <p>{I18n.t("Zeiten / Woche")}</p>
                        <p> {I18n.t("Profil / ")} {room}</p>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <p>{I18n.t("every day")}</p>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div>
                        <p>{I18n.t("Per.")}</p>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div>
                        <p>{I18n.t("ab")}</p>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div>
                        <p>{I18n.t("°C")}</p>
                    </div>
                </Grid>






            </Grid>
        </div>;
        return content;

    }

    CreateTable() {

        const profileType = this.state.values[`${this.state.rxData["oid_ProfileType"]}.val`];
        const noOfPeriods = this.state.values[`${this.state.rxData["oid_NumberOfPeriods"]}.val`];
        const room = this.state.values[`${this.state.rxData["oid_ChoosenRoom"]}.val`];

        if (profileType === "Mo - Su") {
            return this.createTable_MoSu(noOfPeriods, room);
        }

        else if (profileType === "Mo - Fr / Sa - Su") {
            return this.createTable_MoFr_SaSo(noOfPeriods, room);
        }

        else if (profileType === "every Day") {
            return this.createTable_EveryDay(noOfPeriods, room);
        }
        else {
            console.log("unknown profile type " + profileType);
            return null;

        }
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

        
        const content = this.CreateTable();
        

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

