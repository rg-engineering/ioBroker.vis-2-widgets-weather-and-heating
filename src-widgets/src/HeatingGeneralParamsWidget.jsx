import React, { useState } from "react";
import PropTypes from "prop-types";

// https://github.com/Pittini/iobroker-heatingcontrol-vis

// For federation it is important to import from one package "@mui/material" and not from "@mui/material/Box"
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Box,
    Switch
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


//todo nur die Werte anzeigen, für die es auch OID's gibt
//todo Übersetzungen
//todo Image

const setDataStructures = async (field, data, changeData, socket) => {
    console.log(`set new datastructure instance${data["instance"]}` );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {
        data["oid_ChoosenRoom"] = `${instance}.vis.ChoosenRoom`;

        data["oid_HeatingPeriodActive"] = `${instance}.HeatingPeriodActive`;
        data["oid_PublicHolidyToday"] = `${instance}.PublicHolidyToday`;
        data["oid_Present"] = `${instance}.Present`;
        data["oid_PartyNow"] = `${instance}.PartyNow`;
        data["oid_GuestsPresent"] = `${instance}.GuestsPresent`;
        data["oid_HolidayPresent"] = `${instance}.HolidayPresent`;
        data["oid_VacationAbsent"] = `${instance}.VacationAbsent`;
        data["oid_FireplaceModeActive"] = `${instance}.FireplaceModeActive`;
    }
    changeData(data);
};

class HeatingGeneralParamsWidget extends (Generic) {
    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo() {
        return {
            id: "tplHeatingGeneralParamsWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-heating",        // Unique ID of widget set

            visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "HeatingGeneralParamsWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-HeatingGeneralParams", // Label of widget
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
                            label: "widgets_heating_label_oid_choosenroom", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ChoosenRoom",
                        },
                        {
                            name: "oid_HeatingPeriodActive",    // name in data structure
                            label: "widgets_heating_label_oid_heatingperiodactive", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.HeatingPeriodActive",
                        },
                        {
                            name: "oid_PublicHolidyToday",    // name in data structure
                            label: "widgets_heating_label_oid_publicholidytoday", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.PublicHolidyToday",
                        },
                        {
                            name: "oid_Present",    // name in data structure
                            label: "widgets_heating_label_oid_present", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.Present",
                        },
                        {
                            name: "oid_PartyNow",    // name in data structure
                            label: "widgets_heating_label_oid_partynow", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.PartyNow",
                        },
                        {
                            name: "oid_GuestsPresent",    // name in data structure
                            label: "widgets_heating_label_oid_guestspresent", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.GuestsPresent",
                        },
                        {
                            name: "oid_HolidayPresent",    // name in data structure
                            label: "widgets_heating_label_oid_holidaypresent", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.HolidayPresent",
                        },
                        {
                            name: "oid_VacationAbsent",    // name in data structure
                            label: "widgets_heating_label_oid_vacationabsent", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.VacationAbsent",
                        },
                        {
                            name: "oid_FireplaceModeActive",    // name in data structure
                            label: "widgets_heating_label_oid_fireplacemodeactive", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.FireplaceModeActive",
                        },


                    ],
                },





            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-HeatingGeneralParams.png",
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
        return HeatingGeneralParamsWidget.getWidgetInfo();
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
        console.log("onStateUpdated " + id );
    }

   
    onChange1() {
        if (this.props.editMode) return;
        const oid = this.state.rxData["oid_HeatingPeriodActive"];
        if (this.getValue(oid) === true) {
            this.props.context.setValue(oid, false);
        } else {
            this.props.context.setValue(oid, true);
        }
    }
    onChange2() {
        if (this.props.editMode) return;
        const oid = this.state.rxData["oid_PublicHolidyToday"];
        if (this.getValue(oid) === true) {
            this.props.context.setValue(oid, false);
        } else {
            this.props.context.setValue(oid, true);
        }
    }
    onChange3() {
        if (this.props.editMode) return;
        const oid = this.state.rxData["oid_Present"];
        if (this.getValue(oid) === true) {
            this.props.context.setValue(oid, false);
        } else {
            this.props.context.setValue(oid, true);
        }
    }
    onChange4() {
        if (this.props.editMode) return;
        const oid = this.state.rxData["oid_PartyNow"];
        if (this.getValue(oid) === true) {
            this.props.context.setValue(oid, false);
        } else {
            this.props.context.setValue(oid, true);
        }
    }
    onChange5() {
        if (this.props.editMode) return;
        const oid = this.state.rxData["oid_GuestsPresent"];
        if (this.getValue(oid) === true) {
            this.props.context.setValue(oid, false);
        } else {
            this.props.context.setValue(oid, true);
        }
    }
    onChange6() {
        if (this.props.editMode) return;
        const oid = this.state.rxData["oid_HolidayPresent"];
        if (this.getValue(oid) === true) {
            this.props.context.setValue(oid, false);
        } else {
            this.props.context.setValue(oid, true);
        }
    }
    onChange7() {
        if (this.props.editMode) return;
        const oid = this.state.rxData["oid_VacationAbsent"];
        if (this.getValue(oid) === true) {
            this.props.context.setValue(oid, false);
        } else {
            this.props.context.setValue(oid, true);
        }
    }
    onChange8() {
        if (this.props.editMode) return;
        const oid = this.state.rxData["oid_FireplaceModeActive"];
        if (this.getValue(oid) === true) {
            this.props.context.setValue(oid, false);
        } else {
            this.props.context.setValue(oid, true);
        }
    }

    getValue(oid) {
        if (oid !== undefined && oid !== '' && oid !== 'nothing_selected') {
            return this.state.values[`${oid}.val`];
        }
        return undefined;
    }


    static convertValue(value, defaultValue) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(value)) {
            return parseFloat(value);
        }
        if (value === undefined || value === null || value === '') {
            return defaultValue;
        }

        return value;
    }
 


    createTable() {

        const HeatingPeriodActiveChecked = this.state.values[`${this.state.rxData["oid_HeatingPeriodActive"]}.val`];
        const PublicHolydayTodayChecked = this.state.values[`${this.state.rxData["oid_PublicHolidyToday"]}.val`];
        const PresentChecked = this.state.values[`${this.state.rxData["oid_Present"]}.val`];
        const PartyNowChecked = this.state.values[`${this.state.rxData["oid_PartyNow"]}.val`];
        const GuestsPresentChecked = this.state.values[`${this.state.rxData["oid_GuestsPresent"]}.val`];
        const HolydayAtHomeChecked = this.state.values[`${this.state.rxData["oid_HolidayPresent"]}.val`];
        const VacationChecked = this.state.values[`${this.state.rxData["oid_VacationAbsent"]}.val`];
        const FireplaceModeChecked = this.state.values[`${this.state.rxData["oid_FireplaceModeActive"]}.val`];

        console.log("createTable ${HeatingPeriodActiveChecked} ${PublicHolydayTodayChecked} ${PresentChecked} ${PartyNowChecked} ${GuestsPresentChecked} ${HolydayAtHomeChecked} ${VacationChecked} ${FireplaceModeChecked}");
        

        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormGroup>
                    <FormControlLabel control={
                        <Switch
                            checked={HeatingPeriodActiveChecked}
                            onClick={() => this.onChange1()}
                        />} label={Generic.t("HeatingPeriodActive")} />
                    <FormControlLabel control={
                        <Switch
                            checked={PublicHolydayTodayChecked}
                            onClick={() => this.onChange2()}
                        />} label={Generic.t("PublicHolydayToday")} />
                    <FormControlLabel control={
                        <Switch
                            checked={PresentChecked}
                            onClick={() => this.onChange3()}
                        />} label={Generic.t("Present")} />
                    <FormControlLabel control={
                        <Switch
                            checked={PartyNowChecked}
                            onClick={() => this.onChange4()}
                        />} label={Generic.t("PartyNow")} />
                    <FormControlLabel control={
                        <Switch
                            checked={GuestsPresentChecked}
                            onClick={() => this.onChange5()}
                        />} label={Generic.t("GuestsPresent")} />
                    <FormControlLabel control={
                        <Switch
                            checked={HolydayAtHomeChecked}
                            onClick={() => this.onChange6()}
                        />} label={Generic.t("HolydayAtHome")} />
                    <FormControlLabel control={
                        <Switch
                            checked={VacationChecked}
                            onClick={() => this.onChange7()}
                        />} label={Generic.t("Vacation")} />
                    <FormControlLabel control={
                        <Switch
                            checked={FireplaceModeChecked}
                            onClick={() => this.onChange8()}
                        />} label={Generic.t("FireplaceMode")} />
                </FormGroup>
            </Box>
        </div>;

        return content;
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        console.log("HeatingGeneralParamsWidget values ${JSON.stringify(this.state.values)}");
        console.log("HeatingGeneralParamsWidget rxData ${JSON.stringify(this.state.rxData)}");

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`heating general params: size ${size}`);

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("heating general params: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

HeatingGeneralParamsWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default HeatingGeneralParamsWidget;

