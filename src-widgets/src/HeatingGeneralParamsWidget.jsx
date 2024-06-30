import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@mui/styles";

//https://github.com/Pittini/iobroker-heatingcontrol-vis



//import { Card, CardContent } from "@mui/material";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from '@mui/material/FormGroup';



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


//todo aktuellen status in chheckbox darstellen
//todo Änderungen der checkbox an adapter übergen
//todo nur die Werte anzeigen, für die es auch OID's gibt

//todo Übersetzungen
//todo Image

const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure instance" + data["instance"] );

    const instance = data["instance"];
    
    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {

        data["oid_ChoosenRoom"] = instance + ".vis.ChoosenRoom";


        data["oid_HeatingPeriodActive"] = instance + ".HeatingPeriodActive";
        data["oid_PublicHolidyToday"] = instance + ".PublicHolidyToday";
        data["oid_Present"] = instance + ".Present";
        data["oid_PartyNow"] = instance + ".PartyNow";
        data["oid_GuestsPresent"] = instance + ".GuestsPresent";
        data["oid_HolidayPresent"] = instance + ".HolidayPresent";
        data["oid_VacationAbsent"] = instance + ".VacationAbsent";
        data["oid_FireplaceModeActive"] = instance + ".FireplaceModeActive";



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
            visSet: "vis-2-widgets-weather",        // Unique ID of widget set

            //visset -> see WeatherWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
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
                            label: "widgets_weather_label_instance", // translated field label
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
                            label: "widgets_heating_label_choosenroom", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ChoosenRoom",
                        },
                        {
                            name: "oid_HeatingPeriodActive",    // name in data structure
                            label: "widgets_heating_label_heatingperiodactive", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.HeatingPeriodActive",
                        },
                        {
                            name: "oid_PublicHolidyToday",    // name in data structure
                            label: "widgets_heating_label_publicholidytoday", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.PublicHolidyToday",
                        },
                        {
                            name: "oid_Present",    // name in data structure
                            label: "widgets_heating_label_present", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.Present",
                        },
                        {
                            name: "oid_PartyNow",    // name in data structure
                            label: "widgets_heating_label_partynow", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.PartyNow",
                        },
                        {
                            name: "oid_GuestsPresent",    // name in data structure
                            label: "widgets_heating_label_guestspresent", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.GuestsPresent",
                        },
                        {
                            name: "oid_HolidayPresent",    // name in data structure
                            label: "widgets_heating_label_holidaypresent", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.HolidayPresent",
                        },
                        {
                            name: "oid_VacationAbsent",    // name in data structure
                            label: "widgets_heating_label_vacationabsent", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.VacationAbsent",
                        },
                        {
                            name: "oid_FireplaceModeActive",    // name in data structure
                            label: "widgets_heating_label_fireplacemodeactive", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.FireplaceModeActive",
                        },


                    ],
                },





            ],
            visPrev: "widgets/vis-2-widgets-weather/img/vis-widget-HeatingGeneralParams.png",
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
        console.log("onStateUpdated");
    }

    handleChange = (event) => {

        console.log("handleChange " );

    };

    CreateTable() {

        const HeatingPeriodActiveChecked = this.state.values[`${this.state.rxData["oid_HeatingPeriodActive"]}.val`];
        const PublicHolydayTodayChecked = this.state.values[`${this.state.rxData["oid_PublicHolidyToday"]}.val`];
        const PresentChecked = this.state.values[`${this.state.rxData["oid_Present"]}.val`];
        const PartyNowChecked = this.state.values[`${this.state.rxData["oid_PartyNow"]}.val`];
        const GuestsPresentChecked = this.state.values[`${this.state.rxData["oid_GuestsPresent"]}.val`];
        const HolydayAtHomeChecked = this.state.values[`${this.state.rxData["oid_HolidayPresent"]}.val`];
        const VacationChecked = this.state.values[`${this.state.rxData["oid_VacationAbsent"]}.val`];
        const FireplaceModeChecked = this.state.values[`${this.state.rxData["oid_FireplaceModeActive"]}.val`];

        console.log("CreateTable " + HeatingPeriodActiveChecked + " " + PublicHolydayTodayChecked + " " + PresentChecked + " " + PartyNowChecked + " " + GuestsPresentChecked + " " + HolydayAtHomeChecked + " " + VacationChecked + " " + FireplaceModeChecked);

        const content = <div
            ref={this.refCardContent}
            className={this.props.classes.cardContent}
        >
            <FormGroup>
                <FormControlLabel control={
                    <Checkbox
                        checked={HeatingPeriodActiveChecked}
                        onChange={this.handleChange}
                    />} label={I18n.t("HeatingPeriodActive")} />
                <FormControlLabel control={
                    <Checkbox
                        checked={PublicHolydayTodayChecked}
                        onChange={this.handleChange}
                    />} label={I18n.t("PublicHolydayToday")} />
                <FormControlLabel control={
                    <Checkbox
                        checked={PresentChecked}
                        onChange={this.handleChange}
                    />} label={I18n.t("Present")} />
                <FormControlLabel control={
                    <Checkbox
                        checked={PartyNowChecked}
                        onChange={this.handleChange}
                    />} label={I18n.t("PartyNow")} />
                <FormControlLabel control={
                    <Checkbox
                        checked={GuestsPresentChecked}
                        onChange={this.handleChange}
                    />} label={I18n.t("GuestsPresent")} />
                <FormControlLabel control={
                    <Checkbox
                        checked={HolydayAtHomeChecked}
                        onChange={this.handleChange}
                    />} label={I18n.t("HolydayAtHome")} />
                <FormControlLabel control={
                    <Checkbox
                        checked={VacationChecked}
                        onChange={this.handleChange}
                    />} label={I18n.t("Vacation")} />
                <FormControlLabel control={
                    <Checkbox
                        checked={FireplaceModeChecked}
                        onChange={this.handleChange}
                    />} label={I18n.t("FireplaceMode")} />
            </FormGroup>
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

        console.log("heating general params: size " + size);


        const content = this.CreateTable();


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

export default withStyles(styles)(withTheme(HeatingGeneralParamsWidget));

