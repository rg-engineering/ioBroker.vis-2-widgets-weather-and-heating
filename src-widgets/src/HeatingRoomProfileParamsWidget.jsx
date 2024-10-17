import React from "react";
import PropTypes from "prop-types";

// For federation, it is important to import from one package "@mui/material" and not from "@mui/material/Box"
import {
    Box,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    FormControl,
    //FilledInput,
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

//todo Unterscheidung absolut / relativ -> okay, aber Anzeige fehlt, welcher Modus aktiv
//todo FormControl size and color einstellbar



const setDataStructures = async (field, data, changeData, socket) => {

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
                    name: "OIDS_general", // group name
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
                            name: "colors", // group name
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

    onChange1( val) {
        const oid = this.state.rxData["oid_GuestIncrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange2(val) {
        const oid = this.state.rxData["oid_PartyDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange3(val) {
        const oid = this.state.rxData["oid_AbsentDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange4(val) {
        const oid = this.state.rxData["oid_VacationAbsentDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange5(val) {
        const oid = this.state.rxData["oid_WindowOpenDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange6(val) {
        const oid = this.state.rxData["oid_FireplaceModeDecrease"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange7(val) {
        const oid = this.state.rxData["oid_MinimumTemperature"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }
    onChange8(val) {
        const oid = this.state.rxData["oid_TemperaturOverrideTime"];

        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, val);
    }
    onChange9(val) {
        const oid = this.state.rxData["oid_TemperaturOverride"];
        //convert value to number
        console.log("onChange1 " + oid + "  " + val);
        if (this.props.editMode) return;
        this.props.context.setValue(oid, HeatingRoomProfileParamsWidget.convertValue2Number(val));
    }

    static convertValue2Number(value) {

        try {
            return parseInt(value);
        }
        catch (e) {
            return 0;
        }


    }


    getGuestIncrease() {
        let content = null;
        const oid = this.state.rxData["oid_GuestIncrease"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const GuestIncrease = this.state.values[oid + ".val"];

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

           
        }
        return content;
    }

    getPartyDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_PartyDecrease"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const PartyDecrease = this.state.values[oid + ".val"];

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


        }
        return content;
    }

    getAbsentDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_AbsentDecrease"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const AbsentDecrease = this.state.values[oid + ".val"];

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


        }
        return content;
    }

    getVacationAbsentDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_VacationAbsentDecrease"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const VacationAbsentDecrease = this.state.values[oid + ".val"];

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


        }
        return content;
    }

    getWindowOpenDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_WindowOpenDecrease"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const WindowOpenDecrease = this.state.values[oid + ".val"];

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


        }
        return content;
    }



    getFireplaceModeDecrease() {
        let content = null;
        const oid = this.state.rxData["oid_FireplaceModeDecrease"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const FireplaceModeDecrease = this.state.values[oid + ".val"];

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


        }
        return content;
    }

    getMinimumTemperature() {
        let content = null;
        const oid = this.state.rxData["oid_MinimumTemperature"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const MinimumTemperature = this.state.values[oid + ".val"];

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


        }
        return content;
    }

    getOverrideTemperatureTime() {
        let content = null;
        const oid = this.state.rxData["oid_TemperaturOverrideTime"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const OverrideTemperatureTime = this.state.values[oid + ".val"];

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
                    onChange={(e) => this.onChange9(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="OverrideTemperatureTime-text">{Generic.t("OverrideTemperatureTime")}</FormHelperText>
            </FormControl>


        }
        return content;
    }

    getOverrideTemperature() {
        let content = null;
        const oid = this.state.rxData["oid_TemperaturOverride"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const OverrideTemperature = this.state.values[oid + ".val"];

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
                    onChange={(e) => this.onChange8(e.target.value)}
                    sx={{ input: {  width: "100%" } }}
                />
                <FormHelperText id="OverrideTemperature-text">{Generic.t("OverrideTemperature")}</FormHelperText>
            </FormControl>


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

                {this.getOverrideTemperatureTime() }
               
            </Box>
        </div>;

        return content;
    }

    renderWidgetBody(props) {
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

HeatingRoomProfileParamsWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default HeatingRoomProfileParamsWidget;

