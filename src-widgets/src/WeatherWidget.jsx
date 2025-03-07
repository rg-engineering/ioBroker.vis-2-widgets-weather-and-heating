import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

import EchartContainer from "./EchartContainer";

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


// todo Format-String für Zeitanzeige X Achse -> Übersetzen
// todo rerender verzögern, wenn Daten aktualisiert werden
// todo Farbe für Background einstellbar
// todo MinMax Temperatur auf ganze 5er runden

// todo überflüssige OID"s löschen
// todo WU weitere zwei Datenstrukturen supporten

const setDataStructures = async (field, data, changeData, socket) => {
    console.log(`set new datastructure instance ${data["instance"]} ${data["datastructure"]}` );

    let max_days = 5;
    let max_periods = 8;
    let cnt = 1;

    // if DasWettter
    if (data["instance"].includes("daswetter")) {
        if (data["datastructure"] === "NextDaysDetailed" || data["datastructure"] === "NextHours" || data["datastructure"] === "NextHours2") {

        } else {
            data["datastructure"] = "NextHours";
        }

        if (data["datastructure"] === "NextDaysDetailed") {
            max_periods = 8;
            max_days = 5;
            for (let d = 1; d <= max_days; d++) {
                data[`oid_general_day_${d}`] = `daswetter.0.NextDaysDetailed.Location_1.Day_${d}.day_value`;

                for (let p = 1; p <= max_periods; p++) {
                    data[`oid_rain_${cnt}`] = `daswetter.0.NextDaysDetailed.Location_1.Day_${d}.Hour_${p}.rain_value`;
                    data[`oid_temp_${cnt}`] = `daswetter.0.NextDaysDetailed.Location_1.Day_${d}.Hour_${p}.temp_value`;
                    data[`oid_cloud_${cnt}`] = `daswetter.0.NextDaysDetailed.Location_1.Day_${d}.Hour_${p}.clouds_value`;
                    data[`oid_time_${cnt}`] = `daswetter.0.NextDaysDetailed.Location_1.Day_${d}.Hour_${p}.hour_value`;
                    cnt++;
                }
            }
        } else if (data["datastructure"] === "NextHours") {
            max_periods = 23;
            max_days = 5;
            for (let d = 1; d <= max_days; d++) {
                data[`oid_general_day_${d}`] = `daswetter.0.NextHours.Location_1.Day_${d}.day_value`;

                if (d > 3) {
                    max_periods = 8;
                }

                for (let p = 1; p <= max_periods; p++) {
                    data[`oid_rain_${cnt}`] = `daswetter.0.NextHours.Location_1.Day_${d}.Hour_${p}.rain_value`;
                    data[`oid_temp_${cnt}`] = `daswetter.0.NextHours.Location_1.Day_${d}.Hour_${p}.temp_value`;
                    data[`oid_cloud_${cnt}`] = `daswetter.0.NextHours.Location_1.Day_${d}.Hour_${p}.clouds_value`;
                    data[`oid_time_${cnt}`] = `daswetter.0.NextHours.Location_1.Day_${d}.Hour_${p}.hour_value`;
                    cnt++;
                }
            }
        } else if (data["datastructure"] === "NextHours2") {
            max_periods = 8;
            max_days = 5;
            for (let d = 1; d <= max_days; d++) {
                data[`oid_general_day_${d}`] = `daswetter.0.NextHours2.Location_1.Day_${d}.date`;

                for (let p = 1; p <= max_periods; p++) {
                    data[`oid_rain_${cnt}`] = `daswetter.0.NextHours2.Location_1.Day_${d}.Hour_${p}.rain`;
                    data[`oid_temp_${cnt}`] = `daswetter.0.NextHours2.Location_1.Day_${d}.Hour_${p}.temp`;
                    data[`oid_cloud_${cnt}`] = `daswetter.0.NextHours2.Location_1.Day_${d}.Hour_${p}.clouds`;
                    data[`oid_time_${cnt}`] = `daswetter.0.NextHours2.Location_1.Day_${d}.Hour_${p}.hour`;
                    cnt++;
                }
            }
        } else {
            console.log(`datastructures: unknown data structure${data["datastructure"]}`);
        }
    } else if (data["instance"].includes("weatherunderground")) {
        if (data["datastructure"] === "forecast" || data["datastructure"] === "forecastHourly" || data["datastructure"] === "forecastPeriod") {

        } else {
            data["datastructure"] = "forecastHourly";
        }

        if (data["datastructure"] === "forecast") {
            for (let d = 0; d < 6; d++) {
                // todo
                console.log("data[datastructure] = forecast not yet implemented");
            }
        } else if (data["datastructure"] === "forecastHourly") {
            for (let h = 0; h < 36; h++) {
                // weatherunderground.0.forecastHourly.1h.precipitationChance
                data[`oid_rain_${cnt}`] = `weatherunderground.0.forecastHourly.${h}h.precipitation`;
                // weatherunderground.0.forecastHourly.1h.temp
                data[`oid_temp_${cnt}`] = `weatherunderground.0.forecastHourly.${h}h.temp`;
                // weatherunderground.0.forecastHourly.1h.sky
                data[`oid_cloud_${cnt}`] = `weatherunderground.0.forecastHourly.${h}h.sky`;
                // weatherunderground.0.forecastHourly.1h.time
                data["oid_time_" + cnt] = `weatherunderground.0.forecastHourly.${h}h.time`;
                // weatherunderground.0.forecastHourly.1h.precipitationChance
                data[`oid_chancerain_${cnt}`] = `weatherunderground.0.forecastHourly.${h}h.precipitationChance`;
                cnt++;
            }
        } else if (data["datastructure"] === "forecastPeriod") {
            for (let p = 0; p < 12; p++) {
                // todo
                console.log("data[datastructure] = forecastPeriod not yet implemented");
            }
        } else {
            console.log(`datastructures: unknown data structure ${data["datastructure"]}`);
        }
    } else {
        //do nothing
    }

    // todo überflüssige OID"s löschen

    console.log(`!!! OID to delete, used ${cnt} length (todo) !!!` );

    changeData(data);
};

class WeatherWidget extends (Generic) {
    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo() {
        const oid_rain_fields = [];
        const oid_temp_fields = [];
        const oid_cloud_fields = [];
        const oid_time_fields = [];
        const oid_general_fields = [];
        const oid_chanceofrain_fields = [];

        const datastructure_options = [];

        let cnt = 1;

        const max_days = 5;
        let max_periods = 23;

        if (data => data.instance.includes("weatherunderground")) {
            //labels nur für jeweilige Instanz sichtbar machen
            datastructure_options.push({
                value: "forecast",
                label: "datastructure_forecast"
            });
            datastructure_options.push({
                value: "forecastHourly",
                label: "datastructure_forecastHourly"
            });
            datastructure_options.push({
                value: "forecastPeriod",
                label: "datastructure_forecastPeriod"
            });
        } else {
            //daswetter
            datastructure_options.push({
                value: "NextDaysDetailed",
                label: "datastructure_nextdaysdetailed"
            });
            datastructure_options.push({
                value: "NextHours",
                label: "datastructure_nexthours"
            });
            datastructure_options.push({
                value: "NextHours2",
                label: "datastructure_nexthours2"
            });
        }

        for (let d = 1; d <= max_days; d++) {
            oid_general_fields.push({
                name: `oid_general_day_${d}`,    // name in data structure
                label: Generic.t("oid_general_day_") + d, // translated field label
                type: "id",
                default: `daswetter.0.NextHours.Location_1.Day_${d}.day_value`,
            });

            if (d > 3) {
                max_periods = 8;
            }

            for (let p = 1; p <= max_periods; p++) {
                oid_rain_fields.push({
                    name: `oid_rain_${cnt}`,    // name in data structure
                    label: Generic.t("oid_rain_") + cnt, // translated field label
                    type: "id",
                    default: `daswetter.0.NextHours.Location_1.Day_${d}.Hour_${p}.rain_value`,
                });
                oid_temp_fields.push({
                    name: `oid_temp_${cnt}`,    // name in data structure
                    label: Generic.t("oid_temp_") + cnt, // translated field label
                    type: "id",
                    default: `daswetter.0.NextHours.Location_1.Day_${d}.Hour_${p}.temp_value`,
                });
                oid_cloud_fields.push({
                    name: `oid_cloud_${cnt}`,    // name in data structure
                    label: Generic.t("oid_cloud_") + cnt, // translated field label
                    type: "id",
                    default: `daswetter.0.NextHours.Location_1.Day_${d}.Hour_${p}.clouds_value`,
                });
                oid_time_fields.push({
                    name: `oid_time_${cnt}`,    // name in data structure
                    label: Generic.t("oid_time_") + cnt, // translated field label
                    type: "id",
                    default: `daswetter.0.NextHours.Location_1.Day_${d}.Hour_${p}.hour_value`,
                });
                cnt++;
            }
        }

        return {
            id: "tplWeatherWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set
            visSetLabel: "vis-2-widgets-weather-and-heating",   // Widget set translated label (should be defined only in one widget of set)
            visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "weather",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-weather", // Label of widget
            visWidgetColor: "#005cc4",               // Optional widget color. If not set, default color of widget set will be used.
            visResizeLocked: false,                   // require, that width is always equal to height
            visResizable: true,                     // widget is resizable
            visDraggable: true,                     // widget is draggable
            visAttrs: [
                {
                    // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
                    name: "common", // group name
                    label: "common", //not required
                    fields: [
                        {
                            name: "noCard",
                            label: "without_card",
                            type: "checkbox",
                        },
                        {
                            name: "widgetTitle",
                            label: "name",
                            hidden: "!!data.noCard",
                        },
                        {
                            name: "instance",    // name in data structure
                            label: "instance", // translated field label
                            type: "instance",
                            default: "daswetter.0",
                            onChange: setDataStructures,
                        },
                        {
                            name: "oid_location",    // name in data structure
                            label: "oidlocation", // translated field label
                            type: "id",
                            default: "daswetter.0.NextHours.Location_1.Location",
                            //only available with DasWetter
                            hidden: data => data.instance.includes("weatherunderground")
                        },
                        {
                            name: "datastructure",    // name in data structure
                            label: "datastructure", // translated field label
                            type: "select",
                            options: datastructure_options,
                            //default: weatherunderground ? "forecastHourly" : "NextHours",
                            onChange: setDataStructures,
                        },
                        {
                            name: "headline_color",    // name in data structure
                            label: "headline_color", // translated field label
                            type: "color",
                            default: "white",
                        },
                        {
                            name: "legend_text_color",    // name in data structure
                            label: "legend_text_color", // translated field label
                            type: "color",
                            default: "black",
                        },

                    ],
                },
                {
                    name: "X_axis", // group name
                    label: "x_axis",
                    fields: [
                        {
                            name: "xaxis_axisLabel_formatstring",    // name in data structure
                            label: "xaxis_axisLabel_formatstring", // translated field label
                            type: "text",
                            default: "ddd HH:mm",
                        },
                        {
                            name: "xaxis_color",    // name in data structure
                            label: "xaxis_color", // translated field label
                            type: "color",
                            default: "white",
                        },
                    ]
                },
                {
                    name: "rain", // group name
                    label: "rain",
                    fields: [
                        {
                            name: "rain_visible",    // name in data structure
                            label: "rain_visible", // translated field label
                            type: "checkbox",
                            default: false,
                        },
                        {
                            name: "rain_color",    // name in data structure
                            label: "rain_color", // translated field label
                            type: "color",
                            default: "blue",
                        },
                        {
                            name: "rain_axislablecolor",    // name in data structure
                            label: "rain_axislablecolor", // translated field label
                            type: "color",
                            default: "blue",
                        },
                        {
                            name: "rain_positionYAxis",    // name in data structure
                            label: "rain_positionYAxis", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "left",
                                    label: "left"
                                },
                                {
                                    value: "right",
                                    label: "right"
                                },
                            ],
                            default: "right",
                        },
                        {
                            name: "rain_show_separate",    // name in data structure
                            label: "rain_show_separate", // translated field label
                            type: "checkbox",
                            default: false,
                        },
                    ]
                },
                {
                    name: "temperature", // group name
                    label: "temperature",
                    fields: [
                        {
                            name: "temperature_visible",    // name in data structure
                            label: "temperature_visible", // translated field label
                            type: "checkbox",
                            default: true,
                        },
                        {
                            name: "temperature_color",    // name in data structure
                            label: "temperature_color", // translated field label
                            type: "color",
                            default: "red",
                        },
                        {
                            name: "temperature_axislablecolor",    // name in data structure
                            label: "temperature_axislablecolor", // translated field label
                            type: "color",
                            default: "red",
                        },
                        {
                            name: "temperature_positionYAxis",    // name in data structure
                            label: "temperature_positionYAxis", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "left",
                                    label: "left"
                                },
                                {
                                    value: "right",
                                    label: "right"
                                },
                            ],
                            default: "left",
                        },
                    ]
                },
                {
                    name: "clouds", // group name
                    label: "clouds",
                    fields: [
                        {
                            name: "clouds_visible",    // name in data structure
                            label: "clouds_visible", // translated field label
                            type: "checkbox",
                            default: false,
                        },
                        {
                            name: "clouds_color",    // name in data structure
                            label: "clouds_color", // translated field label
                            type: "color",
                            default: "yellow",
                        },
                        {
                            name: "clouds_axislablecolor",    // name in data structure
                            label: "clouds_axislablecolor", // translated field label
                            type: "color",
                            default: "yellow",
                        },
                        {
                            name: "clouds_positionYAxis",    // name in data structure
                            label: "clouds_positionYAxis", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "left",
                                    label: "left"
                                },
                                {
                                    value: "right",
                                    label: "right"
                                },
                            ],
                            default: "right",
                        },
                        {
                            name: "clouds_show_separate",    // name in data structure
                            label: "clouds_show_separate", // translated field label
                            type: "checkbox",
                            default: true,
                        },
                        {
                            name: "sun_or_cloud",    // name in data structure
                            label: "sunorcloud", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "sun",
                                    label: "sunorcloud_sun"
                                },
                                {
                                    value: "cloud",
                                    label: "sunorcloud_cloud"
                                },
                            ],
                            default: "sun",
                        },
                    ]
                },
                {
                    //ausbelnden bei instance == wetter
                    name: "chanceofraining", // group name
                    label: "chanceofrain",
                    hidden: data => data.instance.includes("daswetter"),
                    fields: [
                        {
                            name: "chanceofraining_visible",    // name in data structure
                            label: "chanceofraining_visible", // translated field label
                            type: "checkbox",
                            default: false,

                            //enable for WU only
                            hidden: data => data.instance.includes("daswetter"),
                        },
                        {
                            name: "chanceofraining_color",    // name in data structure
                            label: "chanceofraining_color", // translated field label
                            type: "color",
                            default: "blue",

                            //enable for WU only
                            hidden: data => data.instance.includes("daswetter"),
                        },
                        {
                            name: "chanceofraining_show_separate",    // name in data structure
                            label: "chanceofraining_show_separate", // translated field label
                            type: "checkbox",
                            default: false,

                            //enable for WU only
                            hidden: data => data.instance.includes("daswetter"),
                        },
                    ]
                },
                {
                    name: "OIDS_general", // group name
                    label: "oids_general",
                    fields: oid_general_fields,
                    hidden: data => data.instance.includes("daswetter")
                },
                {
                    name: "OIDS_rain", // group name
                    label: "oids_rain",
                    fields: oid_rain_fields
                },
                {
                    name: "OIDS_temp", // group name
                    label: "oids_temp",
                    fields: oid_temp_fields
                },
                {
                    name: "OIDS_cloud", // group name
                    label: "oids_cloud",
                    fields: oid_cloud_fields
                },
                {
                    name: "OIDS_time", // group name
                    label: "oids_time",
                    fields: oid_time_fields
                },
                {
                    name: "OIDS_chanceofrain", // group name
                    label: "oids_chanceofrain",
                    fields: oid_chanceofrain_fields,
                    hidden: data => data.instance.includes("daswetter")
                },
            ],
            visDefaultStyle: {
                width: 320,
                height: 182,
                position: "relative",
            },
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-weather.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return WeatherWidget.getWidgetInfo();
    }

    /**
     *
     * @returns {echarts.EChartsOption}
     */
    getOption1() {
        console.log("getOption1 ");

        let weatherData;
        if (this.state.rxData["instance"].includes("daswetter")) {
            weatherData = this.getWeatherDataDasWetter();
        } else if (this.state.rxData["instance"].includes("weatherunderground")) {
            weatherData = this.getWeatherDataWU();
        }

        console.log(`##got ${JSON.stringify(weatherData[0])}`);

        let useSecondDiagram = false;

        if ((this.state.rxData["rain_visible"] && this.state.rxData["rain_show_separate"])
            || (this.state.rxData["clouds_visible"] && this.state.rxData["clouds_show_separate"])
        ) {
            useSecondDiagram = true;
        }

        console.log(`show second diagram ${useSecondDiagram}`);

        const location = this.state.values[`${this.state.rxData["oid_location"]}.val`];
        const axisLabel_formatstring =  this.state.rxData["xaxis_axisLabel_formatstring"] ;
        console.log(`##got ${location}`);
        //let headline = Generic.t("Weather at ") + location;
        let headline = "";
        if (location != null && typeof location == "string" && location.length>0) {
            headline = location;
        }

        // min / max
        const MinMax = weatherData[0][3];
        console.log(`min max ${JSON.stringify(MinMax)}`);

        const RainMin = MinMax["RainMin"];
        const RainMax = MinMax["RainMax"];
        const TempMin = MinMax["TempMin"];
        const TempMax = MinMax["TempMax"];
        const CloudMin = MinMax["CloudMin"];
        const CloudMax = MinMax["CloudMax"];

        const legend = [];
        const yaxis = [];
        const series = [];

        let cnt = 0;

        if (this.state.rxData["rain_visible"] === true && this.state.rxData["rain_show_separate"] === false && weatherData[0][0].length > 1) {
            legend.push(Generic.t("rain"));

            yaxis.push({
                position: this.state.rxData["rain_positionYAxis"] || "right",
                type: "value",
                // min max berechnen
                min: RainMin,
                max: RainMax,
                axisLabel: {
                    color: this.state.rxData["rain_axislablecolor"] || "blue",
                    formatter: "{value} mm",
                },
            });

            series.push({
                name: Generic.t("rain"),
                type: "bar",
                data: weatherData[0][0],
                color: this.state.rxData["rain_color"] || "blue",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: value => `${value} mm`,
                },
            });
            cnt++;
        }
        if (this.state.rxData["temperature_visible"] === true && weatherData[0][1].length > 1) {
            legend.push(Generic.t("temperature"));

            yaxis.push({
                position: this.state.rxData["temperature_positionYAxis"] || "left",
                type: "value",
                // min max berechnen
                min: TempMin,
                max: TempMax,
                axisLabel: {
                    color: this.state.rxData["temperature_axislablecolor"] || "red",
                    formatter: "{value} °C",
                },
            });

            series.push({
                name: Generic.t("temperature"),
                type: "line",
                data: weatherData[0][1],
                color: this.state.rxData["temperature_color"] || "red",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: value => `${value} °C`,
                },
            });
            cnt++;
        }

        if (this.state.rxData["clouds_visible"] === true && this.state.rxData["clouds_show_separate"] === false && weatherData[0][2].length > 1) {
            if (this.state.rxData["sun_or_cloud"] === "sun") {
                legend.push(Generic.t("sun"));
            } else {
                legend.push(Generic.t("cloud"));
            }
            yaxis.push({
                position: this.state.rxData["clouds_positionYAxis"] || "right",
                type: "value",
                min: CloudMin,
                max: CloudMax,
                axisLabel: {
                    color: this.state.rxData["clouds_axislablecolor"] || "yellow",
                    formatter: "{value} %",
                },
            });
            series.push({
                name: this.state.rxData["sun_or_cloud"] === "sun" ? Generic.t("sun") : Generic.t("cloud"),
                type: "bar",
                data: weatherData[0][2],
                color: this.state.rxData["clouds_color"] || "yellow",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: value => `${value} %`,
                },
            });
            cnt++;
        }

        if (cnt === 0) {
            // add dummy data to show anything on screen

            console.log("add dummy data");

            legend.push(Generic.t("dummy"));
            yaxis.push({
                position: "left",
                type: "value",
                min: 0,
                max: 100,
                axisLabel: {

                    //todo axis lable color
                    color: "yellow",


                    formatter: "{value} %",
                },
            });
            series.push({
                name: Generic.t("dummy"),
                type: "bar",
                data: [
                    ["2024-04-30T00:00:00.000Z", 10],
                    ["2024-04-30T03:00:00.000Z", 20],
                    ["2024-04-30T06:00:00.000Z", 20],
                    ["2024-04-30T09:00:00.000Z", 60]
                ],

                tooltip: {
                    valueFormatter: value => `${value} %`,
                },
            });
        }

        // console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));

        const content = {
            backgroundColor: "transparent",
            title: {
                text: headline,

                show: headline.length>0 ? true : false,
                textStyle: {
                    //headline color
                    color: this.state.rxData["headline_color"] || "white",
                }
            },
            grid: {
                show: true,
                top: 30,
                bottom: useSecondDiagram ? 30 : 60,
                //backgroundColor: "#F5F5F5",
            },
            tooltip: {
                trigger: "axis",
            },
            legend: {
                data: legend,
                orient: "horizontal",
                right: 10,
                // top: "center",
                textStyle: {
                    color: this.state.rxData["legend_text_color"] || "black",
                }
            },
            xAxis: {
                type: "time",
                show: !useSecondDiagram,
                axisLabel: {
                    rotate: 45,

                    // axis lable color 
                    color: this.state.rxData["xaxis_color"] || "white",
                    formatter: value => {
                        //http://momentjs.com/docs/#/displaying/format/
                        let formatstring = "ddd HH:mm";
                        if (axisLabel_formatstring !== null && axisLabel_formatstring !== undefined && axisLabel_formatstring.length>2) {
                            formatstring = axisLabel_formatstring;
                        }
                        return moment(value).format(formatstring);
                    }
                }
            },

            yAxis: yaxis,

            series: series,
        };

        console.log(`options1: ${JSON.stringify(content)}`);

        return content;
    }

    /**
     *
     * @returns {echarts.EChartsOption}
     */
    getOption2() {
        console.log("getOption2 ");

        let weatherData;
        if (this.state.rxData["instance"].includes("daswetter")) {
            weatherData = this.getWeatherDataDasWetter();
        } else if (this.state.rxData["instance"].includes("weatherunderground")) {
            weatherData = this.getWeatherDataWU();
        }

        console.log(`##got ${JSON.stringify(weatherData[0])}`);

        const axisLabel_formatstring =  this.state.rxData["xaxis_axisLabel_formatstring"];

        // min / max
        const MinMax = weatherData[0][3];
        console.log(`min max ${JSON.stringify(MinMax)}`);

        const RainMin = MinMax["RainMin"];
        const RainMax = MinMax["RainMax"];
        // const TempMin = MinMax["TempMin"];
        // const TempMax = MinMax["TempMax"];
        const CloudMin = MinMax["CloudMin"];
        const CloudMax = MinMax["CloudMax"];

        const legend = [];
        const yaxis = [];
        const series = [];

        let cnt = 0;

        if (this.state.rxData["rain_visible"] === true && this.state.rxData["rain_show_separate"] === true && weatherData[0][0].length > 1) {
            legend.push(Generic.t("rain"));

            yaxis.push({
                position: this.state.rxData["rain_positionYAxis"] || "right",
                type: "value",
                //rain min / max berechnen
                min: RainMin,
                max: RainMax,
                axisLabel: {
                    color: this.state.rxData["rain_axislablecolor"] || "blue",
                    formatter: "{value} mm",
                },
            });

            series.push({
                name: Generic.t("rain"),
                type: "bar",
                data: weatherData[0][0],
                color: this.state.rxData["rain_color"] || "blue",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: value => `${value} mm`,
                },
            });
            cnt++;
        }

        if (this.state.rxData["clouds_visible"] === true && this.state.rxData["clouds_show_separate"] === true && weatherData[0][2].length > 1) {
            if (this.state.rxData["sun_or_cloud"] === "sun") {
                legend.push(Generic.t("sun"));
            } else {
                legend.push(Generic.t("cloud"));
            }
            yaxis.push({
                position: this.state.rxData["clouds_positionYAxis"] || "right",
                type: "value",
                min: CloudMin,
                max: CloudMax,
                axisLabel: {
                    color: this.state.rxData["clouds_axislablecolor"] || "yellow",
                    formatter: "{value} %",
                },
            });
            series.push({
                name: this.state.rxData["sun_or_cloud"] === "sun" ? Generic.t("sun") : Generic.t("cloud"),
                type: "bar",
                data: weatherData[0][2],
                color: this.state.rxData["clouds_color"] || "yellow",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: value => `${value} %`,
                },
            });
            cnt++;
        }

        if (cnt === 0) {
            // add dummy data to show anything on screen

            console.log("add dummy data");

            legend.push(Generic.t("dummy"));
            yaxis.push({
                position: "left",
                type: "value",
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: "{value} %",
                },
            });
            series.push({
                name: Generic.t("dummy"),
                type: "bar",
                data: [
                    ["2024-04-30T00:00:00.000Z", 10],
                    ["2024-04-30T03:00:00.000Z", 20],
                    ["2024-04-30T06:00:00.000Z", 20],
                    ["2024-04-30T09:00:00.000Z", 60]
                ],
                tooltip: {
                    valueFormatter: value => `${value} %`,
                },
            });
        }

        // console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));

        const content = {
            backgroundColor: "transparent",
            title: {
                text: "",
            },
            grid: {
                show: true,
                top: 30,
                bottom: 60,
                //backgroundColor: "#F5F5F5",
            },
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: legend,
                orient: "horizontal",
                right: 10,
                // top: "center",
                textStyle: {
                    color: this.state.rxData["legend_text_color"] || "black",
                }
            },
            xAxis: {
                type: "time",

                axisLabel: {
                    rotate: 45,

                    // axis lable color 
                    color: this.state.rxData["xaxis_color"] || "white",

                    formatter: value => {
                        //http://momentjs.com/docs/#/displaying/format/
                        let formatstring = "ddd HH:mm";
                        if (axisLabel_formatstring !== null && axisLabel_formatstring !== undefined && axisLabel_formatstring.length > 2) {
                            formatstring = axisLabel_formatstring;
                        }
                        return moment(value).format(formatstring);
                    }
                }
            },

            yAxis: yaxis,

            series: series,
        };

        console.log(`options2: ${JSON.stringify(content)}`);

        return content;
    }

    getWeatherDataWU() {
        console.log(`getWeatherData ${this.state.rxData["instance"]} / ${this.state.rxData["datastructure"]}`);

        const weatherData = [];
        const max_hours = 36;
        //let instanceID = this.state.rxData["instance"]

        const rainData = [];
        const tempData = [];
        const cloudData = [];

        let TempMin = 0;
        let TempMax = 20;
        const RainMin = 0;
        let RainMax = 1;

        let cnt = 1;

        for (let h = 0; h < max_hours; h++) {
            const rain_val = this.state.values[`${this.state.rxData[`oid_rain_${cnt}`]}.val`];
            const temp_val = this.state.values[`${this.state.rxData[`oid_temp_${cnt}`]}.val`];
            const cloud_val = this.state.values[`${this.state.rxData[`oid_cloud_${cnt}`]}.val`];
            const time_val = this.state.values[`${this.state.rxData[`oid_time_${cnt}`]}.val`];

            // const dayData = this.state.values[`${this.state.rxData["oid_general_day_1" ]}.val`];
            // let year = 0;
            // let month = 0;
            // let day = 0;
            // let hour = 0;
            // let minute = 0;
            // console.log("dayData " + time_val);

            let oDate = null;

            if (time_val !== null && time_val !== undefined) {
                oDate = new Date(time_val);
                // console.log("time " + oDate.toLocaleTimeString());
            }

            cnt++;

            if (rain_val > RainMax) {
                RainMax = rain_val;
            }
            if (temp_val > TempMax) {
                TempMax = temp_val;
            }
            if (temp_val < TempMin) {
                TempMin = temp_val;
            }

            if (oDate !== null && oDate !== undefined) {
                if (this.state.rxData["rain_visible"] === true &&  rain_val !== null) {
                    rainData.push(
                        [
                            oDate,
                            rain_val,
                        ],
                    );
                }

                if (this.state.rxData["temperature_visible"] === true &&  temp_val !== null) {
                    tempData.push(
                        [
                            oDate,
                            temp_val,
                        ],
                    );
                }
                if (this.state.rxData["clouds_visible"] === true &&  cloud_val !== null) {
                    let value = cloud_val;
                    if (this.state.rxData["sun_or_cloud"] === "sun") {
                        value = 100 - cloud_val;
                    }

                    cloudData.push(
                        [
                            oDate,
                            // bei Sonne 100-cloud_val
                            value,
                        ],
                    );
                }
            } else {
                console.log("oDate not defined ");
            }
        }

        const MinMax = {
            RainMin,
            RainMax,
            TempMin,
            TempMax,
            "CloudMin": 0,
            "CloudMax": 100
        };

        console.log(`rainData ${JSON.stringify(rainData)}`);
        console.log(`tempData ${JSON.stringify(tempData)}`);
        console.log(`cloudData ${JSON.stringify(cloudData)}`);

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        weatherData.push([
            rainData,
            tempData,
            cloudData,
            MinMax,
        ]);

        return weatherData;
    }

    getWeatherDataDasWetter() {
        console.log(`getWeatherData ${this.state.rxData["instance"]} / ${this.state.rxData["datastructure"]}`);

        const weatherData = [];
        const max_days = 5;
        let max_periods = 23;
        //const instanceID = this.state.rxData["instance"]

        const rainData = [];
        const tempData = [];
        const cloudData = [];

        let TempMin = 0;
        let TempMax = 20;
        const RainMin = 0;
        let RainMax = 1;

        let cnt = 1;
        for (let d = 1; d <= max_days; d++) {
            console.log(`day ${d}`);

            const dayData = this.state.values[`${this.state.rxData[`oid_general_day_${d}`]}.val`];
            let year = 0;
            let month = 0;
            let day = 0;
            let hour = 0;
            let minute = 0;

            console.log(`dayData ${JSON.stringify(dayData)}`);

            if (dayData !== null && dayData!== undefined) {
                year = Number(dayData.substring(0, 4));
                month = Number(dayData.substring(4, 6));
                month = month - 1;
                day = Number(dayData.substring(6, 8));
            }

            if (this.state.rxData["datastructure"] === "NextDaysDetailed") {
                max_periods = 8;
            } else if (this.state.rxData["datastructure"] === "NextHours") {
                if (d > 3) {
                    max_periods = 8;
                } else {
                    max_periods = 23;
                }
            } else if (this.state.rxData["datastructure"] === "NextHours2") {
                max_periods = 8;
            } else {
                console.log("getWeatherData: unknown data structure");
            }

            for (let p = 1; p <= max_periods; p++) {
                //console.log("period " + p);
                const rain_val = this.state.values[`${this.state.rxData[`oid_rain_${cnt}`]}.val`];
                const temp_val = this.state.values[`${this.state.rxData[`oid_temp_${cnt}`]}.val`];
                const cloud_val = this.state.values[`${this.state.rxData[`oid_cloud_${cnt}`]}.val`];
                const time_val = this.state.values[`${this.state.rxData[`oid_time_${cnt}`]}.val`];

                cnt++;
                //console.log("got data " + JSON.stringify(rain_val) + " " + JSON.stringify(temp_val) + " " + JSON.stringify(cloud_val) + " " + JSON.stringify(time_val));

                //calc date
                let oDate = null;

                if (time_val !== null && time_val !== undefined && year > 0 && month > 0 && day > 0) {
                    const timeData = time_val.split(":");
                    hour = timeData[0];
                    minute = timeData[1];

                    oDate = new Date(year, month, day, hour, minute, 0, 0);
                }

                if (oDate !== null && oDate !== undefined) {
                    if (rain_val > RainMax) {
                        RainMax = rain_val;
                    }
                    if (temp_val > TempMax) {
                        TempMax = temp_val;
                    }
                    if (temp_val < TempMin) {
                        TempMin = temp_val;
                    }

                    if (this.state.rxData["rain_visible"] === true && rain_val !== null) {
                        rainData.push([
                            oDate,
                            rain_val
                        ]);
                    }

                    if (this.state.rxData["temperature_visible"] === true &&  temp_val !== null) {
                        tempData.push([
                            oDate,
                            temp_val
                        ]);
                    }
                    if (this.state.rxData["clouds_visible"] === true &&  cloud_val !== null) {
                        let value = cloud_val;
                        if (this.state.rxData["sun_or_cloud"] === "sun") {
                            value = 100 - cloud_val;
                        }

                        cloudData.push([
                            oDate,
                            //bei Sonne 100-cloud_val
                            value
                        ]);
                    }
                    // console.log("date " + JSON.stringify(oDate) + " " + year + "." + month + "." + day + " " + hour + ":" + minute);
                } else {
                    console.log("oDate not defined ");
                }
            }
        }

        const MinMax = {
            RainMin,
            RainMax,
            TempMin,
            TempMax,
            "CloudMin": 0,
            "CloudMax": 100
        };

        console.log(`rainData ${JSON.stringify(rainData)}`);
        console.log(`tempData ${JSON.stringify(tempData)}`);
        console.log(`cloudData ${JSON.stringify(cloudData)}`);

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        weatherData.push([
            rainData,
            tempData,
            cloudData,
            MinMax
        ]);

        return weatherData;
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        console.log(`values ${JSON.stringify(this.state.values)}`);
        console.log(`rxData ${JSON.stringify(this.state.rxData)}`);

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight/2;
        }

        let useSecondDiagram;
        if ((this.state.rxData["rain_visible"] && this.state.rxData["rain_show_separate"])
            || (this.state.rxData["clouds_visible"] && this.state.rxData["clouds_show_separate"])
        ) {
            useSecondDiagram = true;
        }

        console.log(`size ${size} ${useSecondDiagram}`);

        // zweites diagramm nur wenn notwendig
        const content = <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            {size && <EchartContainer
                option={this.getOption1()}
                theme={this.props.themeType === "dark" ? "dark" : ""}
                style={{ height: `${size}px`, width: "100%" }}
                opts={{ renderer: "svg" }}
            />}

            {useSecondDiagram && size && <EchartContainer
                option={this.getOption2()}
                theme={this.props.themeType === "dark" ? "dark" : ""}
                style={{ height: `${size}px`, width: "100%" }}
                opts={{ renderer: "svg" }}
            />}
        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("content only ");
            return content;
        }

        const wrapcontent = this.wrapContent(content, null, { textAlign: "center" });
        console.log("wrap content ");

        return wrapcontent;
    }
}

WeatherWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default WeatherWidget;
