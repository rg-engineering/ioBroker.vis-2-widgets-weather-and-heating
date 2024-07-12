import React from "react";
import PropTypes from "prop-types";

// For federation it is important to import from one package "@mui/material" and not from "@mui/material/Box"
import {
    Box,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    FormControl,
    FilledInput,
    FormHelperText,
    TextField,
    OutlinedInput,
    Visibility,
    VisibilityOff,
} from '@mui/material';

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

//todo aktuellen status in input darstellen
//todo Änderungen der inputs an adapter übergen
//todo nur die Werte anzeigen, für die es auch OID's gibt

//todo Übersetzungen
//todo Image
//todo Unterscheidung absolut / relativ

const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure instance" + data["instance"] );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {

        data["oid_ChoosenRoom"] = instance + ".vis.ChoosenRoom";

        data["oid_GuestIncrease"] = instance + ".vis.TempDecreaseValues.GuestIncrease";
        data["oid_PartyDecrease"] = instance + ".vis.TempDecreaseValues.PartyDecrease";
        data["oid_AbsentDecrease"] = instance + ".vis.TempDecreaseValues.AbsentDecrease";
        data["oid_VacationAbsentDecrease"] = instance + ".vis.TempDecreaseValues.VacationAbsentDecrease";
        data["oid_WindowOpenDecrease"] = instance + ".vis.TempDecreaseValues.WindowOpenDecrease";
        data["oid_FireplaceModeDecrease"] = instance + ".vis.TempDecreaseValues.FireplaceModeDecrease";
        data["oid_TemperaturOverride"] = instance + ".vis.RoomValues.TemperaturOverride";
        data["oid_TemperaturOverrideTime"] = instance + ".vis.RoomValues.TemperaturOverrideTime";
        data["oid_MinimumTemperature"] = instance + ".vis.RoomValues.MinimumTemperature";




    }
    changeData(data);
};


class HeatingRoomProfileParamsWidget extends (Generic) {

    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }


    static getWidgetInfo() {




        return {
            id: "tplHeatingRoomProfileParamsWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather",        // Unique ID of widget set

            //visset -> see WeatherWidget
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
                            name: "oid_ChoosenRoom",    // name in data structure
                            label: "choosenroom", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ChoosenRoom",
                        },

                        {
                            name: "oid_GuestIncrease",    // name in data structure
                            label: "guestincrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.GuestIncrease",
                        },

                        {
                            name: "oid_PartyDecrease",    // name in data structure
                            label: "partydecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.PartyDecrease",
                        },

                        {
                            name: "oid_AbsentDecrease",    // name in data structure
                            label: "absentdecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.AbsentDecrease",
                        },

                        {
                            name: "oid_VacationAbsentDecrease",    // name in data structure
                            label: "vacationabsentdecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.VacationAbsentDecrease",
                        },

                        {
                            name: "oid_WindowOpenDecrease",    // name in data structure
                            label: "windowopendecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.WindowOpenDecrease",
                        },

                        {
                            name: "oid_FireplaceModeDecrease",    // name in data structure
                            label: "fireplacemodedecrease", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.TempDecreaseValues.FireplaceModeDecrease",
                        },

                        {
                            name: "oid_TemperaturOverride",    // name in data structure
                            label: "temperaturoverride", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomValues.TemperaturOverride",
                        },

                        {
                            name: "oid_TemperaturOverrideTime",    // name in data structure
                            label: "temperaturoverridetime", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomValues.TemperaturOverrideTime",
                        },

                        {
                            name: "oid_MinimumTemperature",    // name in data structure
                            label: "minimumtemperature", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomValues.MinimumTemperature",
                        },



                    ],
                },





            ],
            visPrev: "widgets/vis-2-widgets-weather/img/vis-widget-HeatingRoomProfileParams.png",
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
    onStateUpdated(id, state) {
        console.log("onStateUpdated " + id + " " + JSON.stringify(state));
    }

    handleChange = (event) => {
        console.log("handleChange " );
    };


    CreateTable() {


        const OverrideTemperature = this.state.values[`${this.state.rxData["oid_TemperaturOverride"]}.val`];
        const OverrideTemperatureTime = this.state.values[`${this.state.rxData["oid_TemperaturOverrideTime"]}.val`];
        const MinimumTemperature = this.state.values[`${this.state.rxData["oid_MinimumTemperature"]}.val`];
        const FireplaceModeDecrease = this.state.values[`${this.state.rxData["oid_FireplaceModeDecrease"]}.val`];
        const WindowOpenDecrease = this.state.values[`${this.state.rxData["oid_WindowOpenDecrease"]}.val`];
        const VacationAbsentDecrease = this.state.values[`${this.state.rxData["oid_VacationAbsentDecrease"]}.val`];
        const AbsentDecrease = this.state.values[`${this.state.rxData["oid_AbsentDecrease"]}.val`];
        const PartyDecrease = this.state.values[`${this.state.rxData["oid_PartyDecrease"]}.val`];
        const GuestIncrease = this.state.values[`${this.state.rxData["oid_GuestIncrease"]}.val`];

        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="GuestIncrease"
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="GuestIncrease"
                        inputProps={{
                            'aria-label':  Generic.t("Temperature") ,
                        }}
                        type='number'
                        value={GuestIncrease}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="GuestIncrease-text">{Generic.t("GuestIncrease")}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="PartyDecrease"
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="PartyDecrease"
                        inputProps={{
                            'aria-label': Generic.t("Temperature") ,
                        }}
                        type='number'
                        value={PartyDecrease}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="PartyDecrease-text">{Generic.t("PartyDecrease")}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="AbsentDecrease"
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="AbsentDecrease"
                        inputProps={{
                            'aria-label':  Generic.t("Temperature") ,
                        }}
                        type='number'
                        value={AbsentDecrease}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="AbsentDecrease-text">{Generic.t("AbsentDecrease")}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="VacationAbsentDecrease"
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="VacationAbsentDecrease"
                        inputProps={{
                            'aria-label':  Generic.t("Temperature") ,
                        }}
                        type='number'
                        value={VacationAbsentDecrease}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="VacationAbsentDecrease-text">{Generic.t("VacationAbsentDecrease")}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="WindowOpenDecrease"
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="WindowOpenDecrease"
                        inputProps={{
                            'aria-label':  Generic.t("Temperature") ,
                        }}
                        type='number'
                        value={WindowOpenDecrease}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="WindowOpenDecrease-text">{Generic.t("WindowOpenDecrease")}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="FireplaceModeDecrease"
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="FireplaceModeDecrease"
                        inputProps={{
                            'aria-label':  Generic.t("Temperature") ,
                        }}
                        type='number'
                        value={FireplaceModeDecrease}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="FireplaceModeDecrease-text">{Generic.t("FireplaceModeDecrease")}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="MinimumTemperature"
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="MinimumTemperature"
                        inputProps={{
                            'aria-label':  Generic.t("Temperature") ,
                        }}
                        type='number'
                        value={MinimumTemperature}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="MinimumTemperature-text">{Generic.t("MinimumTemperature")}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="OverrideTemperature"
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="OverrideTemperature"
                        inputProps={{
                            'aria-label':  Generic.t("Temperature") ,
                        }}
                        type='number'
                        value={OverrideTemperature}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="OverrideTemperature-text">{Generic.t("OverrideTemperature")}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <FilledInput
                        id="OverrideTemperatureTime"
                        endAdornment={<InputAdornment position="end"> </InputAdornment>}
                        aria-describedby="OverrideTemperatureTime"
                        inputProps={{
                            'aria-label':  Generic.t("Time") ,
                        }}
                        type='text'
                        value={OverrideTemperatureTime}
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="OverrideTemperatureTime-text">{Generic.t("OverrideTemperatureTime")}</FormHelperText>
                </FormControl>


            </Box>

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

HeatingRoomProfileParamsWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default HeatingRoomProfileParamsWidget;

