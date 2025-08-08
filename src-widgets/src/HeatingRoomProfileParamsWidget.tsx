import React, { type CSSProperties } from 'react';
import type {
    RxRenderWidgetProps,
    RxWidgetInfo,
    VisRxWidgetProps,
    VisWidgetCommand,
    WidgetData,
    VisRxWidgetState,
    RxWidgetInfoAttributesField
} from '@iobroker/types-vis-2';
import type { LegacyConnection } from '@iobroker/adapter-react-v5';

// For federation, it is important to import from one package "@mui/material" and not from "@mui/material/Box"
import {
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
    MenuItem,
    Select,
    //InputLabel,
} from '@mui/material';

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

const styles: Record<string, CSSProperties> = {
    cardContent: {
        flex: 1,
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    }
};



const setDataStructures = async (
    field: RxWidgetInfoAttributesField,
    data: WidgetData,
    changeData: (newData: WidgetData) => void,
    socket: LegacyConnection,
): Promise<void> => {

    console.log("set new datastructure instance" + data["instance"] );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {

        data["oid_ChosenRoom"] = `${instance}.vis.ChosenRoom`;

        data["oid_GuestIncrease"] = `${instance}.vis.TempDecreaseValues.GuestIncrease`;
        data["oid_PartyDecrease"] = `${instance}.vis.TempDecreaseValues.PartyDecrease`;
        data["oid_AbsentDecrease"] = `${instance}.vis.TempDecreaseValues.AbsentDecrease`;
        data["oid_VacationAbsentDecrease"] = `${instance}.vis.TempDecreaseValues.VacationAbsentDecrease`;
        data["oid_WindowOpenDecrease"] = `${instance}.vis.TempDecreaseValues.WindowOpenDecrease`;
        data["oid_FireplaceModeDecrease"] = `${instance}.vis.TempDecreaseValues.FireplaceModeDecrease`;
        data["oid_TemperaturOverride"] = `${instance}.vis.RoomValues.TemperaturOverride`;
        data["oid_TemperaturOverrideTime"] = `${instance}.vis.RoomValues.TemperaturOverrideTime`;
        data["oid_MinimumTemperature"] = `${instance}.vis.RoomValues.MinimumTemperature`;

        data["oid_TemperatureDecreaseMode"] = `${instance}.info.TemperatureDecreaseMode`;


        //value list for selectbox with temperatures
        data["oid_TempAddValueListText"] = instance + ".vis.TempAddValueListText";
        data["oid_TempDivValueListText"] = instance + ".vis.TempDivValueListText";
        data["oid_TempValueListValue"] = instance + ".vis.TempValueListValue";

        data["oid_OverrideTempValueListText"] = instance + ".vis.OverrideTempValueListText";
        data["oid_OverrideTempValueListValue"] = instance + ".vis.OverrideTempValueListValue";
       
    }
    changeData(data);
};


interface StaticRxData {
    noCard: boolean;
    widgetTitle: string;
    instance: string;
    TempSetWidthLow: boolean;
    TempWithSelectbox: boolean;
    oid_ChosenRoom: string;
    oid_GuestIncrease: string;
    oid_PartyDecrease: string;
    oid_AbsentDecrease: string;
    oid_VacationAbsentDecrease: string;
    oid_WindowOpenDecrease: string;
    oid_FireplaceModeDecrease: string;
    oid_TemperaturOverride: string;
    oid_TemperaturOverrideTime: string;
    oid_MinimumTemperature: string;
    oid_TemperatureDecreaseMode: string;
    oid_TempAddValueListText: string;
    oid_TempDivValueListText: string;
    oid_TempValueListValue: string;
    oid_OverrideTempValueListText: string;
    oid_OverrideTempValueListValue: string;

}

interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
}

interface tempVal {
    temperature: number,
    OID: string
}

interface timeVal {
    time: string,
    OID: string
}

export default class HeatingRoomProfileParamsWidget extends Generic<StaticRxData, StaticState> {
    private readonly refCardContent: React.RefObject<HTMLDivElement> = React.createRef();
    private lastRxData: string | undefined;
    private updateTimeout: ReturnType<typeof setTimeout> | undefined;

    constructor(props: VisRxWidgetProps) {
        super(props);
        this.state = { ...this.state, objects: [] };
    }


    static getWidgetInfo(): RxWidgetInfo {

        return {
            id: "tplHeatingRoomProfileParamsWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

            //visset -> see HeatingGeneralParamsWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "HeatingRoomProfileParamsWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-HeatingRoomProfileParams", // Label of widget
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
                    label: "OIDS_general", // group label
                    fields: [
                        {
                            name: "oid_ChosenRoom",    // name in data structure
                            label: "oid_choosenroom", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ChosenRoom",
                        },

                        {
                            name: "oid_GuestIncrease",    // name in data structure
                            label: "oid_GuestIncrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.GuestIncrease",
                        },

                        {
                            name: "oid_PartyDecrease",    // name in data structure
                            label: "oid_PartyDecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.PartyDecrease",
                        },

                        {
                            name: "oid_AbsentDecrease",    // name in data structure
                            label: "oid_AbsentDecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.AbsentDecrease",
                        },

                        {
                            name: "oid_VacationAbsentDecrease",    // name in data structure
                            label: "oid_VacationAbsentDecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.VacationAbsentDecrease",
                        },

                        {
                            name: "oid_WindowOpenDecrease",    // name in data structure
                            label: "oid_WindowOpenDecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.WindowOpenDecrease",
                        },

                        {
                            name: "oid_FireplaceModeDecrease",    // name in data structure
                            label: "oid_FireplaceModeDecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.FireplaceModeDecrease",
                        },

                        {
                            name: "oid_TemperaturOverride",    // name in data structure
                            label: "oid_TemperaturOverride", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomValues.TemperaturOverride",
                        },

                        {
                            name: "oid_TemperaturOverrideTime",    // name in data structure
                            label: "oid_TemperaturOverrideTime", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomValues.TemperaturOverrideTime",
                        },

                        {
                            name: "oid_MinimumTemperature",    // name in data structure
                            label: "oid_MinimumTemperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomValues.MinimumTemperature",
                        },

                        {
                            name: "oid_TemperatureDecreaseMode",    // name in data structure
                            label: "oid_TemperatureDecreaseMode", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.info.TemperatureDecreaseMode",
                        },
                        // hide, wenn TempWithSelectbox!=true
                        {
                            name: "oid_TempAddValueListText",    // name in data structure
                            label: "TempAddValueListText", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempAddValueListText",
                            hidden: "!data.TempWithSelectbox",
                        },
                        {
                            name: "oid_TempDivValueListText",    // name in data structure
                            label: "TempDivValueListText", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDivValueListText",
                            hidden: "!data.TempWithSelectbox",
                        },
                        {
                            name: "oid_TempValueListValue",    // name in data structure
                            label: "TempValueListValue", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempValueListValue",
                            hidden: "!data.TempWithSelectbox",
                        },
                        {
                            name: "oid_OverrideTempValueListText",    // name in data structure
                            label: "OverrideTempValueListText", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.OverrideTempValueListText",
                            hidden: "!data.TempWithSelectbox",
                        },
                        {
                            name: "oid_OverrideTempValueListValue",    // name in data structure
                            label: "OverrideTempValueListValue", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.OverrideTempValueListValue",
                            hidden: "!data.TempWithSelectbox",
                        },
                       

                    ],
                },
                {


                    name: "colors", // group name
                    label: "colors", // group label
                    fields: [
                        {
                            name: "valuebackground_color",    // name in data structure
                            label: "valuebackground_color", // translated field label
                            type: "color",
                            default: "background.paper",
                        },
                    ]
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-HeatingRoomProfileParams.png",
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
    getWidgetInfo(): RxWidgetInfo {
        return HeatingRoomProfileParamsWidget.getWidgetInfo();
    }

    // This function is called every time when rxData is changed
    async onRxDataChanged() {

        this.propertiesUpdate();
        console.log("onRxDataChanged");
    }

    // This function is called every time when rxStyle is changed
    // eslint-disable-next-line class-methods-use-this
    onRxStyleChanged() {
        console.log("onRxStyleChanged");
    }

    // This function is called every time when some Object State updated, but all changes lands into this.state.values too
    // eslint-disable-next-line class-methods-use-this, no-unused-vars
    //onStateUpdated(id:string, state) {
    //    console.log("onStateUpdated " + id + " " + JSON.stringify(state));
    //}

    
    onChange1( val:string) {
        const oid = this.state.rxData["oid_GuestIncrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange2(val: string) {
        const oid = this.state.rxData["oid_PartyDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange3(val: string) {
        const oid = this.state.rxData["oid_AbsentDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange4(val: string) {
        const oid = this.state.rxData["oid_VacationAbsentDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange5(val: string) {
        const oid = this.state.rxData["oid_WindowOpenDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange6(val: string) {
        const oid = this.state.rxData["oid_FireplaceModeDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    
    onChange7(val: string) {
        const oid = this.state.rxData["oid_MinimumTemperature"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange8(val: string) {
        const oid = this.state.rxData["oid_TemperaturOverrideTime"];

        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, val);
    }
    onChange9(val: string) {
        const oid = this.state.rxData["oid_TemperaturOverride"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }

    createValueData(value:number, text: string) {
        return { value, text };
    }

    handleOnChangeTemperature(val: tempVal ) {
        console.log(`onChange Temp: ${val.temperature}  ${val.OID} ${JSON.stringify(val)}`);
        //onChange Temp: 6  oid_profile_Sat_1_Temperature { "temperature": "6", "OID": "oid_profile_Sat_1_Temperature" }
        if (this.props.editMode) {
            return;
        }
        this.props.context.setValue(val.OID, val.temperature);
    }
    handleOnChangeTime(val: timeVal) {
        console.log(`onChange Temp: ${val.time}  ${val.OID} ${JSON.stringify(val)}`);
        //onChange Temp: 6  oid_profile_Sat_1_Temperature { "temperature": "6", "OID": "oid_profile_Sat_1_Temperature" }
        if (this.props.editMode) {
            return;
        }
        this.props.context.setValue(val.OID, val.time);
    }

    static convertValue2Number(value:string) {

        try {
            return parseInt(value);
        }
        catch (e) {
            return 0;
        }
    }

    showTimeValue(oid_time:string, value:string, name:string) {
        let ret = null;

        console.log(`showTimeValue ${oid_time} ${value} ${name} ${this.props.context.themeType}`);

        if (this.state.rxData.TempWithSelectbox != true) {
            ret = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
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
                <FormHelperText id="Time-text">{Generic.t(name)}</FormHelperText>
            </FormControl>
        }
        else {
            ret = <FormControl sx={{ m: 0.5, width: "20ch" }} >

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
                        autoFocus={false}
                        onChange={(value) => this.handleOnChangeTime({
                            time: value!=null ? value.format('HH:mm') : "n.a.",
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
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        "border-color": this.props.context.themeType === 'dark' ? '#DDD' : '#222',
                                    },
                                },
                            },
                            field: {
                                clearable: true,
                                onClear: () => {
                                    console.debug("clear ");
                                    this.props.context.setValue(oid_time, "00:00");
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
                <FormHelperText id="Time-text">{Generic.t(name)}</FormHelperText>



            </FormControl>
        }

        console.log(`showTimeValue done`);

        return ret;
    }

    showTemperatureValue(oid_temperature:string, minTemperature:number, TempSetWidthLow:number, value:number, name:string, mode:string) {

        let ret = null;

        console.log(`showTemperatureValue ${oid_temperature}  ${minTemperature} ${TempSetWidthLow} ${value} ${name}`);


        if (this.state.rxData.TempWithSelectbox != true) {

            ret = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput
                    size="small"
                    id={name}
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby={name}
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                        'step': TempSetWidthLow,
                        min: minTemperature,
                        max: 30,
                        type: "number", // <--- auch hierhin verschieben!
                    }}
                    
                    value={value}
                    onChange={(e) => {
                        this.handleOnChangeTemperature({
                            temperature: Number(e.target.value),
                            OID: oid_temperature
                        });
                    }}
                    sx={{ input: { width: "100%" } }}
                />
                <FormHelperText id="Increase-text">{Generic.t(name)}</FormHelperText>
            </FormControl>

            /*
            ret =
                <input
                    type={"number"}
                    placeholder="temperature"
                    className="form-control"
                    onChange={(e) => {
                        this.handleOnChangeTemperature({
                            temperature: e.target.value,
                            OID: oid_temperature
                        });
                    }}
                    min={minTemperature}
                    max={30}

                    step={TempSetWidthLow}

                    value={temperature}
                    style={{ width: 50 }}
                />
                */
        }
        else {

            // werte vorrat aus dem Adapter holen
            /*
                oid_TempAddValueListText
                oid_TempDivValueListText
                oid_TempValueListValue
                oid_OverrideTempValueListText
                oid_OverrideTempValueListValue


            */


            //todo
           //* bei relaativ die Add / Div, bei absolut die Profilewerte
           //* ovrride (temp und Zeit) und min Temperatur handeln

            let TempAddValueListText = this.state.values[`${this.state.rxData["oid_TempAddValueListText"]}.val`];
            let TempDivValueListText = this.state.values[`${this.state.rxData["oid_TempDivValueListText"]}.val`];
            let TempValueListValue = this.state.values[`${this.state.rxData["oid_TempValueListValue"]}.val`];
            let OverrideTempValueListText = this.state.values[`${this.state.rxData["oid_OverrideTempValueListText"]}.val`];
            let OverrideTempValueListValue = this.state.values[`${this.state.rxData["oid_OverrideTempValueListValue"]}.val`];

            //console.log(`showTemperatureValue ${TempAddValueListText}  ${TempValueListValue}`);

            

            if (
                TempAddValueListText !== undefined &&
                TempDivValueListText !== undefined &&
                TempValueListValue !== undefined &&
                OverrideTempValueListText !== undefined &&
                OverrideTempValueListValue !== undefined) {

                let oTempValueListValue = [];
                let oTempValueListText = [];
                if (mode == "absolute") {
                    oTempValueListValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    oTempValueListText = ["0°C", "1°C", "2°C", "3°C", "4°C", "5°C", "6°C", "7°C", "8°C", "9°C", "10°C"];
                }
                else if (mode == "override") {
                    oTempValueListValue = OverrideTempValueListValue.split(";");
                    oTempValueListText = OverrideTempValueListText.split(";");
                }
                else if (mode == "increase") {
                    oTempValueListValue = TempValueListValue.split(";");
                    oTempValueListText = TempAddValueListText.split(";");
                }
                else {
                    oTempValueListValue = TempValueListValue.split(";");
                    oTempValueListText = TempDivValueListText.split(";");
                }

                console.log(`showTemperatureValue ${mode} ${oTempValueListValue}  ${oTempValueListText}`);

                let values = [];
                if (oTempValueListValue !== undefined && oTempValueListText !== undefined) {
                    for (let p = 0; p < oTempValueListValue.length; p++) {
                        values.push(this.createValueData(oTempValueListValue[p], oTempValueListText[p]));
                    }
                }

                console.log(`showTemperatureValue ${JSON.stringify(values)}`);

                ret = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                    
                    <Select
                        value={value}
                        variant="outlined"
                        onChange={(e) => {
                            this.handleOnChangeTemperature({
                                temperature: Number(e.target.value),
                                OID: oid_temperature
                            });
                        }}
                    >
                        {values.map((value) => (
                            <MenuItem value={value.value}>{value.text}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText id="Increase-text">{Generic.t(name)}</FormHelperText>
                </FormControl>
            }
        }


        console.log(`showTemperatureValue done`);
        return ret;
    }

    getGuestIncrease() {
        let content = null;
        const oid = this.state.rxData["oid_GuestIncrease"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const GuestIncrease = this.state.values[`${oid}.val`];
            const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? 0.5 : 1.0;

            content = this.showTemperatureValue(oid, 0, TempSetWidthLow, GuestIncrease, "GuestIncrease", "increase");
            
            /*
            content = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput 
                    size="small"
                    id="GuestIncrease"
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby="GuestIncrease"
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type="number"
                    value={GuestIncrease}
                    onChange={(e) => this.onChange1(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="GuestIncrease-text">{Generic.t("GuestIncrease")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }

    getPartyDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_PartyDecrease"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const PartyDecrease = this.state.values[`${oid}.val`];
            const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? 0.5 : 1.0;

            content = this.showTemperatureValue(oid, 0, TempSetWidthLow, PartyDecrease, "PartyDecrease", "decrease");


            /*
            content = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput 
                    size="small"
                    id="PartyDecrease"
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby="PartyDecrease"
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type="number"
                    value={PartyDecrease}
                    onChange={(e) => this.onChange2(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="PartyDecrease-text">{Generic.t("PartyDecrease")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }

    getAbsentDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_AbsentDecrease"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const AbsentDecrease = this.state.values[`${oid}.val`];
            const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? 0.5 : 1.0;

            content = this.showTemperatureValue(oid, 0, TempSetWidthLow, AbsentDecrease, "AbsentDecrease", "decrease");


            /*

            content = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput 
                    size="small"
                    id="AbsentDecrease"
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby="AbsentDecrease"
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type="number"
                    value={AbsentDecrease}
                    onChange={(e) => this.onChange3(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="AbsentDecrease-text">{Generic.t("AbsentDecrease")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }

    getVacationAbsentDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_VacationAbsentDecrease"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const VacationAbsentDecrease = this.state.values[`${oid}.val`];
            const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? 0.5 : 1.0;

            content = this.showTemperatureValue(oid, 0, TempSetWidthLow, VacationAbsentDecrease, "VacationAbsentDecrease", "decrease");

            /*

            content = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput 
                    size="small"
                    id="VacationAbsentDecrease"
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby="VacationAbsentDecrease"
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type="number"
                    value={VacationAbsentDecrease}
                    onChange={(e) => this.onChange4(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="VacationAbsentDecrease-text">{Generic.t("VacationAbsentDecrease")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }

    getWindowOpenDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_WindowOpenDecrease"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const WindowOpenDecrease = this.state.values[`${oid}.val`];
            const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? 0.5 : 1.0;

            content = this.showTemperatureValue(oid, 0, TempSetWidthLow, WindowOpenDecrease, "WindowOpenDecrease", "decrease");


            /*

            content = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput 
                    size="small"
                    id="WindowOpenDecrease"
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby="WindowOpenDecrease"
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type="number"
                    value={WindowOpenDecrease}
                    onChange={(e) => this.onChange5(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="WindowOpenDecrease-text">{Generic.t("WindowOpenDecrease")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }



    getFireplaceModeDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_FireplaceModeDecrease"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const FireplaceModeDecrease = this.state.values[`${oid}.val`];
            const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? 0.5 : 1.0;

            content = this.showTemperatureValue(oid, 0, TempSetWidthLow, FireplaceModeDecrease, "FireplaceModeDecrease", "decrease");

            /*

            content = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput 
                    size="small"
                    id="FireplaceModeDecrease"
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby="FireplaceModeDecrease"
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type="number"
                    value={FireplaceModeDecrease}
                    onChange={(e) => this.onChange6(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="FireplaceModeDecrease-text">{Generic.t("FireplaceModeDecrease")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }

    getMinimumTemperature() {
        let content = null;
        const oid = this.state.rxData["oid_MinimumTemperature"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const MinimumTemperature = this.state.values[`${oid}.val`];
            const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? 0.5 : 1.0;

            content = this.showTemperatureValue(oid, -10, TempSetWidthLow, MinimumTemperature, "MinimumTemperature", "absolute");
            /*

            content = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput 
                    size="small"
                    id="MinimumTemperature"
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby="MinimumTemperature"
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type='number'
                    value={MinimumTemperature}
                    onChange={(e) => this.onChange7(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="MinimumTemperature-text">{Generic.t("MinimumTemperature")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }

    getOverrideTemperatureTime() {
        let content = null;
        const oid = this.state.rxData["oid_TemperaturOverrideTime"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const OverrideTemperatureTime = this.state.values[`${oid}.val`];
           
            content = this.showTimeValue(oid,  OverrideTemperatureTime, "OverrideTemperatureTime");

            /*
            content = <FormControl sx={{ m: 0.5, width: "15ch" }} variant="filled">
                <OutlinedInput 
                    size="small"
                    id="OverrideTemperatureTime"
                    endAdornment={<InputAdornment position="end"> </InputAdornment>}
                    aria-describedby="OverrideTemperatureTime"
                    inputProps={{
                        'aria-label': Generic.t("Time"),
                    }}
                    type="text"
                    value={OverrideTemperatureTime}
                    onChange={(e) => this.onChange8(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="OverrideTemperatureTime-text">{Generic.t("OverrideTemperatureTime")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }

    getOverrideTemperature() {
        let content = null;
        const oid = this.state.rxData["oid_TemperaturOverride"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const OverrideTemperature = this.state.values[`${oid}.val`];
            const TempSetWidthLow = this.state.rxData.TempSetWidthLow == true ? 0.5 : 1.0;

            content = this.showTemperatureValue(oid, 0, TempSetWidthLow, OverrideTemperature, "OverrideTemperature", "override");
            
            /*

            content = <FormControl sx={{ m: 0.5, width: "15ch" }} >
                <OutlinedInput 
                    size="small"
                    id="OverrideTemperature"
                    endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                    aria-describedby="OverrideTemperature"
                    inputProps={{
                        'aria-label': Generic.t("Temperature"),
                    }}
                    type="number"
                    value={OverrideTemperature}
                    onChange={(e) => this.onChange9(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="OverrideTemperature-text">{Generic.t("OverrideTemperature")}</FormHelperText>
            </FormControl>
            */
        }
        return content;
    }

    getTemperatureDecreaseMode() { 

        let content = null;
        const oid = this.state.rxData["oid_TemperatureDecreaseMode"];
        //console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const TemperatureDecreaseMode = this.state.values[`${oid}.val`];

            content = <div>
                <p style={{ fontSize:'smaller' }} >
                    {Generic.t("Increase / Decrease values are ")} {TemperatureDecreaseMode}
                </p>
            </div>
        }
        return content;
    }


    CreateTable() {

        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>

                {this.getGuestIncrease()}

                {this.getPartyDecrease()}

                {this.getAbsentDecrease()}
                
                {this.getVacationAbsentDecrease()}

                {this.getWindowOpenDecrease() }
               
                {this.getFireplaceModeDecrease() }
                
                {this.getMinimumTemperature() }
                
                {this.getOverrideTemperature()}

                {this.getOverrideTemperatureTime()}

                {this.getTemperatureDecreaseMode()}
               
            </Box>
        </div>;

        return content;
    }

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
        super.renderWidgetBody(props);

        console.log("HeatingRoomProfileParamsWidget values ${JSON.stringify(this.state.values)");
        console.log("HeatingRoomProfileParamsWidget rxData ${JSON.stringify(this.state.rxData)");

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log("heating room profile params: size " + size);


        const content = this.CreateTable();


        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("heating room profile params: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}



