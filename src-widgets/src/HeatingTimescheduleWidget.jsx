import React from "react";
import PropTypes from "prop-types";

// For federation it is important to import from one package "@mui/material" and not from "@mui/material/Box"
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
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

//todo Zeit / Temperatur eingebbar
//todo aktuelle Periode markieren
//todo Breite optimieren
//todo bei mehreren Perioden : untereinander darstellen, wenn breite zu klein

const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure instance" + data["instance"] );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {


        data["oid_CurrentProfile"] = instance + ".CurrentProfile";
        data["oid_ChoosenRoom"] = instance + ".vis.ChoosenRoom";
        data["oid_ProfileType"] = instance + ".info.ProfileType";
        //data["oid_ProfileName"] = instance + ".info.ProfileType";

        data["oid_CurrentTimePeriod"] = instance + ".vis.RoomValues.CurrentTimePeriod";


        //Mo-Su
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

        //Mo-Fr
        data["oid_profile_MoFr_1_Temperature"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.1.Temperature";
        data["oid_profile_MoFr_1_Time"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.1.time";
        data["oid_profile_MoFr_2_Temperature"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.2.Temperature";
        data["oid_profile_MoFr_2_Time"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.2.time";
        data["oid_profile_MoFr_3_Temperature"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.3.Temperature";
        data["oid_profile_MoFr_3_Time"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.3.time";
        data["oid_profile_MoFr_4_Temperature"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.4.Temperature";
        data["oid_profile_MoFr_4_Time"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.4.time";
        data["oid_profile_MoFr_5_Temperature"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.5.Temperature";
        data["oid_profile_MoFr_5_Time"] = instance + ".vis.ProfileTypes.Mo-Fr.Periods.5.time";

        //Sa-Su
        data["oid_profile_SaSu_1_Temperature"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.1.Temperature";
        data["oid_profile_SaSu_1_Time"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.1.time";
        data["oid_profile_SaSu_2_Temperature"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.2.Temperature";
        data["oid_profile_SaSu_2_Time"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.2.time";
        data["oid_profile_SaSu_3_Temperature"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.3.Temperature";
        data["oid_profile_SaSu_3_Time"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.3.time";
        data["oid_profile_SaSu_4_Temperature"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.4.Temperature";
        data["oid_profile_SaSu_4_Time"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.4.time";
        data["oid_profile_SaSu_5_Temperature"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.5.Temperature";
        data["oid_profile_SaSu_5_Time"] = instance + ".vis.ProfileTypes.Sa-Su.Periods.5.time";

        //Mon
        data["oid_profile_Mon_1_Temperature"] = instance + ".vis.ProfileTypes.Mon.Periods.1.Temperature";
        data["oid_profile_Mon_1_Time"] = instance + ".vis.ProfileTypes.Mon.Periods.1.time";
        data["oid_profile_Mon_2_Temperature"] = instance + ".vis.ProfileTypes.Mon.Periods.2.Temperature";
        data["oid_profile_Mon_2_Time"] = instance + ".vis.ProfileTypes.Mon.Periods.2.time";
        data["oid_profile_Mon_3_Temperature"] = instance + ".vis.ProfileTypes.Mon.Periods.3.Temperature";
        data["oid_profile_Mon_3_Time"] = instance + ".vis.ProfileTypes.Mon.Periods.3.time";
        data["oid_profile_Mon_4_Temperature"] = instance + ".vis.ProfileTypes.Mon.Periods.4.Temperature";
        data["oid_profile_Mon_4_Time"] = instance + ".vis.ProfileTypes.Mon.Periods.4.time";
        data["oid_profile_Mon_5_Temperature"] = instance + ".vis.ProfileTypes.Mon.Periods.5.Temperature";
        data["oid_profile_Mon_5_Time"] = instance + ".vis.ProfileTypes.Mon.Periods.5.time";

        //Tue
        data["oid_profile_Tue_1_Temperature"] = instance + ".vis.ProfileTypes.Tue.Periods.1.Temperature";
        data["oid_profile_Tue_1_Time"] = instance + ".vis.ProfileTypes.Tue.Periods.1.time";
        data["oid_profile_Tue_2_Temperature"] = instance + ".vis.ProfileTypes.Tue.Periods.2.Temperature";
        data["oid_profile_Tue_2_Time"] = instance + ".vis.ProfileTypes.Tue.Periods.2.time";
        data["oid_profile_Tue_3_Temperature"] = instance + ".vis.ProfileTypes.Tue.Periods.3.Temperature";
        data["oid_profile_Tue_3_Time"] = instance + ".vis.ProfileTypes.Tue.Periods.3.time";
        data["oid_profile_Tue_4_Temperature"] = instance + ".vis.ProfileTypes.Tue.Periods.4.Temperature";
        data["oid_profile_Tue_4_Time"] = instance + ".vis.ProfileTypes.Tue.Periods.4.time";
        data["oid_profile_Tue_5_Temperature"] = instance + ".vis.ProfileTypes.Tue.Periods.5.Temperature";
        data["oid_profile_Tue_5_Time"] = instance + ".vis.ProfileTypes.Tue.Periods.5.time";

        //Wed
        data["oid_profile_Wed_1_Temperature"] = instance + ".vis.ProfileTypes.Wed.Periods.1.Temperature";
        data["oid_profile_Wed_1_Time"] = instance + ".vis.ProfileTypes.Wed.Periods.1.time";
        data["oid_profile_Wed_2_Temperature"] = instance + ".vis.ProfileTypes.Wed.Periods.2.Temperature";
        data["oid_profile_Wed_2_Time"] = instance + ".vis.ProfileTypes.Wed.Periods.2.time";
        data["oid_profile_Wed_3_Temperature"] = instance + ".vis.ProfileTypes.Wed.Periods.3.Temperature";
        data["oid_profile_Wed_3_Time"] = instance + ".vis.ProfileTypes.Wed.Periods.3.time";
        data["oid_profile_Wed_4_Temperature"] = instance + ".vis.ProfileTypes.Wed.Periods.4.Temperature";
        data["oid_profile_Wed_4_Time"] = instance + ".vis.ProfileTypes.Wed.Periods.4.time";
        data["oid_profile_Wed_5_Temperature"] = instance + ".vis.ProfileTypes.Wed.Periods.5.Temperature";
        data["oid_profile_Wed_5_Time"] = instance + ".vis.ProfileTypes.Wed.Periods.5.time";

        //Thu
        data["oid_profile_Thu_1_Temperature"] = instance + ".vis.ProfileTypes.Thu.Periods.1.Temperature";
        data["oid_profile_Thu_1_Time"] = instance + ".vis.ProfileTypes.Thu.Periods.1.time";
        data["oid_profile_Thu_2_Temperature"] = instance + ".vis.ProfileTypes.Thu.Periods.2.Temperature";
        data["oid_profile_Thu_2_Time"] = instance + ".vis.ProfileTypes.Thu.Periods.2.time";
        data["oid_profile_Thu_3_Temperature"] = instance + ".vis.ProfileTypes.Thu.Periods.3.Temperature";
        data["oid_profile_Thu_3_Time"] = instance + ".vis.ProfileTypes.Thu.Periods.3.time";
        data["oid_profile_Thu_4_Temperature"] = instance + ".vis.ProfileTypes.Thu.Periods.4.Temperature";
        data["oid_profile_Thu_4_Time"] = instance + ".vis.ProfileTypes.Thu.Periods.4.time";
        data["oid_profile_Thu_5_Temperature"] = instance + ".vis.ProfileTypes.Thu.Periods.5.Temperature";
        data["oid_profile_Thu_5_Time"] = instance + ".vis.ProfileTypes.Thu.Periods.5.time";

        //Fri
        data["oid_profile_Fri_1_Temperature"] = instance + ".vis.ProfileTypes.Fri.Periods.1.Temperature";
        data["oid_profile_Fri_1_Time"] = instance + ".vis.ProfileTypes.Fri.Periods.1.time";
        data["oid_profile_Fri_2_Temperature"] = instance + ".vis.ProfileTypes.Fri.Periods.2.Temperature";
        data["oid_profile_Fri_2_Time"] = instance + ".vis.ProfileTypes.Fri.Periods.2.time";
        data["oid_profile_Fri_3_Temperature"] = instance + ".vis.ProfileTypes.Fri.Periods.3.Temperature";
        data["oid_profile_Fri_3_Time"] = instance + ".vis.ProfileTypes.Fri.Periods.3.time";
        data["oid_profile_Fri_4_Temperature"] = instance + ".vis.ProfileTypes.Fri.Periods.4.Temperature";
        data["oid_profile_Fri_4_Time"] = instance + ".vis.ProfileTypes.Fri.Periods.4.time";
        data["oid_profile_Fri_5_Temperature"] = instance + ".vis.ProfileTypes.Fri.Periods.5.Temperature";
        data["oid_profile_Fri_5_Time"] = instance + ".vis.ProfileTypes.Fri.Periods.5.time";

        //Sat
        data["oid_profile_Sat_1_Temperature"] = instance + ".vis.ProfileTypes.Sat.Periods.1.Temperature";
        data["oid_profile_Sat_1_Time"] = instance + ".vis.ProfileTypes.Sat.Periods.1.time";
        data["oid_profile_Sat_2_Temperature"] = instance + ".vis.ProfileTypes.Sat.Periods.2.Temperature";
        data["oid_profile_Sat_2_Time"] = instance + ".vis.ProfileTypes.Sat.Periods.2.time";
        data["oid_profile_Sat_3_Temperature"] = instance + ".vis.ProfileTypes.Sat.Periods.3.Temperature";
        data["oid_profile_Sat_3_Time"] = instance + ".vis.ProfileTypes.Sat.Periods.3.time";
        data["oid_profile_Sat_4_Temperature"] = instance + ".vis.ProfileTypes.Sat.Periods.4.Temperature";
        data["oid_profile_Sat_4_Time"] = instance + ".vis.ProfileTypes.Sat.Periods.4.time";
        data["oid_profile_Sat_5_Temperature"] = instance + ".vis.ProfileTypes.Sat.Periods.5.Temperature";
        data["oid_profile_Sat_5_Time"] = instance + ".vis.ProfileTypes.Sat.Periods.5.time";

        //Sun
        data["oid_profile_Sun_1_Temperature"] = instance + ".vis.ProfileTypes.Sun.Periods.1.Temperature";
        data["oid_profile_Sun_1_Time"] = instance + ".vis.ProfileTypes.Sun.Periods.1.time";
        data["oid_profile_Sun_2_Temperature"] = instance + ".vis.ProfileTypes.Sun.Periods.2.Temperature";
        data["oid_profile_Sun_2_Time"] = instance + ".vis.ProfileTypes.Sun.Periods.2.time";
        data["oid_profile_Sun_3_Temperature"] = instance + ".vis.ProfileTypes.Sun.Periods.3.Temperature";
        data["oid_profile_Sun_3_Time"] = instance + ".vis.ProfileTypes.Sun.Periods.3.time";
        data["oid_profile_Sun_4_Temperature"] = instance + ".vis.ProfileTypes.Sun.Periods.4.Temperature";
        data["oid_profile_Sun_4_Time"] = instance + ".vis.ProfileTypes.Sun.Periods.4.time";
        data["oid_profile_Sun_5_Temperature"] = instance + ".vis.ProfileTypes.Sun.Periods.5.Temperature";
        data["oid_profile_Sun_5_Time"] = instance + ".vis.ProfileTypes.Sun.Periods.5.time";

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
            visSet: "vis-2-widgets-heating",        // Unique ID of widget set

            //visset -> see HeatingGeneralParamsWidget
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
                        {
                            name: "oid_ChoosenRoom",    // name in data structure
                            label: "choosenroom", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ChoosenRoom",
                        },
                        {
                            name: "oid_ProfileType",    // name in data structure
                            label: "profiletype", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.info.ProfileType",
                        },
                        {
                            name: "oid_NumberOfPeriods",    // name in data structure
                            label: "numberofperiods", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.info.NumberOfPeriods",
                        },
                        {
                            name: "oid_CurrentTimePeriod",    // name in data structure
                            label: "currenttimeperiod", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomValues.CurrentTimePeriod",
                        },




                    ],
                },
                {
                    name: "OIDS_Profile_MoSu", // group name
                    fields: [
                        {
                            name: "oid_profile_MoSu_1_Temperature",    // name in data structure
                            label: "profilemosu1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_1_Time",    // name in data structure
                            label: "profilemosu1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.time",
                        },

                        {
                            name: "oid_profile_MoSu_2_Temperature",    // name in data structure
                            label: "profilemosu2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_2_Time",    // name in data structure
                            label: "profilemosu2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.2.time",
                        },

                        {
                            name: "oid_profile_MoSu_3_Temperature",    // name in data structure
                            label: "profilemosu3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_3_Time",    // name in data structure
                            label: "profilemosu3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.3.time",
                        },

                        {
                            name: "oid_profile_MoSu_4_Temperature",    // name in data structure
                            label: "profilemosu4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_4_Time",    // name in data structure
                            label: "profilemosu4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.4.time",
                        },

                        {
                            name: "oid_profile_MoSu_5_Temperature",    // name in data structure
                            label: "profilemosu5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_MoSu_5_Time",    // name in data structure
                            label: "profilemosu5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.5.time",
                        },
                    ],
                },
                {
                    name: "OIDS_Profile_MoFr_SaSu", // group name
                    fields: [
                        {
                            name: "oid_profile_MoFr_1_Temperature",    // name in data structure
                            label: "profilemofr1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_MoFr_1_Time",    // name in data structure
                            label: "profilemofr1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.1.time",
                        },

                        {
                            name: "oid_profile_MoFr_2_Temperature",    // name in data structure
                            label: "profilemofr2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_MoFr_2_Time",    // name in data structure
                            label: "profilemofr2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.2.time",
                        },

                        {
                            name: "oid_profile_MoFr_3_Temperature",    // name in data structure
                            label: "profilemofr3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_MoFr_3_Time",    // name in data structure
                            label: "profilemofr3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.3.time",
                        },

                        {
                            name: "oid_profile_MoFr_4_Temperature",    // name in data structure
                            label: "profilemofr4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_MoFr_4_Time",    // name in data structure
                            label: "profilemofr4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.4.time",
                        },

                        {
                            name: "oid_profile_MoFr_5_Temperature",    // name in data structure
                            label: "profilemofr5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_MoFr_5_Time",    // name in data structure
                            label: "profilemofr5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mo-Fr.Periods.5.time",
                        },

                        //=================
                        {
                            name: "oid_profile_SaSu_1_Temperature",    // name in data structure
                            label: "profilesasu1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_SaSu_1_Time",    // name in data structure
                            label: "profilesasu1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.1.time",
                        },

                        {
                            name: "oid_profile_SaSu_2_Temperature",    // name in data structure
                            label: "profilesasu2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_SaSu_2_Time",    // name in data structure
                            label: "profilesasu2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.2.time",
                        },

                        {
                            name: "oid_profile_SaSu_3_Temperature",    // name in data structure
                            label: "profilesasu3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_SaSu_3_Time",    // name in data structure
                            label: "profilesasu3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.3.time",
                        },

                        {
                            name: "oid_profile_SaSu_4_Temperature",    // name in data structure
                            label: "profilesasu4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_SaSu_4_Time",    // name in data structure
                            label: "profilesasu4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.4.time",
                        },

                        {
                            name: "oid_profile_SaSu_5_Temperature",    // name in data structure
                            label: "profilesasu5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_SaSu_5_Time",    // name in data structure
                            label: "profilesasu5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sa-Su.Periods.5.time",
                        },

                    ]
                },
                {
                    name: "OIDS_Profile_EveryDay", // group name
                    fields: [

                        //Mon
                        {
                            name: "oid_profile_Mon_1_Temperature",    // name in data structure
                            label: "profilemon1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_Mon_1_Time",    // name in data structure
                            label: "profilemon1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.1.time",
                        },

                        {
                            name: "oid_profile_Mon_2_Temperature",    // name in data structure
                            label: "profilemon2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_Mon_2_Time",    // name in data structure
                            label: "profilemon2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.2.time",
                        },

                        {
                            name: "oid_profile_Mon_3_Temperature",    // name in data structure
                            label: "profilemon3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_Mon_3_Time",    // name in data structure
                            label: "profilemon3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.3.time",
                        },

                        {
                            name: "oid_profile_Mon_4_Temperature",    // name in data structure
                            label: "profilemon4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_Mon_4_Time",    // name in data structure
                            label: "profilemon4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.4.time",
                        },

                        {
                            name: "oid_profile_Mon_5_Temperature",    // name in data structure
                            label: "profilemon5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_Mon_5_Time",    // name in data structure
                            label: "profilemon5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.Periods.5.time",
                        },


                        //Tue
                        {
                            name: "oid_profile_Tue_1_Temperature",    // name in data structure
                            label: "profiletue1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_Tue_1_Time",    // name in data structure
                            label: "profiletue1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.1.time",
                        },

                        {
                            name: "oid_profile_Tue_2_Temperature",    // name in data structure
                            label: "profiletue2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_Tue_2_Time",    // name in data structure
                            label: "profiletue2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.2.time",
                        },

                        {
                            name: "oid_profile_Tue_3_Temperature",    // name in data structure
                            label: "profiletue3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_Tue_3_Time",    // name in data structure
                            label: "profiletue3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.3.time",
                        },

                        {
                            name: "oid_profile_Tue_4_Temperature",    // name in data structure
                            label: "profiletue4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_Tue_4_Time",    // name in data structure
                            label: "profiletue4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.4.time",
                        },

                        {
                            name: "oid_profile_Tue_5_Temperature",    // name in data structure
                            label: "profiletue5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_Tue_5_Time",    // name in data structure
                            label: "profiletue5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.Periods.5.time",
                        },


                        //Wed
                        {
                            name: "oid_profile_Wed_1_Temperature",    // name in data structure
                            label: "profilewed1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_Wed_1_Time",    // name in data structure
                            label: "profilewed1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.1.time",
                        },

                        {
                            name: "oid_profile_Wed_2_Temperature",    // name in data structure
                            label: "profilewed2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_Wed_2_Time",    // name in data structure
                            label: "profilewed2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.2.time",
                        },

                        {
                            name: "oid_profile_Wed_3_Temperature",    // name in data structure
                            label: "profilewed3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_Wed_3_Time",    // name in data structure
                            label: "profilewed3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.3.time",
                        },

                        {
                            name: "oid_profile_Wed_4_Temperature",    // name in data structure
                            label: "profilewed4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_Wed_4_Time",    // name in data structure
                            label: "profilewed4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.4.time",
                        },

                        {
                            name: "oid_profile_Wed_5_Temperature",    // name in data structure
                            label: "profilewed5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_Wed_5_Time",    // name in data structure
                            label: "profilewed5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.Periods.5.time",
                        },

                        //Thu
                        {
                            name: "oid_profile_Thu_1_Temperature",    // name in data structure
                            label: "profilethu1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_Thu_1_Time",    // name in data structure
                            label: "profilethu1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.1.time",
                        },

                        {
                            name: "oid_profile_Thu_2_Temperature",    // name in data structure
                            label: "profilethu2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_Thu_2_Time",    // name in data structure
                            label: "profilethu2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.2.time",
                        },

                        {
                            name: "oid_profile_Thu_3_Temperature",    // name in data structure
                            label: "profilethu3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_Thu_3_Time",    // name in data structure
                            label: "profilethu3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.3.time",
                        },

                        {
                            name: "oid_profile_Thu_4_Temperature",    // name in data structure
                            label: "profilethu4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_Thu_4_Time",    // name in data structure
                            label: "profilethu4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.4.time",
                        },

                        {
                            name: "oid_profile_Thu_5_Temperature",    // name in data structure
                            label: "profilethu5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_Thu_5_Time",    // name in data structure
                            label: "profilethu5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.Periods.5.time",
                        },

                        //Fri
                        {
                            name: "oid_profile_Fri_1_Temperature",    // name in data structure
                            label: "profilefri1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_Fri_1_Time",    // name in data structure
                            label: "profilefri1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.1.time",
                        },

                        {
                            name: "oid_profile_Fri_2_Temperature",    // name in data structure
                            label: "profilefri2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_Fri_2_Time",    // name in data structure
                            label: "profilefri2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.2.time",
                        },

                        {
                            name: "oid_profile_Fri_3_Temperature",    // name in data structure
                            label: "profilefri3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_Fri_3_Time",    // name in data structure
                            label: "profilefri3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.3.time",
                        },

                        {
                            name: "oid_profile_Fri_4_Temperature",    // name in data structure
                            label: "profilefri4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_Fri_4_Time",    // name in data structure
                            label: "profilefri4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.4.time",
                        },

                        {
                            name: "oid_profile_Fri_5_Temperature",    // name in data structure
                            label: "profilefri5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_Fri_5_Time",    // name in data structure
                            label: "profilefri5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.Periods.5.time",
                        },


                        //Sat
                        {
                            name: "oid_profile_Sat_1_Temperature",    // name in data structure
                            label: "profilesat1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_Sat_1_Time",    // name in data structure
                            label: "profilesat1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.1.time",
                        },

                        {
                            name: "oid_profile_Sat_2_Temperature",    // name in data structure
                            label: "profilesat2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_Sat_2_Time",    // name in data structure
                            label: "profilesat2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.2.time",
                        },

                        {
                            name: "oid_profile_Sat_3_Temperature",    // name in data structure
                            label: "profilesat3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_Sat_3_Time",    // name in data structure
                            label: "profilesat3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.3.time",
                        },

                        {
                            name: "oid_profile_Sat_4_Temperature",    // name in data structure
                            label: "profilesat4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_Sat_4_Time",    // name in data structure
                            label: "profilesat4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.4.time",
                        },

                        {
                            name: "oid_profile_Sat_5_Temperature",    // name in data structure
                            label: "profilesat5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_Sat_5_Time",    // name in data structure
                            label: "profilesat5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.Periods.5.time",
                        },

                        //Sun
                        {
                            name: "oid_profile_Sun_1_Temperature",    // name in data structure
                            label: "profilesun1_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.1.Temperature",
                        },
                        {
                            name: "oid_profile_Sun_1_Time",    // name in data structure
                            label: "profilesun1_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.1.time",
                        },

                        {
                            name: "oid_profile_Sun_2_Temperature",    // name in data structure
                            label: "profilesun2_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.2.Temperature",
                        },
                        {
                            name: "oid_profile_Sun_2_Time",    // name in data structure
                            label: "profilesun2_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.2.time",
                        },

                        {
                            name: "oid_profile_Sun_3_Temperature",    // name in data structure
                            label: "profilesun3_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.3.Temperature",
                        },
                        {
                            name: "oid_profile_Sun_3_Time",    // name in data structure
                            label: "profilesun3_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.3.time",
                        },

                        {
                            name: "oid_profile_Sun_4_Temperature",    // name in data structure
                            label: "profilesun4_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.4.Temperature",
                        },
                        {
                            name: "oid_profile_Sun_4_Time",    // name in data structure
                            label: "profilesun4_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.4.time",
                        },

                        {
                            name: "oid_profile_Sun_5_Temperature",    // name in data structure
                            label: "profilesun5_temperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.5.Temperature",
                        },
                        {
                            name: "oid_profile_Sun_5_Time",    // name in data structure
                            label: "profilesun5_time", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sun.Periods.5.time",
                        },


                    ]
                }


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


    copyPeriods(noOfPeriods, part) {

        const periods = [];

        for (let p = 1; p <= noOfPeriods; p++) {

            const oid_time = "oid_profile_" + part + "_" + p + "_Time";
            const oid_temperature = "oid_profile_" + part + "_" + p + "_Temperature";

            const time = this.state.values[`${this.state.rxData[oid_time]}.val`];
            const temperature = this.state.values[`${this.state.rxData[oid_temperature]}.val`];

            console.log("map " + p + " " + time + " " + temperature + " " + oid_time + " " + oid_temperature);

            periods.push(this.createData(p, time, temperature));
        }

        return periods;
    }


    createTimeTableDetails(periods, currentTimePeriod) {
        //https://mui.com/material-ui/react-table/

        console.log("createTimeTableDetails " + currentTimePeriod);

        const timetable = <TableContainer component={Paper}>
            <Table  size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell align="right">{Generic.t("Period")}</TableCell>
                        <TableCell align="right">{Generic.t("from")}</TableCell>
                        <TableCell align="right" > {Generic.t("Temperature")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {periods.map((period) => (
                        <TableRow
                            key={period.index}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            style={{ background: period.index === currentTimePeriod ? "red" : "" }}
                        >
                            <TableCell align="center">{period.index}</TableCell>
                            <TableCell align="right">{period.time}</TableCell>
                            <TableCell align="right">{period.temperature}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>;


        return timetable;


    }


    createTable_MoSu(noOfPeriods, room, profileName, currentProfile, currentTimePeriod) {

        console.log("createTable_MoSu called " + room);


        const periods = this.copyPeriods(noOfPeriods, "MoSu");
        const timetable = this.createTimeTableDetails(periods, currentTimePeriod);


        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >

            <div>
                <p>{Generic.t("Times in week")}</p>
                <p> {Generic.t("Profil")}  {currentProfile}  /   {room}</p>
            </div>


            <Grid
                container spacing={0.5}
                alignItems="center"
                justifyContent="center"
            >


                <Grid item xs={12} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Mo. - So.")}</p>
                        {timetable}
                    </div>
                </Grid>
            </Grid>



        </div>;


        return content;
    }

    createTable_MoFr_SaSo(noOfPeriods, room, profileName, currentProfile, currentTimePeriod) {
        console.log("createTable_MoFr_SaSo called " + room + " " + noOfPeriods + " " + currentTimePeriod);

        const periodsMoFr = this.copyPeriods(noOfPeriods, "MoFr");
        const periodsSaSu = this.copyPeriods(noOfPeriods, "SaSu");

        let curTimePeriod = -1;
        let tempTimePeriod = currentTimePeriod;

        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableMoFr = this.createTimeTableDetails(periodsMoFr, curTimePeriod);

        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }

        const timetableSaSu = this.createTimeTableDetails(periodsSaSu, curTimePeriod);

        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div>
                <p>{Generic.t("Times in week")}</p>
                <p> {Generic.t("Profil ")} {currentProfile}  /   {room}</p>
            </div>

            <Grid
                container
                spacing={0.5}
                alignItems="center"
                justifyContent="center"
                style={{
                    maxHeight: "100vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "auto",
                    overflow: "auto",
                }}
            >


                <Grid item xs={6} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Mo. - Fr.")}</p>
                        {timetableMoFr}
                    </div>
                </Grid>

                <Grid item xs={6} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Sa. - Su.")}</p>
                        {timetableSaSu}
                    </div>
                </Grid>




            </Grid>

        </div>;


        return content;
    }

    createTable_EveryDay(noOfPeriods, room, profileName, currentProfile, currentTimePeriod) {

        console.log("createTable_EveryDay called " + room);

        const periodsMon = this.copyPeriods(noOfPeriods, "Mon");
        const periodsTue = this.copyPeriods(noOfPeriods, "Tue");
        const periodsWed = this.copyPeriods(noOfPeriods, "Wed");
        const periodsThu = this.copyPeriods(noOfPeriods, "Thu");
        const periodsFri = this.copyPeriods(noOfPeriods, "Fri");
        const periodsSat = this.copyPeriods(noOfPeriods, "Sat");
        const periodsSun = this.copyPeriods(noOfPeriods, "Sun");

        let curTimePeriod = -1;
        let tempTimePeriod = currentTimePeriod;

        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }

        const timetableMon = this.createTimeTableDetails(periodsMon, curTimePeriod);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableTue = this.createTimeTableDetails(periodsTue, curTimePeriod);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableWed = this.createTimeTableDetails(periodsWed, curTimePeriod);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableThu = this.createTimeTableDetails(periodsThu, curTimePeriod);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableFri = this.createTimeTableDetails(periodsFri, curTimePeriod);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableSat = this.createTimeTableDetails(periodsSat, curTimePeriod);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableSun = this.createTimeTableDetails(periodsSun, curTimePeriod);



        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div>
                <p>{Generic.t("Times in week")}</p>
                <p> {Generic.t("Profil ")} {currentProfile}  /   {room}</p>
            </div>

            <Grid
                container
                spacing={5}
                wrap="wrap"
            >
                <Grid item xs={12 / 7} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Mon.")}</p>
                        {timetableMon}
                    </div>
                </Grid>
                <Grid item xs={12 / 7} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Tue.")}</p>
                        {timetableTue}
                    </div>
                </Grid>
                <Grid item xs={12 / 7} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Wed.")}</p>
                        {timetableWed}
                    </div>
                </Grid>
                <Grid item xs={12 / 7} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Thu.")}</p>
                        {timetableThu}
                    </div>
                </Grid>
                <Grid item xs={12 / 7} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Fri.")}</p>
                        {timetableFri}
                    </div>
                </Grid>
                <Grid item xs={12 / 7} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Sat.")}</p>
                        {timetableSat}
                    </div>
                </Grid>
                <Grid item xs={12 / 7} maxWidth="150px">
                    <div>
                        <p>{Generic.t("Sun.")}</p>
                        {timetableSun}
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
        const profileName = "";
        //const profileName = this.state.values[`${this.state.rxData["oid_ProfileName"]}.val`];
        const currentProfile = this.state.values[`${this.state.rxData["oid_CurrentProfile"]}.val`];

        const currentTimePeriod = this.state.values[`${this.state.rxData["oid_CurrentTimePeriod"]}.val`];

        if (profileType === "Mo - Su") {
            return this.createTable_MoSu(noOfPeriods, room, profileName, currentProfile, currentTimePeriod);
        }

        else if (profileType === "Mo - Fr / Sa - Su") {
            return this.createTable_MoFr_SaSo(noOfPeriods, room, profileName, currentProfile, currentTimePeriod);
        }

        else if (profileType === "every Day") {
            return this.createTable_EveryDay(noOfPeriods, room, profileName, currentProfile, currentTimePeriod);
        }
        else {
            console.log("unknown profile type " + profileType);
            return null;

        }
    }


    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        console.log("HeatingTimescheduleWidget values ${JSON.stringify(this.state.values)");
        console.log("HeatingTimescheduleWidget rxData ${JSON.stringify(this.state.rxData)");

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

export default HeatingTimescheduleWidget;

