import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@mui/material";

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


//todo tag auswahl setzt OID"s neu -> testen
//todo mondphase anzeigen
//todo bug fix icons (wetter und wind) passen nicht
//todo Übersetzungen


//weather icons

const images1 = require.context("./assets/icons/tiempo-weather/galeria1", false);
const icons_weather_galeria1 = images1.keys().map(image1 => images1(image1));

const images2 = require.context("./assets/icons/tiempo-weather/galeria2", false);
const icons_weather_galeria2 = images2.keys().map(image2 => images2(image2));

const images3 = require.context("./assets/icons/tiempo-weather/galeria3", false);
const icons_weather_galeria3 = images3.keys().map(image3 => images3(image3));

const images4 = require.context("./assets/icons/tiempo-weather/galeria4", false);
const icons_weather_galeria4 = images4.keys().map(image4 => images4(image4));

const images5_color = require.context("./assets/icons/tiempo-weather/galeria5/PNG/Color", false);
const icons_weather_galeria5_color = images5_color.keys().map(image5_color => images5_color(image5_color));

const images5_white = require.context("./assets/icons/tiempo-weather/galeria5/PNG/White", false);
const icons_weather_galeria5_white = images5_white.keys().map(image5_white => images5_white(image5_white));

const images6 = require.context("./assets/icons/tiempo-weather/galeria6", false);
const icons_weather_galeria6 = images6.keys().map(image6 => images6(image6));


//wind icons
const wind_images1 = require.context("./assets/icons/viento-wind/galeria1", false);
const icons_wind_galeria1 = wind_images1.keys().map(wind_image1 => wind_images1(wind_image1));

const wind_images2 = require.context("./assets/icons/viento-wind/galeria2-Beaufort", false);
const icons_wind_galeria2 = wind_images2.keys().map(wind_image2 => wind_images2(wind_image2));


const wind_images3 = require.context("./assets/icons/viento-wind/Beaufort-White", false);
const icons_wind_Beaufort = wind_images3.keys().map(wind_image3 => wind_images3(wind_image3));


//moon icons
//fehlen noch


const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure instance" + data["instance"] + " " + data["datastructure"]);

    const instance = data["instance"];
    const day2show = data["day2show"];
    const datastructure = data["datastructure"];
    //const iconlabelset = data["iconset"];
    //const windiconlabelset = data["windiconset"];

    if (instance && instance.length > 0 && instance.includes("daswetter") && datastructure && day2show) {
        const instance_part = instance;
        const datastructure_part = datastructure;
        let day_part = "Day_1";
        switch (day2show) {
            case "0": day_part = "Day_1"; break;
            case "1": day_part = "Day_2"; break;
            case "2": day_part = "Day_3"; break;
            case "3": day_part = "Day_4"; break;
            case "4": day_part = "Day_5"; break;
            default: day_part = "Day_1"; break;
        }

        data["oid_dayname"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.day_name`;
        data["oid_date"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.day_value`;
        data["oid_temp_max"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.tempmax_value`;
        data["oid_temp_min"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.tempmin_value`;
        data["oid_symbol_description"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.symbol_desc`;
        data["oid_symbol"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.symbol_value`;
        data["oid_wind_symbol"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.wind_symbol`;
        data["oid_wind_value"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.wind_value`;
        data["oid_windgusts_value"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.windgusts_value`;
        data["oid_sunshine_duration"] = `${instance_part}.${datastructure_part}.Location_1.${day_part}.sunshineDuration`;
    }

    changeData(data);
};


class WeatherDayWidget extends (Generic) {
    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo() {
        return {
            id: "tplWeatherDayWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather",        // Unique ID of widget set

            //visset -> see WeatherWidget
            //visSetLabel: "vis-2-widgets-weather",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "WeatherDayWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-weatherday", // Label of widget
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
                            adapters: ["daswetter", "weatherunderground"],
                            default: "daswetter.0",
                            onChange: setDataStructures,
                        },
                        {
                            name: "datastructure",    // name in data structure
                            label: "datastructure", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "NextDaysDetailed",
                                    label: "datastructure_nextdaysdetailed"
                                },
                                {
                                    value: "NextHours",
                                    label: "datastructure_nexthours"
                                },
                                {
                                    value: "NextHours2",
                                    label: "datastructure_nexthours2"
                                }
                            ],
                            default: "NextHours",
                            onChange: setDataStructures,

                        },
                        {
                            name: "day2show",    // name in data structure
                            label: "day2show", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "0",
                                    label: "day2show_today"
                                },
                                {
                                    value: "1",
                                    label: "day2show_today+1"
                                },
                                {
                                    value: "2",
                                    label: "day2show_today+2"
                                },
                                {
                                    value: "3",
                                    label: "day2show_today+3"
                                },
                                {
                                    value: "4",
                                    label: "day2show_today+4"
                                },

                            ],
                            default: "0",
                            onChange: setDataStructures,

                        },

                        {
                            name: "iconset",    // name in data structure
                            label: "iconset", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "galeria1",
                                    label: "iconset_galeria1"
                                },
                                {
                                    value: "galeria2",
                                    label: "iconset_galeria2"
                                },
                                {
                                    value: "galeria3",
                                    label: "iconset_galeria3"
                                },
                                {
                                    value: "galeria4",
                                    label: "iconset_galeria4"
                                },
                                {
                                    value: "galeria5_white",
                                    label: "iconset_galeria5_white"
                                },
                                {
                                    value: "galeria5_color",
                                    label: "iconset_galeria5_color"
                                },
                                {
                                    value: "galeria6",
                                    label: "iconset_galeria6"
                                },

                            ],
                            default: "galeria1",
                            onChange: setDataStructures,

                        },

                        {
                            name: "windiconset",    // name in data structure
                            label: "windiconset", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "galeria1",
                                    label: "windiconset_galeria1"
                                },
                                {
                                    value: "galeria2",
                                    label: "windiconset_galeria2"
                                },
                                {
                                    value: "Beaufort",
                                    label: "windiconset_beaufort"
                                },


                            ],
                            default: "galeria1",
                            onChange: setDataStructures,

                        },

                    ],
                },
                {



                    name: "OIDS", // group name
                    fields: [

                        {
                            name: "oid_dayname",    // name in data structure
                            label: "oiddayname", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.day_name",
                        },
                        {
                            name: "oid_date",    // name in data structure
                            label: "oiddate", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.day_value",
                        },
                        {
                            name: "oid_temp_max",    // name in data structure
                            label: "oidtempmax", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.tempmax_value",
                        },
                        {
                            name: "oid_temp_min",    // name in data structure
                            label: "oidtempmin", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.tempmin_value",
                        },
                        {
                            name: "oid_symbol_description",    // name in data structure
                            label: "oidsymboldescription", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.symbol_desc",
                        },
                        {
                            name: "oid_symbol",    // name in data structure
                            label: "oidsymbol", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.symbol_value",
                        },
                        {
                            name: "oid_wind_symbol",    // name in data structure
                            label: "oidwindsymbol", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.wind_symbol",
                        },
                        {
                            name: "oid_wind_value",    // name in data structure
                            label: "oidwindvalue", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.wind_value",
                        },
                        {
                            name: "oid_windgusts_value",    // name in data structure
                            label: "oidwindgustsvalue", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.windgusts_value",
                        },
                        {
                            name: "oid_sunshine_duration",    // name in data structure
                            label: "oidsunshineduration", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Day_1.sunshineDuration",
                        },

                    ],
                },


            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-weatherday.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return WeatherDayWidget.getWidgetInfo();
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`wdw chart: size ${size}`);

        const iconlabelset = this.state.rxData["iconset"];
        const windiconlabelset = this.state.rxData["windiconset"];

        //weather symbol
        const weather_icon = this.state.values[`${this.state.rxData["oid_symbol"]}.val`];
        

        let src_icon_weather = icons_weather_galeria1[weather_icon];

        switch (iconlabelset) {
            case "galeria1": src_icon_weather = icons_weather_galeria1[weather_icon]; break;
            case "galeria2": src_icon_weather = icons_weather_galeria2[weather_icon]; break;
            case "galeria3": src_icon_weather = icons_weather_galeria3[weather_icon]; break;
            case "galeria4": src_icon_weather = icons_weather_galeria4[weather_icon]; break;
            case "galeria5_white": src_icon_weather = icons_weather_galeria5_white[weather_icon]; break;
            case "galeria5_color": src_icon_weather = icons_weather_galeria5_color[weather_icon]; break;
            case "galeria6": src_icon_weather = icons_weather_galeria6[weather_icon]; break;
            default: src_icon_weather = icons_weather_galeria1[weather_icon]; break;
        }

        console.log("weather icon " + weather_icon + " " + src_icon_weather);


        //wind symbol
        const wind_icon = this.state.values[`${this.state.rxData["oid_wind_symbol"]}.val`];
        
        //todo galerie umschaltbar
        let src_icon_wind = icons_wind_galeria1[wind_icon];
        switch (windiconlabelset) {
            case "galeria1": src_icon_wind = icons_wind_galeria1[wind_icon]; break;
            case "galeria2": src_icon_wind = icons_wind_galeria2[wind_icon]; break;
            case "Beaufort": src_icon_wind = icons_wind_Beaufort[wind_icon]; break;
            default: src_icon_wind = icons_wind_galeria1[wind_icon]; break;
        }

        console.log("wind icon " + wind_icon + " " + src_icon_wind ) ;

        const date = this.state.values[`${this.state.rxData["oid_date"]}.val`];
        let day = 1;
        let month = 1;
        let year = 2024;

        if (date && date.length > 0) {
            day = date.substring(6);
            month = date.substring(4, 6);
            month = month - 1;
            year = date.substring(0, 4);
        }

        console.log(`date ${date} ${day}.${month}.${year}`);
        const oDate = new Date(year, month, day);
        console.log(`date ${oDate.toLocaleDateString()}`);

        const sundurationval = (this.state.values[`${this.state.rxData["oid_sunshine_duration"]}.val`]);
        console.log(`sunduration ${sundurationval}`);

        let sunduration = 0;
        if (sundurationval) {
            sunduration = Number(sundurationval).toFixed(2);
            console.log(`sunduration ${sunduration} ${typeof sunduration}`);
        }

        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <Grid
                container
                spacing={0.5}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <div>
                        <p>{this.state.values[`${this.state.rxData["oid_dayname"]}.val`]}</p>
                        <p>{oDate.toLocaleDateString()}</p>
                    </div>
                </Grid>
                <Grid item xs={6} >
                    <div>
                        <img src={src_icon_weather} alt="icon"></img>
                        <p>{weather_icon}</p>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ fontSize: "small" }}>
                        <p>{Generic.t("max")} {this.state.values[`${this.state.rxData["oid_temp_max"]}.val`]} °C</p>
                        <p>{Generic.t("min")} {this.state.values[`${this.state.rxData["oid_temp_min"]}.val`]} °C</p>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div>
                        <p>{this.state.values[`${this.state.rxData["oid_symbol_description"]}.val`]}</p>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div>
                        <img src={src_icon_wind} alt="icon"></img>
                        <p>{wind_icon}</p>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ fontSize: "small" }}>
                        <p>{Generic.t("Wind")} {this.state.values[`${this.state.rxData["oid_wind_value"]}.val`]} km/h</p>
                        <p>{Generic.t("WindGusts")} {this.state.values[`${this.state.rxData["oid_windgusts_value"]}.val`]} km/h</p>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <p>{Generic.t("sun")} {sunduration} h</p>
                    </div>
                </Grid>
            </Grid>
        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("wdw: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

WeatherDayWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default WeatherDayWidget;

