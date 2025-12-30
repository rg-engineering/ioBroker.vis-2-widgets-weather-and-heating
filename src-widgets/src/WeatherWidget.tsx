/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { type CSSProperties } from 'react';
import type {
    RxRenderWidgetProps,
    RxWidgetInfo,
    VisRxWidgetProps,
    WidgetData,
    VisRxWidgetState,
    RxWidgetInfoAttributesField
} from '@iobroker/types-vis-2';
import type { LegacyConnection } from '@iobroker/adapter-react-v5';

import moment from "moment";

import EchartContainer from "./EchartContainer";

import Generic from "./Generic";

const styles: Record<string, CSSProperties> =  {
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

type OptionDataValue = string | number | Date | null | undefined;

const setDataStructures = async (
    field: RxWidgetInfoAttributesField,
    data: WidgetData,
    changeData: (newData: WidgetData) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket: LegacyConnection,
    // eslint-disable-next-line @typescript-eslint/require-await
): Promise<void> => {
    console.log(`set new datastructure instance ${data["instance"]} ${data["datastructure"]}` );

    const instance = data["instance"] || "DasWetter.0";
    const location = data["location"] || "location_2"
    let max_days = 5;
    let max_periods = 8;
    let cnt = 1;

    // if DasWettter
    if (data["instance"].includes("daswetter")) {
        if (data["datastructure"] !== "ForecastDaily" && data["datastructure"] !== "ForecastHourly") {
            data["datastructure"] = "ForecastDaily";
        }

        const instance_part = instance;
        const location_part = location;

        if (data["datastructure"] === "ForecastDaily") {
            //max_periods = 1;
            max_days = 5;
            for (let d = 1; d <= max_days; d++) {
                data[`oid_general_day_${d}`] = `${instance_part}.${location_part}.ForecastDaily.Day_${d}.date`;

                //for (let p = 1; p <= max_periods; p++) {
                data[`oid_rain_${cnt}`] = `${instance_part}.${location_part}.ForecastDaily.Day_${d}.Rain`;
                data[`oid_temp_${cnt}`] = `${instance_part}.${location_part}.ForecastDaily.Day_${d}.Temperature_Max`;
                data[`oid_cloud_${cnt}`] = "";
                data[`oid_time_${cnt}`] = "";
                cnt++;
                //}
            }
        } else if (data["datastructure"] === "ForecastHourly") {
            max_periods = 24;
            //max_days = 1;
            //for (let d = 1; d <= max_days; d++) {
            data[`oid_general_day_1`] = `${instance_part}.${location_part}.ForecastDaily.Day_1.date`;

            for (let p = 1; p <= max_periods; p++) {
                data[`oid_rain_${cnt}`] = `${instance_part}.${location_part}.ForecastHourly.Hour_${p}.rain`;
                data[`oid_temp_${cnt}`] = `${instance_part}.${location_part}.ForecastHourly.Hour_${p}.temperature`;
                data[`oid_cloud_${cnt}`] = `${instance_part}.${location_part}.ForecastHourly.Hour_${p}.clouds`;
                data[`oid_time_${cnt}`] = `${instance_part}.${location_part}.ForecastHourly.Hour_${p}.end`;
                cnt++;
            }
            //}

        } else {
            console.log(`datastructures: unknown data structure${data["datastructure"]}`);
        }
    } else if (data["instance"].includes("weatherunderground")) {
        if (data["datastructure"] !== "forecast" && data["datastructure"] !== "forecastHourly" && data["datastructure"] !== "forecastPeriod") {
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



interface StaticRxData {
    noCard: boolean;
    widgetTitle: string;
    instance: string;
    oid_location: string;
    datastructure: string;
    headline_color: string;
    legend_text_color: string;
    xaxis_axisLabel_formatstring: string;
    xaxis_color: string;
    rain_visible: boolean;
    rain_color: string;
    rain_axislablecolor: string;
    rain_positionYAxis: string;
    rain_show_separate: boolean;
    temperature_visible: boolean;
    temperature_color: string;
    temperature_axislablecolor: string;
    temperature_positionYAxis: string;
    clouds_visible: boolean;
    clouds_color: string;
    clouds_axislablecolor: string;
    clouds_positionYAxis: string;
    clouds_show_separate: boolean;
    sun_or_cloud: string;
    chanceofraining_visible: boolean;
    chanceofraining_color: string;
    chanceofraining_show_separate: boolean;
    
        
}
interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
}

interface WeatherData {
    rain: [Date, number][];
    temp: [Date, number][];
    clouds: [Date, number][];
    minMax: {
        RainMin: number;
        RainMax: number;
        TempMin: number;
        TempMax: number;
        CloudMin: number;
        CloudMax: number;
    };
}

export default class WeatherWidget extends Generic<StaticRxData, StaticState> {



    private readonly refCardContent: React.RefObject<HTMLDivElement | null> = React.createRef();
    private lastRxData: string | undefined;
    private updateTimeout: ReturnType<typeof setTimeout> | undefined;
    constructor(props: VisRxWidgetProps) {
        super(props);
        this.state = {
            ...this.state,
            objects: [],
            showDialog: null,
        };
    }

    static getWidgetInfo(): RxWidgetInfo {
        const oid_rain_fields = [];
        const oid_temp_fields = [];
        const oid_cloud_fields = [];
        const oid_time_fields = [];
        const oid_general_fields = [];
        const oid_chanceofrain_fields = [];

        const datastructure_options = [];


        let cnt = 1;

        const max_days = 5;
        const max_periods = 24;

        /* das geht so nicht
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
        */
        //daswetter
        datastructure_options.push({
            value: "ForecastDaily",
            label: "datastructure_ForecastDaily"
        });
        datastructure_options.push({
            value: "ForecastHourly",
            label: "datastructure_ForecastHourly"
        });

        // }


        //mit v4.x haben wir max 5 Tage
        for (let d = 1; d <= max_days; d++) {
            oid_general_fields.push({
                name: `oid_general_day_${d}`,    // name in data structure
                label: Generic.t("oid_general_day_") + d, // translated field label
                type: "id",
                default: "",
            });
        }

        //mit v4.x haben wir 1 Periode für 5 Tage oder 24 Perioden für einen Tag
        for (let p = 1; p <= max_periods; p++) {
            oid_rain_fields.push({
                name: `oid_rain_${cnt}`,    // name in data structure
                label: Generic.t("oid_rain_") + cnt, // translated field label
                type: "id",
                default: "",
            });
            oid_temp_fields.push({
                name: `oid_temp_${cnt}`,    // name in data structure
                label: Generic.t("oid_temp_") + cnt, // translated field label
                type: "id",
                default: "",
            });
            oid_cloud_fields.push({
                name: `oid_cloud_${cnt}`,    // name in data structure
                label: Generic.t("oid_cloud_") + cnt, // translated field label
                type: "id",
                default: "",
            });
            oid_time_fields.push({
                name: `oid_time_${cnt}`,    // name in data structure
                label: Generic.t("oid_time_") + cnt, // translated field label
                type: "id",
                default: "",
            });
            oid_chanceofrain_fields.push({
                name: `oid_chancerain_${cnt}`,    // name in data structure
                label: Generic.t("oid_chancerain_") + cnt, // translated field label
                type: "id",
                default: "",
            });
            cnt++;
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
                            default: "daswetter.0.location_1.Location",
                            //only available with DasWetter
                            hidden: "!!data.instance.includes('weatherunderground')",
                            tooltip: "OID if DP where location is available. If not set, location name is not shown"
                        },
                        {
                            name: "datastructure",    // name in data structure
                            label: "datastructure", // translated field label
                            type: "select",
                            options: datastructure_options,
                            //default: weatherunderground ? "forecastHourly" : "NextHours",
                            onChange: setDataStructures,
                            tooltip: "select a datastructure. Make sure the datastructure is available on object tree"
                        },
                        {
                            name: "location",    // name in data structure
                            label: "location oid part", // translated field label
                            type: "text",
                            default: "location_1",
                            tooltip: "location part of OID to auto complete OID settings",
                            onChange: setDataStructures,
                            //only available with DasWetter
                            hidden: "!!data.instance.includes('weatherunderground')"
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
                    //ausblenden bei instance == wetter
                    name: "chanceofraining", // group name
                    label: "chanceofrain",



                    hidden: (data: WidgetData) => data.instance.includes("daswetter"),
                    fields: [
                        {
                            name: "chanceofraining_visible",    // name in data structure
                            label: "chanceofraining_visible", // translated field label
                            type: "checkbox",
                            default: false,

                            //enable for WU only
                            hidden: (data: WidgetData) => data.instance.includes("daswetter"),
                        },
                        {
                            name: "chanceofraining_color",    // name in data structure
                            label: "chanceofraining_color", // translated field label
                            type: "color",
                            default: "blue",

                            //enable for WU only
                            hidden: (data: WidgetData) => data.instance.includes("daswetter"),
                        },
                        {
                            name: "chanceofraining_show_separate",    // name in data structure
                            label: "chanceofraining_show_separate", // translated field label
                            type: "checkbox",
                            default: false,

                            //enable for WU only
                            hidden: (data: WidgetData) => data.instance.includes("daswetter"),
                        },
                    ]
                },
                {
                    name: "OIDS_general", // group name
                    label: "oids_general",
                    fields: oid_general_fields,
                    //hidden: (data: WidgetData) => data.instance.includes("daswetter")
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
                    hidden: (data: WidgetData) => data.instance.includes("daswetter")
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
    getWidgetInfo(): RxWidgetInfo {
        return WeatherWidget.getWidgetInfo();
    }

    getOid(obj: StaticRxData, key: keyof StaticRxData): string {
        return obj[key] as string;
    }


    getOption1(): echarts.EChartsOption {
        console.log("getOption1 ");

        let weatherData = null;
        if (this.state.rxData["instance"].includes("daswetter")) {
            weatherData = this.getWeatherDataDasWetter();
        } else if (this.state.rxData["instance"].includes("weatherunderground")) {
            weatherData = this.getWeatherDataWU();
        }
        let content: echarts.EChartsOption = {}

        if (weatherData !== null) {
            //console.log(`##got ${JSON.stringify(weatherData[0])}`);

            let useSecondDiagram = false;

            if ((this.state.rxData["rain_visible"] && this.state.rxData["rain_show_separate"])
                || (this.state.rxData["clouds_visible"] && this.state.rxData["clouds_show_separate"])
            ) {
                useSecondDiagram = true;
            }

            console.log(`show second diagram ${useSecondDiagram}`);

            const location = this.state.values[`${this.state.rxData["oid_location"]}.val`];
            const axisLabel_formatstring = this.state.rxData["xaxis_axisLabel_formatstring"];
            console.log(`##got ${location}`);
            //let headline = Generic.t("Weather at ") + location;
            let headline = "";
            if (location != null && typeof location == "string" && location.length > 0) {
                headline = location;
            }

            // min / max






            //const MinMax = weatherData[0][3];
            //console.log(`min max ${JSON.stringify(MinMax)}`);

            const RainMin = weatherData.minMax.RainMin; // MinMax["RainMin"];
            const RainMax = weatherData.minMax.RainMax; // MinMax["RainMax"];
            const TempMin = weatherData.minMax.TempMin; // MinMax["TempMin"];
            const TempMax = weatherData.minMax.TempMax; // MinMax["TempMax"];
            const CloudMin = weatherData.minMax.CloudMin; // MinMax["CloudMin"];
            const CloudMax = weatherData.minMax.CloudMax; // MinMax["CloudMax"];



            const legend: string[] = [];
            const yaxis: echarts.YAXisComponentOption[] = [];
            const series: echarts.SeriesOption[] = [];

            let cnt = 0;

            if (this.state.rxData["rain_visible"] === true && this.state.rxData["rain_show_separate"] === false && weatherData.rain.length > 1) {
                legend.push(Generic.t("rain"));

                let rain_yaxispos = this.getOid(this.state.rxData, `rain_positionYAxis` as keyof StaticRxData);
                if (rain_yaxispos === null || rain_yaxispos === undefined) {
                    rain_yaxispos = "right";
                }

                yaxis.push({
                    position: (rain_yaxispos === 'left' || rain_yaxispos === 'right' || rain_yaxispos === 'top' || rain_yaxispos === 'bottom') ? rain_yaxispos : 'right',
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
                    data: weatherData.rain,
                    color: this.state.rxData["rain_color"] || "blue",
                    yAxisIndex: cnt,
                    tooltip: {
                        valueFormatter: (value: OptionDataValue | OptionDataValue[]) => `${Number(value)} mm`,
                    },
                });
                cnt++;
            }
            if (this.state.rxData["temperature_visible"] === true && weatherData.temp.length > 1) {
                legend.push(Generic.t("temperature"));

                let temperature_yaxispos = this.getOid(this.state.rxData, `temperature_positionYAxis` as keyof StaticRxData);
                if (temperature_yaxispos === null || temperature_yaxispos === undefined) {
                    temperature_yaxispos = "left";
                }

                yaxis.push({
                    position: (temperature_yaxispos === 'left' || temperature_yaxispos === 'right' || temperature_yaxispos === 'top' || temperature_yaxispos === 'bottom') ? temperature_yaxispos : 'left',
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
                    data: weatherData.temp,
                    color: this.state.rxData["temperature_color"] || "red",
                    yAxisIndex: cnt,
                    tooltip: {
                        valueFormatter: (value: OptionDataValue | OptionDataValue[]) => `${Number(value)} °C`,
                    },
                });
                cnt++;
            }

            if (this.state.rxData["clouds_visible"] === true && this.state.rxData["clouds_show_separate"] === false && weatherData.clouds.length > 1) {
                if (this.state.rxData["sun_or_cloud"] === "sun") {
                    legend.push(Generic.t("sun"));
                } else {
                    legend.push(Generic.t("cloud"));
                }

                let clouds_yaxispos = this.getOid(this.state.rxData, `clouds_positionYAxis` as keyof StaticRxData);
                if (clouds_yaxispos === null || clouds_yaxispos === undefined) {
                    clouds_yaxispos = "right";
                }

                yaxis.push({
                    position: (clouds_yaxispos === 'left' || clouds_yaxispos === 'right' || clouds_yaxispos === 'top' || clouds_yaxispos === 'bottom') ? clouds_yaxispos : 'left',
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
                    data: weatherData.clouds,
                    color: this.state.rxData["clouds_color"] || "yellow",
                    yAxisIndex: cnt,
                    tooltip: {
                        valueFormatter: (value: OptionDataValue | OptionDataValue[]) => `${Number(value)} %`,
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
                        valueFormatter: (value: OptionDataValue | OptionDataValue[]) => `${Number(value)} %`,
                    },
                });
            }

            // console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));

            content = {
                backgroundColor: "transparent",
                title: {
                    text: headline,

                    show: headline.length > 0 ? true : false,
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

            console.log(`options1: ${JSON.stringify(content)}`);
        } else {
            console.log("weatherData is null");

        }

        return content;
    }


    getOption2(): echarts.EChartsOption {
        console.log("getOption2 ");

        let weatherData;
        if (this.state.rxData["instance"].includes("daswetter")) {
            weatherData = this.getWeatherDataDasWetter();
        } else if (this.state.rxData["instance"].includes("weatherunderground")) {
            weatherData = this.getWeatherDataWU();
        }

        let content: echarts.EChartsOption = {}

        if (weatherData != null) {
            console.log(`##got ${JSON.stringify(weatherData)}`);

            const axisLabel_formatstring = this.state.rxData["xaxis_axisLabel_formatstring"];

            // min / max
            //const MinMax = weatherData[0][3];
            //console.log(`min max ${JSON.stringify(MinMax)}`);

            const RainMin = weatherData.minMax.RainMin; //MinMax["RainMin"];
            const RainMax = weatherData.minMax.RainMax; //MinMax["RainMax"];
            // const TempMin = MinMax["TempMin"];
            // const TempMax = MinMax["TempMax"];
            const CloudMin = weatherData.minMax.CloudMin;  //MinMax["CloudMin"];
            const CloudMax = weatherData.minMax.CloudMax;  //MinMax["CloudMax"];

            const legend: string[] = [];
            const yaxis: echarts.YAXisComponentOption[] = [];
            const series: echarts.SeriesOption[] = [];

            let cnt = 0;

            if (this.state.rxData["rain_visible"] === true && this.state.rxData["rain_show_separate"] === true && weatherData.rain.length > 1) {
                legend.push(Generic.t("rain"));

                let rain_yaxispos = this.getOid(this.state.rxData, `rain_positionYAxis` as keyof StaticRxData);
                if (rain_yaxispos === null || rain_yaxispos === undefined) {
                    rain_yaxispos = "right";
                }

                yaxis.push({
                    position: (rain_yaxispos === 'left' || rain_yaxispos === 'right' || rain_yaxispos === 'top' || rain_yaxispos === 'bottom') ? rain_yaxispos : 'right',
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
                    data: weatherData.rain,
                    color: this.state.rxData["rain_color"] || "blue",
                    yAxisIndex: cnt,
                    tooltip: {
                        valueFormatter: (value: OptionDataValue | OptionDataValue[]) => `${Number(value)} mm`,
                    },
                });
                cnt++;
            }

            if (this.state.rxData["clouds_visible"] === true && this.state.rxData["clouds_show_separate"] === true && weatherData.clouds.length > 1) {
                if (this.state.rxData["sun_or_cloud"] === "sun") {
                    legend.push(Generic.t("sun"));
                } else {
                    legend.push(Generic.t("cloud"));
                }

                let clouds_yaxispos = this.getOid(this.state.rxData, `clouds_positionYAxis` as keyof StaticRxData);
                if (clouds_yaxispos === null || clouds_yaxispos === undefined) {
                    clouds_yaxispos = "right";
                }

                yaxis.push({
                    position: (clouds_yaxispos === 'left' || clouds_yaxispos === 'right' || clouds_yaxispos === 'top' || clouds_yaxispos === 'bottom') ? clouds_yaxispos : 'right',
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
                    data: weatherData.clouds,
                    color: this.state.rxData["clouds_color"] || "yellow",
                    yAxisIndex: cnt,
                    tooltip: {
                        valueFormatter: (value: OptionDataValue | OptionDataValue[]) => `${Number(value)} %`,
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
                        valueFormatter: (value: OptionDataValue | OptionDataValue[]) => `${Number(value)} %`,
                    },
                });
            }

            // console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));

            content = {
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
        } else {
            console.log("weatherData is null");
        }
        return content;
    }

    getWeatherDataWU(): WeatherData {
        console.log(`getWeatherData ${this.state.rxData["instance"]} / ${this.state.rxData["datastructure"]}`);

        //const weatherData = [];
        const max_hours = 36;
        //let instanceID = this.state.rxData["instance"]

        const rainData: [Date, number][] = [];
        const tempData: [Date, number][] = [];
        const cloudData: [Date, number][] = [];

        let TempMin = 0;
        let TempMax = 20;
        const RainMin = 0;
        let RainMax = 1;

        let cnt = 1;

        for (let h = 0; h < max_hours; h++) {
            //const rain_val = this.state.values[`${this.state.rxData[`oid_rain_${cnt}`]}.val`];
            //const temp_val = this.state.values[`${this.state.rxData[`oid_temp_${cnt}`]}.val`];
            //const cloud_val = this.state.values[`${this.state.rxData[`oid_cloud_${cnt}`]}.val`];
            //const time_val = this.state.values[`${this.state.rxData[`oid_time_${cnt}`]}.val`];

            const oid_rain = `oid_rain_${cnt}`;
            let oid = this.getOid(this.state.rxData, oid_rain as keyof StaticRxData);
            const rain_val = this.state.values[`${oid}.val`];

            const oid_temp = `oid_temp_${cnt}`;
            oid = this.getOid(this.state.rxData, oid_temp as keyof StaticRxData);
            const temp_val = this.state.values[`${oid}.val`];

            const oid_cloud = `oid_cloud_${cnt}`;
            oid = this.getOid(this.state.rxData, oid_cloud as keyof StaticRxData);
            const cloud_val = this.state.values[`${oid}.val`];

            const oid_time = `oid_time_${cnt}`;
            oid = this.getOid(this.state.rxData, oid_time as keyof StaticRxData);
            const time_val = this.state.values[`${oid}.val`];



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
                if (this.state.rxData["rain_visible"] === true && rain_val !== null) {
                    rainData.push(
                        [
                            oDate,
                            rain_val,
                        ],
                    );
                }

                if (this.state.rxData["temperature_visible"] === true && temp_val !== null) {
                    tempData.push(
                        [
                            oDate,
                            temp_val,
                        ],
                    );
                }
                if (this.state.rxData["clouds_visible"] === true && cloud_val !== null) {
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

        // Runden: Min => floor, Max => ceil (sicher stellen, dass Zahlen finite sind)
        const roundedRainMin = Number.isFinite(RainMin) ? Math.floor(RainMin) : RainMin;
        const roundedRainMax = Number.isFinite(RainMax) ? Math.ceil(RainMax) : RainMax;
        const roundedTempMin = Number.isFinite(TempMin) ? Math.floor(TempMin) : TempMin;
        const roundedTempMax = Number.isFinite(TempMax) ? Math.ceil(TempMax) : TempMax;

        const MinMax = {
            RainMin: roundedRainMin,
            RainMax: roundedRainMax,
            TempMin: roundedTempMin,
            TempMax: roundedTempMax,
            CloudMin: 0,
            CloudMax: 100
        };

        console.log(`rainData ${JSON.stringify(rainData)}`);
        console.log(`tempData ${JSON.stringify(tempData)}`);
        console.log(`cloudData ${JSON.stringify(cloudData)}`);

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        const weatherData: WeatherData = {
            rain: rainData,   // [string, number][]
            temp: tempData,   // [string, number][]
            clouds: cloudData, // [string, number][]
            minMax: MinMax    // { RainMin, RainMax, ... }
        };

        return weatherData;
    }

    parseDayData(dayData?: string | null): { year: number; month: number; monthIndex: number; day: number } | null {
        if (!dayData) {
            return null;
        }
        const s = String(dayData).trim();

        if (s.length === 0) {
            return null;
        }

        type ParsedDate = {
            year: number;
            month: number;
            monthIndex: number;
            day: number;
        };

        // Hilfsfunktion: prüft Bereich und liefert Objekt oder null
        const toResult = (y: number, m: number, d: number): ParsedDate | null => {
            if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
                console.log("anything finite");
                return null;
            }
            if (m < 1 || m > 12) {
                console.log("unexpected month " + m);
                return null;
            }
            if (d < 1 || d > 31) {
                console.log("unexpected day " + d);
                return null;
            }
            console.log("returned " + y + " " + m + " " + d);
            return { year: y, month: m, monthIndex: m - 1, day: d };
        };

        // 1) reines YYYYMMDD (genau 8 Ziffern)
        const onlyDigits = s.replace(/\D/g, '');
        if (/^\d{8}$/.test(onlyDigits)) {
            const y = Number(onlyDigits.substring(0, 4));
            const m = Number(onlyDigits.substring(4, 6));
            const d = Number(onlyDigits.substring(6, 8));
            const r = toResult(y, m, d);
            if (r) {
                return r;
            }
        }

        // 2) Try mehrere Regex-Varianten (Jahr-Monat-Tag)
        const patterns: { regex: RegExp; map: (m: RegExpExecArray) => { y: number; mo: number; da: number } }[] = [
            // YYYY-MM-DD, YYYY.MM.DD, YYYY/MM/DD oder eingebettet
            {
                regex: /(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/,
                map: (m) => ({ y: Number(m[1]), mo: Number(m[2]), da: Number(m[3]) }),
            },
            // DD.MM.YYYY oder DD-MM-YYYY oder DD/MM/YYYY
            {
                regex: /(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})/,
                map: (m) => ({ y: Number(m[3]), mo: Number(m[2]), da: Number(m[1]) }),
            },
            // Falls Jahr und Tag/Monat mit Leerzeichen / Komma kombiniert auftauchen, suche nach oben stehenden Mustern global
            {
                regex: /(\d{4})\s*(\d{2})\s*(\d{2})/, // z.B. "2025 12 30"
                map: (m) => ({ y: Number(m[1]), mo: Number(m[2]), da: Number(m[3]) }),
            },
        ];

        for (const p of patterns) {
            const m = p.regex.exec(s);
            if (m) {
                const { y, mo, da } = p.map(m);
                let year = y;
                if (y >= 0 && y <= 99) {
                    year = 2000 + y; // zweistelliges Jahr
                }
                const r = toResult(year, mo, da);
                if (r) {
                    return r;
                }
            }
        }

        // 3) Falls nichts gefunden wurde, versuche einzelne Token zu parsen (z.B. "Thu, 30.12.2025")
        const tokens = s.split(/\s+/);
        for (const t of tokens) {
            // token ohne Uhrzeit-Teil (z.B. "30.12.2025,12:00" -> "30.12.2025")
            const cleaned = t.split(',')[0];
            for (const p of patterns) {
                const m = p.regex.exec(cleaned);
                if (m) {
                    const { y, mo, da } = p.map(m);
                    let year = y;
                    if (y >= 0 && y <= 99) {
                        year = 2000 + y;
                    }
                    const r = toResult(year, mo, da);
                    if (r) {
                        return r;
                    }
                }
            }
        }

        // nichts erkannt
        return null;
    }



    getWeatherDataDasWetter(): WeatherData {
        console.log(`getWeatherData ${this.state.rxData["instance"]} / ${this.state.rxData["datastructure"]}`);



        //const weatherData = [];
        let max_days = 5;
        let max_periods = 23;
        //const instanceID = this.state.rxData["instance"]

        const rainData: [Date, number][] = [];
        const tempData: [Date, number][] = [];
        const cloudData: [Date, number][] = [];

        let TempMin = 20;
        let TempMax = 5;
        const RainMin = 0;
        let RainMax = 1;

        let cnt = 1;

        if (this.state.rxData["datastructure"] === "ForecastDaily") {
            max_periods = 1;
            max_days = 5;
        } else if (this.state.rxData["datastructure"] === "ForecastHourly") {
            max_days = 1;
            max_periods = 24;

        } else {
            console.log("getWeatherData: unknown data structure");
        }


        for (let d = 1; d <= max_days; d++) {
            console.log(`day ${d}`);


            const oid_day = `oid_general_day_${d}`;
            const oid = this.getOid(this.state.rxData, oid_day as keyof StaticRxData);
            const dayData = this.state.values[`${oid}.val`];
            //const dayData = this.state.values[`${this.state.rxData[`oid_general_day_${d}`]}.val`];

            let year = 0;
            let month = 0;
            let day = 0;
            let hour = 0;
            let minute = 0;

            console.log(`dayData ${JSON.stringify(dayData)}`);

            const parsed = this.parseDayData(dayData);
            if (parsed) {
                year = parsed.year;
                month = parsed.month;
                day = parsed.day;
            }

            /*
            if (dayData !== null && dayData!== undefined) {
                year = Number(dayData.substring(0, 4));
                month = Number(dayData.substring(4, 6));
                month = month - 1;
                day = Number(dayData.substring(6, 8));
            }
            */



            for (let p = 1; p <= max_periods; p++) {
                //console.log("period " + p);
                //const rain_val = this.state.values[`${this.state.rxData[`oid_rain_${cnt}`]}.val`];
                //const temp_val = this.state.values[`${this.state.rxData[`oid_temp_${cnt}`]}.val`];
                //const cloud_val = this.state.values[`${this.state.rxData[`oid_cloud_${cnt}`]}.val`];
                //const time_val = this.state.values[`${this.state.rxData[`oid_time_${cnt}`]}.val`];

                const oid_rain = `oid_rain_${cnt}`;
                let oid = this.getOid(this.state.rxData, oid_rain as keyof StaticRxData);
                const rain_val = this.state.values[`${oid}.val`];

                const oid_temp = `oid_temp_${cnt}`;
                oid = this.getOid(this.state.rxData, oid_temp as keyof StaticRxData);
                const temp_val = this.state.values[`${oid}.val`];

                const oid_cloud = `oid_cloud_${cnt}`;
                oid = this.getOid(this.state.rxData, oid_cloud as keyof StaticRxData);
                const cloud_val = this.state.values[`${oid}.val`];

                let time_val = "00:00";

                const oid_time = `oid_time_${cnt}`;
                oid = this.getOid(this.state.rxData, oid_time as keyof StaticRxData);
                if (oid !== undefined && oid !== "") {
                    time_val = this.state.values[`${oid}.val`];
                } else {
                    time_val = "12:00";
                }

                if (time_val === undefined) {
                    time_val = "12:00";
                }


                console.log("time_val " + time_val);
                // Falls unerwartet ein Datum mit Komma geliefert wird, entfernen wir alles bis zum Leerzeichen nach dem Komma
                if (typeof time_val === "string" && time_val.includes(",")) {
                    const commaIdx = time_val.indexOf(",");
                    const spaceAfterCommaIdx = time_val.indexOf(" ", commaIdx);
                    if (spaceAfterCommaIdx >= 0) {
                        time_val = time_val.substring(spaceAfterCommaIdx + 1).trim();
                    } else {
                        time_val = time_val.substring(commaIdx + 1).trim();
                    }
                }

                cnt++;
                //console.log("got data " + JSON.stringify(rain_val) + " " + JSON.stringify(temp_val) + " " + JSON.stringify(cloud_val) + " " + JSON.stringify(time_val));

                //calc date
                let oDate = null;

                if (time_val !== null && time_val !== undefined && year > 0 && month > 0 && day > 0) {
                    const timeData = time_val.split(":");
                    hour = Number(timeData[0]);
                    minute = Number(timeData[1]);

                    console.log("hour " + hour + " minute " + minute);

                    oDate = new Date(year, month - 1, day, hour, minute, 0, 0);

                    console.log("= " + oDate.toLocaleString());
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

                    if (this.state.rxData["temperature_visible"] === true && temp_val !== null) {
                        tempData.push([
                            oDate,
                            temp_val
                        ]);
                    }
                    if (this.state.rxData["clouds_visible"] === true && cloud_val !== null) {
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

        // Runden: Min => floor, Max => ceil (sicher stellen, dass Zahlen finite sind)
        const roundedRainMin = Number.isFinite(RainMin) ? Math.floor(RainMin) : RainMin;
        const roundedRainMax = Number.isFinite(RainMax) ? Math.ceil(RainMax) : RainMax;
        const roundedTempMin = Number.isFinite(TempMin) ? Math.floor(TempMin) : TempMin;
        const roundedTempMax = Number.isFinite(TempMax) ? Math.ceil(TempMax) : TempMax;

        const MinMax = {
            RainMin: roundedRainMin,
            RainMax: roundedRainMax,
            TempMin: roundedTempMin,
            TempMax: roundedTempMax,
            CloudMin: 0,
            CloudMax: 100
        };

        console.log(`rainData ${JSON.stringify(rainData)}`);
        console.log(`tempData ${JSON.stringify(tempData)}`);
        console.log(`cloudData ${JSON.stringify(cloudData)}`);
        console.log(`min max ${JSON.stringify(MinMax)}`);

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        const weatherData: WeatherData = {
            rain: rainData,   // [string, number][]
            temp: tempData,   // [string, number][]
            clouds: cloudData, // [string, number][]
            minMax: MinMax    // { RainMin, RainMax, ... }
        };

        return weatherData;
    }

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
        super.renderWidgetBody(props);

        console.log(`values ${JSON.stringify(this.state.values)}`);
        console.log(`rxData ${JSON.stringify(this.state.rxData)}`);

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight / 2;
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

                style={{ height: `${size}px`, width: "100%" }}
                opts={{ renderer: "svg" }}
            />}

            {useSecondDiagram && size && <EchartContainer
                option={this.getOption2()}

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


