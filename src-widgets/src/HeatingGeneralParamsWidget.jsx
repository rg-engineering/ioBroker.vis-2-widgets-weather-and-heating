import React from "react";
import PropTypes from "prop-types";

// https://github.com/Pittini/iobroker-heatingcontrol-vis
// For federation, it is important to import from one package "@mui/material" and not from "@mui/material/Box"
import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";

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


const setDataStructures = async (field, data, changeData, socket) => {
    console.log(`set new data structure instance${data["instance"]}` );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {
        data["oid_ChosenRoom"] = `${instance}.vis.ChosenRoom`;

        data["oid_HeatingPeriodActive"] = `${instance}.HeatingPeriodActive`;
        data["oid_PublicHolidayToday"] = `${instance}.PublicHolidayToday`;
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
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf000f",                 // Color of widget set. it is enough to set color only in one widget of set
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
                    ],
                },

                {
                    name: "OIDS_general", // group name
                    label: "OIDS_general", // group label
                    fields: [
                        {
                            name: "oid_ChosenRoom",    // name in data structure
                            label: "widgets_heating_label_oid_choosenroom", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ChosenRoom",
                        },
                        {
                            name: "oid_HeatingPeriodActive",    // name in data structure
                            label: "widgets_heating_label_oid_heatingperiodactive", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.HeatingPeriodActive",
                        },
                        {
                            name: "oid_PublicHolidayToday",    // name in data structure
                            label: "widgets_heating_label_oid_publicholidaytoday", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.PublicHolidayToday",
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

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return HeatingGeneralParamsWidget.getWidgetInfo();
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
        const oid = this.state.rxData["oid_PublicHolidayToday"];
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


    getHeatingPeriodActive() {
        let content = null;
        const oid = this.state.rxData["oid_HeatingPeriodActive"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const HeatingPeriodActiveChecked = this.state.values[oid + ".val"];

            content = <FormControlLabel control={
                <Switch
                    checked={HeatingPeriodActiveChecked}
                    onClick={() => this.onChange1()}
                />} label={Generic.t("HeatingPeriodActive")} />

        }
        return content;
    }

    getPublicHolidayToday() {
        let content = null;
        const oid = this.state.rxData["oid_PublicHolidayToday"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const PublicHolidayTodayChecked = this.state.values[oid + ".val"];

            content = <FormControlLabel control={
                <Switch
                    checked={PublicHolidayTodayChecked}
                    onClick={() => this.onChange2()}
                />} label={Generic.t("PublicHolidayToday")} />

        }
        return content;
    }

    getPresent() {
        let content = null;
        const oid = this.state.rxData["oid_Present"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const PresentChecked = this.state.values[oid + ".val"];

            content = <FormControlLabel control={
                <Switch
                    checked={PresentChecked}
                    onClick={() => this.onChange3()}
                />} label={Generic.t("Present")} />

        }
        return content;
    }

    getPartyNow() {
        let content = null;
        const oid = this.state.rxData["oid_PartyNow"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const PartyNowChecked = this.state.values[oid + ".val"];

            content = <FormControlLabel control={
                <Switch
                    checked={PartyNowChecked}
                    onClick={() => this.onChange4()}
                />} label={Generic.t("PartyNow")} />
        }
        return content;
    }

    getGuestsPresent() {
        let content = null;
        const oid = this.state.rxData["oid_GuestsPresent"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const GuestsPresentChecked = this.state.values[oid + ".val"];

            content = <FormControlLabel control={
                <Switch
                    checked={GuestsPresentChecked}
                    onClick={() => this.onChange5()}
                />} label={Generic.t("GuestsPresent")} />
        }
        return content;
    }

    getHolidayPresent() {
        let content = null;
        const oid = this.state.rxData["oid_HolidayPresent"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const HolidayAtHomeChecked = this.state.values[oid + ".val"];

            content = <FormControlLabel control={
                <Switch
                    checked={HolidayAtHomeChecked}
                    onClick={() => this.onChange6()}
                />} label={Generic.t("HolidayAtHome")} />
        }
        return content;
    }

    getVacationAbsent() {
        let content = null;
        const oid = this.state.rxData["oid_VacationAbsent"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const VacationChecked = this.state.values[oid + ".val"];

            content = <FormControlLabel control={
                <Switch
                    checked={VacationChecked}
                    onClick={() => this.onChange7()}
                />} label={Generic.t("Vacation")} />
        }
        return content;
    }

    getFireplaceModeActive() {
        let content = null;
        const oid = this.state.rxData["oid_FireplaceModeActive"];
        console.log("oid " + oid);

        if (oid !== undefined && oid.length > 5) {
            const FireplaceModeChecked = this.state.values[oid + ".val"];

            content = <FormControlLabel control={
                <Switch
                    checked={FireplaceModeChecked}
                    onClick={() => this.onChange8()}
                />} label={Generic.t("FireplaceMode")} />
        }
        return content;
    }

    createTable() {

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormGroup>
                    {this.getHeatingPeriodActive()}
                    {this.getPublicHolidayToday()}
                    {this.getPresent()}
                    {this.getPartyNow() }
                    {this.getGuestsPresent() }
                    {this.getHolidayPresent() }
                    {this.getVacationAbsent()}
                    {this.getFireplaceModeActive() }
                    
                </FormGroup>
            </Box>
        </div>;
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

