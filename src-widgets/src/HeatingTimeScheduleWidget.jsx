import React from "react";
import PropTypes from "prop-types";

// For federation, it is important to import from one package "@mui/material" and not from "@mui/material/Box"
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    InputLabel,
    MenuItem,
    Select,
    Box,
    //IconButton,
    //Input,
    InputAdornment,
    //InputLabel,
    FormControl,
    //FilledInput,
    FormHelperText,
    //TextField,
    OutlinedInput,
    //Visibility,
    //VisibilityOff,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/uk';
import 'dayjs/locale/it';
import 'dayjs/locale/fr';
import 'dayjs/locale/es';
import 'dayjs/locale/pl';
import 'dayjs/locale/pt';
import 'dayjs/locale/nl';


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
    textRoot: {
        '& .MuiInputBase-root': {
            width: '100%',
            height: '100%',
        },
    },

};


const setDataStructures = async (field, data, changeData, socket) => {
    console.log(`set new data structure instance ${data["instance"]}` );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {
        data["oid_CurrentProfile"] = `${instance}.CurrentProfile`;
        data["oid_ChoosenRoom"] = `${instance}.vis.ChoosenRoom`;
        data["oid_ProfileType"] = `${instance}.info.ProfileType`;
        // data["oid_ProfileName"] = instance + ".info.ProfileType";

        data["oid_CurrentTimePeriod"] = `${instance}.vis.RoomValues.CurrentTimePeriod`;
        data["oid_ProfileMinTemperature"] = `${instance}.vis.RoomValues.MinimumTemperature`;

        // Mo-Su
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

        // Mo-Fr
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

        // Sa-Su
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

        // Mon
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

        // Tue
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

        // Wed
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

        // Thu
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

        // Fri
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

        // Sat
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

        // Sun
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



        //copy periods
        data["oid_profile_Mon_CopyPeriods"] = instance + ".vis.ProfileTypes.Mon.CopyPeriods";
        data["oid_profile_Tue_CopyPeriods"] = instance + ".vis.ProfileTypes.Tue.CopyPeriods";
        data["oid_profile_Wed_CopyPeriods"] = instance + ".vis.ProfileTypes.Wed.CopyPeriods";
        data["oid_profile_Thu_CopyPeriods"] = instance + ".vis.ProfileTypes.Thu.CopyPeriods";
        data["oid_profile_Fri_CopyPeriods"] = instance + ".vis.ProfileTypes.Fri.CopyPeriods";
        data["oid_profile_Sat_CopyPeriods"] = instance + ".vis.ProfileTypes.Sat.CopyPeriods";

        //value list for selectbox with temperatures
        data["oid_ProfileTempValueListValue"] = instance + ".vis.ProfileTempValueListValue";
        data["oid_ProfileTempValueListText"] = instance + ".vis.ProfileTempValueListText";
        

        /*
        heatingcontrol.0.CurrentProfile
        heatingcontrol.0.Profiles.1.ProfileName

        heatingcontrol.0.vis.ChosenRoom

        heatingcontrol.0.info.ProfileType
        heatingcontrol.0.info.NumberOfPeriods
        heatingcontrol.0.info.NumberOfPeriods


        heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.Temperature
        heatingcontrol.0.vis.ProfileTypes.Mo-Su.Periods.1.time
        */

    }
    changeData(data);
};

class HeatingTimeScheduleWidget extends (Generic) {
    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo() {
        return {
            id: "tplHeatingTimeScheduleWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set
            // visset -> see HeatingGeneralParamsWidget
            // visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            // visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "HeatingTimeScheduleWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-heatingtimeschedule", // Label of widget
            visWidgetColor: "#005cc4",               // Optional widget color. If not set, default color of widget set will be used.
            visResizeLocked: false,                   // require, that width is always equal to height
            visResizable: true,                     // widget is not resizable
            visDraggable: true,                     // widget is not draggable
            visAttrs: [
                {
                    // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
                    name: "common", // group name
                    label: "common", // translated group label
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
                            // hide, wenn TempWithSelectbox==true
                            name: "TempSetWidthLow",    // name in data structure
                            label: "TempSetWidthLow", // translated field label
                            type: "checkbox",
                            default: false,
                            hidden: "data.TempWithSelectbox",
                        },
                        {
                            name: "TempWithSelectbox",    // name in data structure
                            label: "TempWithSelectbox", // translated field label
                            type: "checkbox",
                            default: false,
                        }
                        
                    ],
                },
                {
                    name: "OIDS_general", // group name
                    label: "OIDS_general", // translated group label
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
                        {
                            name: "oid_ProfileMinTemperature",    // name in data structure
                            label: "profilemintemperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomValues.MinimumTemperature",
                        },
                        // hide, wenn TempWithSelectbox!=true
                        {
                            name: "oid_ProfileTempValueListValue",    // name in data structure
                            label: "ProfileTempValueListValue", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTempValueListValue",
                            hidden: "!data.TempWithSelectbox",
                        },
                        {
                            name: "oid_ProfileTempValueListText",    // name in data structure
                            label: "ProfileTempValueListText", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTempValueListText",
                            hidden: "!data.TempWithSelectbox",
                        },
                        

                    ],
                },
                {
                    name: "OIDS_Profile_MoSu", // group name
                    label: "OIDS_Profile_MoSu", // translated group label
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
                    label: "OIDS_Profile_MoFr_SaSu", // translated group label
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
                    label: "OIDS_Profile_EveryDay", // translated group label
                    fields: [
                        // Mon
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
                        // Tue
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

                        // Wed
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

                        // Thu
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

                        // Fri
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

                        // Sat
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

                        // Sun
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
                    ],
                },
                {
                    name: "OIDS_Profile_CopyPeriods", // group name
                    label: "OIDS_Profile_CopyPeriods", // translated
                    fields: [
                        {
                            name: "oid_profile_Mon_CopyPeriods",    // name in data structure
                            label: "oid_profile_Mon_CopyPeriods", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Mon.CopyPeriods",
                        },
                        {
                            name: "oid_profile_Tue_CopyPeriods",    // name in data structure
                            label: "oid_profile_Tue_CopyPeriods", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Tue.CopyPeriods",
                        },
                        {
                            name: "oid_profile_Wed_CopyPeriods",    // name in data structure
                            label: "oid_profile_Wed_CopyPeriods", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Wed.CopyPeriods",
                        },
                        {
                            name: "oid_profile_Thu_CopyPeriods",    // name in data structure
                            label: "oid_profile_Thu_CopyPeriods", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Thu.CopyPeriods",
                        },
                        {
                            name: "oid_profile_Fri_CopyPeriods",    // name in data structure
                            label: "oid_profile_Fri_CopyPeriods", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Fri.CopyPeriods",
                        },
                        {
                            name: "oid_profile_Sat_CopyPeriods",    // name in data structure
                            label: "oid_profile_Sat_CopyPeriods", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ProfileTypes.Sat.CopyPeriods",
                        },
                    ],
                },

                {
                    name: "colors", // group name
                    label: "colors", // translated
                    fields: [
                        {
                            name: "headline_color",    // name in data structure
                            label: "headline_color", // translated field label
                            type: "color",
                            default: "white",
                        },
                    ],
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-heatingtimeschedule.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return HeatingTimeScheduleWidget.getWidgetInfo();
    }

    createData(index, time, temperature, oid_time,  oid_temperature) {
        return { index, time, temperature,oid_time, oid_temperature };
    }

    createValueData(value, text) {
        return { value,text };
    }

    handleOnChangeTemperature(val) {
        console.log(`onChange Temp: ${val.temperature}  ${val.OID} ${JSON.stringify(val)}`);

        //onChange Temp: 6  oid_profile_Sat_1_Temperature { "temperature": "6", "OID": "oid_profile_Sat_1_Temperature" }

        const oid = this.state.rxData[val.OID];

        if (this.props.editMode) {
            return;
        }
        this.props.context.setValue(oid, val.temperature);
    }

    handleOnChangeTime(val) {
        console.log(`onChange Time: ${val.time}  ${val.OID} ${JSON.stringify(val)}`);

        const oid = this.state.rxData[val.OID];

        if (this.props.editMode) {
            return;
        }
        this.props.context.setValue(oid, val.time);
    }

    copyPeriods(noOfPeriods, part) {
        const periods = [];

        for (let p = 1; p <= noOfPeriods; p++) {
            const oid_time = `oid_profile_${part}_${p}_Time`;
            const oid_temperature = `oid_profile_${part}_${p}_Temperature`;

            const time = this.state.values[`${this.state.rxData[oid_time]}.val`];
            const temperature = this.state.values[`${this.state.rxData[oid_temperature]}.val`];

            //console.log("map " + p + " " + time + " " + temperature + " " + oid_time + " " + oid_temperature);

            periods.push(this.createData(p, time, temperature, oid_time, oid_temperature ));
        }

        return periods;
    }

    handleCopyPeriods(oid) {
        console.log("handly copy periods clicked " + oid);

        if (this.props.editMode) {
            return;
        }
        this.props.context.setValue(oid, true);
    }

    CreateCopyButton(copyOID) {

        let ret = null;

        console.log(`CreateCopyButton ${copyOID} `);

        if (copyOID != null) {
         ret =   <Button
                variant="outlined"
                endIcon={<SendIcon />}
                onClick={() => {
                    this.handleCopyPeriods(copyOID);
                }}
            >
                {Generic.t("Copy")} 
            </Button>
        }

        return ret;
    }


    showTimeValue(oid_time, value, name) {
        let ret = null;

        console.log(`showTimeValue ${oid_time} ${value} ${name}  ${this.props.context.themeType}`);

        if (this.state.rxData.TempWithSelectbox != true) {
            ret = <FormControl sx={{ m: 0.5, width: "10ch" }} variant="filled">
                <OutlinedInput
                    size="small"
                    id={name}
                    endAdornment={<InputAdornment position="end"> </InputAdornment>}
                    aria-describedby={name}
                    inputProps={{
                        'aria-label': Generic.t("Time"),
                    }}
                    type="text"
                    value={value}
                    onChange={(e) => this.handleOnChangeTime({
                        time: e.target.value,
                        OID: oid_time
                    })}
                    sx={{ input: { width: "100%" } }}
                />

            </FormControl>
        }
        else {
            ret =


                <FormControl  sx={{ m: 0.5, width: "20ch" }} >

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={this.props.context.lang}
                    >
                        <TimePicker
                            value={dayjs(value, "HH:mm")}
                            ampm={false}
                            minutesStep={1}

                            formatDensity="dense"
                            format="HH:mm"
                            autoFocus="false"
                            onChange={(value) => this.handleOnChangeTime({
                                time: value.format('HH:mm'),
                                OID: oid_time
                            })}
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                      
                                    },
                                    sx: {
                                        "& .MuiInputBase-root": {
                                            width: "100%",
                                            height: "100%",
                                            color: this.props.context.themeType === 'dark' ? '#DDD' : '#222',
                                            
                                        },
                                        "& .MuiIconButton-root": {
                                            color: this.props.context.themeType === 'dark' ? '#DDD' : '#222',
                                        },
                                    }, 
                                },
                                field: {
                                    clearable: "false",
                                    
                                    onClear: () => {
                                        console.debug("clear ");
                                        this.props.context.setValue(oid_time, "00:00");
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                </FormControl>

        }
        console.log(`showTimeValue done`);
        return ret;
    }

    showTemperatureValue(oid_temperature, ProfileMinTemperature, TempSetWidthLow, temperature, name) {

        let ret = null;

        if (this.state.rxData.TempWithSelectbox != true) {
            ret = <FormControl sx={{ m: 0.5, width: "10ch" }} variant="filled">
                <OutlinedInput
                    size="small"
                    id={name}
                    endAdornment={<InputAdornment position="end"> </InputAdornment>}
                    aria-describedby={name}
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type="number"
                    min={ProfileMinTemperature}
                    max={30}

                    step={TempSetWidthLow}

                    value={temperature}

                    onChange={(e) => this.handleOnChangeTemperature({
                        temperature: e.target.value,
                        OID: oid_temperature
                    })}
                    sx={{ input: { width: "100%" } }}
                />
            </FormControl>

        }
        else {

            // werte vorrat aus dem Adapter hole
            let ProfileTempValueListValue = this.state.values[`${this.state.rxData["oid_ProfileTempValueListValue"]}.val`];
            let ProfileTempValueListText = this.state.values[`${this.state.rxData["oid_ProfileTempValueListText"]}.val`];

            //console.log(`showTemperatureValue ${ProfileTempValueListValue}  ${ProfileTempValueListText}`);

            if (ProfileTempValueListValue !== undefined && ProfileTempValueListText !== undefined) {
                let oProfileTempValueListValue = ProfileTempValueListValue.split(";");
                let oProfileTempValueListText = ProfileTempValueListText.split(";");

                let values = [];
                for (let p = 1; p <= oProfileTempValueListValue.length; p++) {
                    values.push(this.createValueData(oProfileTempValueListValue[p], oProfileTempValueListText[p]));
                }

                //console.log(`showTemperatureValue ${JSON.stringify(values)}`);

                ret = <div>

                    <Select
                        value={temperature}
                        onChange={(e) => {
                            this.handleOnChangeTemperature({
                                temperature: e.target.value,
                                OID: oid_temperature
                            });
                        }}
                    >
                        {values.map((value) => (
                            <MenuItem value={value.value}>{value.text}</MenuItem>
                        ))}
                    </Select>
                </div>
            }
        }

        return ret;
    }

    createTimeTableDetails(periods, currentTimePeriod, day, CopyOID, ProfileMinTemperature) {
        //https://mui.com/material-ui/react-table/

        const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? "0.5" : "1.0";

        console.log(`createTimeTableDetails ${currentTimePeriod} ${JSON.stringify(periods)} ${day} ${ProfileMinTemperature} ${TempSetWidthLow}`);

        return <div>
            <Table
            size="small"
            style={{ width: "auto", margin: 5 }}
            sx={{
                "& .MuiTableCell-sizeSmall": {
                    padding: "1px 1px",
                },
            }}
        >
            <TableHead>
                <TableRow>
                    <TableCell align="right" spawn="3">
                        {day}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="right" maxWidth="30px">{Generic.t("Period")}</TableCell>
                    <TableCell align="right" maxWidth="50px">{Generic.t("from")}</TableCell>
                    <TableCell align="right" maxWidth="50px"> {Generic.t("Temperature")}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {periods.map((period) => (
                    <TableRow
                        key={period.index}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        style={{background: period.index === currentTimePeriod ? "red" : ""}}
                    >
                        <TableCell align="center">{period.index}</TableCell>
                        <TableCell align="right">
                            {this.showTimeValue(period.oid_time, period.time, "")}
                        </TableCell>
                        <TableCell align="right">
                            {this.showTemperatureValue(period.oid_temperature, ProfileMinTemperature, TempSetWidthLow, period.temperature,"") }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>

            {this.CreateCopyButton(CopyOID)}

            
        </div>

    }


    createTable_Dummy() {
        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div style={{ color: this.state.rxData["headline_color"] || "white" }}>
                <p>{Generic.t("no data available")}</p>
                <p>{Generic.t("please check OID settings")}</p>
            </div>

           

        </div>;
    }

    //button nur bei every day... und nicht am Sonntag

    createTable_MoSu(noOfPeriods, room, profileName, currentProfile, currentTimePeriod, ProfileMinTemperature) {
        console.log(`createTable_MoSu called ${room}`);

        const periods = this.copyPeriods(noOfPeriods, "MoSu");
        const timetable = this.createTimeTableDetails(periods, currentTimePeriod, Generic.t("Mo. - So."), null, ProfileMinTemperature);

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div style={{ color: this.state.rxData["headline_color"] || "white" }}>
                <p>{Generic.t("Times in week")}</p>
                <p>{Generic.t("Profil ")} {currentProfile} / {room}</p>
            </div>

            <Grid
                container spacing={0.5}
                alignItems="center"
                justifyContent="center"
            >
                {timetable}
            </Grid>

        </div>;
    }

    createTable_MoFr_SaSo(noOfPeriods, room, profileName, currentProfile, currentTimePeriod, ProfileMinTemperature) {
        console.log(`createTable_MoFr_SaSo called ${room} ${noOfPeriods} ${currentTimePeriod}`);

        const periodsMoFr = this.copyPeriods(noOfPeriods, "MoFr");
        const periodsSaSu = this.copyPeriods(noOfPeriods, "SaSu");

        let curTimePeriod = -1;
        let tempTimePeriod = currentTimePeriod;

        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableMoFr = this.createTimeTableDetails(periodsMoFr, curTimePeriod, Generic.t("Mo. - Fr."), null, ProfileMinTemperature);

        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }

        const timetableSaSu = this.createTimeTableDetails(periodsSaSu, curTimePeriod, Generic.t("Sa. - Su."), null, ProfileMinTemperature);

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div style={{ color: this.state.rxData["headline_color"] || "white" }}>
                <p>{Generic.t("Times in week")}</p>
                <p> {Generic.t("Profil ")} {currentProfile} / {room}</p>
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
                {timetableMoFr}
                {timetableSaSu}
            </Grid>
        </div>;
    }

    createTable_EveryDay(noOfPeriods, room, profileName, currentProfile, currentTimePeriod, ProfileMinTemperature) {
        console.log(`createTable_EveryDay called ${room}`);

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

        const CopyPeriods_Mon = this.state.rxData["oid_profile_Mon_CopyPeriods"];
        const timetableMon = this.createTimeTableDetails(periodsMon, curTimePeriod, Generic.t("Mon."), CopyPeriods_Mon, ProfileMinTemperature);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const CopyPeriods_Tue = this.state.rxData["oid_profile_Tue_CopyPeriods"];
        const timetableTue = this.createTimeTableDetails(periodsTue, curTimePeriod, Generic.t("Tue."), CopyPeriods_Tue, ProfileMinTemperature);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const CopyPeriods_Wed = this.state.rxData["oid_profile_Wed_CopyPeriods"];
        const timetableWed = this.createTimeTableDetails(periodsWed, curTimePeriod, Generic.t("Wed."), CopyPeriods_Wed, ProfileMinTemperature);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const CopyPeriods_Thu = this.state.rxData["oid_profile_Thu_CopyPeriods"];
        const timetableThu = this.createTimeTableDetails(periodsThu, curTimePeriod, Generic.t("Thu."), CopyPeriods_Thu, ProfileMinTemperature);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const CopyPeriods_Fri = this.state.rxData["oid_profile_Fri_CopyPeriods"];
        const timetableFri = this.createTimeTableDetails(periodsFri, curTimePeriod, Generic.t("Fri."), CopyPeriods_Fri, ProfileMinTemperature);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const CopyPeriods_Sat = this.state.rxData["oid_profile_Sat_CopyPeriods"];
        const timetableSat = this.createTimeTableDetails(periodsSat, curTimePeriod, Generic.t("Sat."), CopyPeriods_Sat, ProfileMinTemperature);
        tempTimePeriod = tempTimePeriod - 5;
        if (tempTimePeriod <= noOfPeriods) {
            curTimePeriod = tempTimePeriod;
        }
        const timetableSun = this.createTimeTableDetails(periodsSun, curTimePeriod, Generic.t("Sun."), null, ProfileMinTemperature);

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div style={{ color: this.state.rxData["headline_color"] || "white" }}>
                <p>{Generic.t("Times in week")}</p>
                <p> {Generic.t("Profil ")} {currentProfile} / {room}</p>
            </div>

            <Grid
                container
                spacing={0}>

                {timetableMon}

                {timetableTue}

                {timetableWed}

                {timetableThu}

                {timetableFri}

                {timetableSat}

                {timetableSun}

            </Grid>
        </div>;
    }

    createTable() {
        const profileType = this.state.values[`${this.state.rxData["oid_ProfileType"]}.val`];
        const noOfPeriods = this.state.values[`${this.state.rxData["oid_NumberOfPeriods"]}.val`];
        const room = this.state.values[`${this.state.rxData["oid_ChoosenRoom"]}.val`];
        const profileName = "";
        // const profileName = this.state.values[`${this.state.rxData["oid_ProfileName"]}.val`];
        const currentProfile = this.state.values[`${this.state.rxData["oid_CurrentProfile"]}.val`];

        const currentTimePeriod = this.state.values[`${this.state.rxData["oid_CurrentTimePeriod"]}.val`];

        const ProfileMinTemperature = this.state.values[`${this.state.rxData["oid_ProfileMinTemperature"]}.val`];

        console.log(`createTable ${profileType}  ${ProfileMinTemperature}  ${this.state.rxData["oid_ProfileMinTemperature"]}`);

        if (profileType === "Mo - Su") {
            return this.createTable_MoSu(noOfPeriods, room, profileName, currentProfile, currentTimePeriod, ProfileMinTemperature);
        } else if (profileType === "Mo - Fr / Sa - Su") {
            return this.createTable_MoFr_SaSo(noOfPeriods, room, profileName, currentProfile, currentTimePeriod, ProfileMinTemperature);
        } else if (profileType === "every Day") {
            return this.createTable_EveryDay(noOfPeriods, room, profileName, currentProfile, currentTimePeriod, ProfileMinTemperature);
        } else {
            console.log(`unknown profile type ${profileType}`);
            return this.createTable_Dummy();
        }
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        //console.log("HeatingTimeScheduleWidget values ${JSON.stringify(this.state.values)");
        //console.log("HeatingTimeScheduleWidget rxData ${JSON.stringify(this.state.rxData)");

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        //console.log(`heating time schedule: size ${size}`);

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            //console.log("nur content");
            return content;
        }

        //console.log("heating time schedule: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

HeatingTimeScheduleWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default HeatingTimeScheduleWidget;
