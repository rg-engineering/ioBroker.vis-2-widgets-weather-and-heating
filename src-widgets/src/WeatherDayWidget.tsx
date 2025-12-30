/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/dot-notation */
/// <reference types="vite/client" />

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

import Grid from "@mui/material/Grid";

import Generic from "./Generic";

const styles: Record<string, CSSProperties> = {
    cardContent: {
        flex: 1,
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
};


// todo mondphase bzw. Ausleuchtung anzeigen anzeigen
// todo Sonnenaufgang und Untergang
// todo Mondaufgang und Untergang

//windicons mit DasWetter@4.x nicht nutzbar

// todo wind: wenn beaufort-Galerie, dann muss auch Beafort-OID verwendet werden
// todo wind: in galerie1 fehlt icon 9, 18,27

//function importAllImages(imageModules: Record<string, string> ) {
    //let images = new Map();

    // Iteriere durch alle importierten Dateien
    /*
    requireContext.keys().forEach((key) => {
        // Erhalte den Dateinamen ohne Pfad und Dateiendung
        const fileName = key.replace('./', '').replace(/\.[^/.]+$/, '');

        // Füge Bildpfad und Dateinamen der Map hinzu
        images.set(fileName, {
            src: requireContext(key),  // Bildpfad
            name: fileName             // Ursprünglicher Dateiname
        });
    });
    */

    //    const imageMap: Record<string, string> = {};

    //    for (const path in imageModules) {
    //        const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, ''); // z.B. "home" aus "/src/assets/icons/home.png"
    //        const mod = imageModules[path] as unknown as { default: string };
    //        if (fileName && mod?.default) {
    //            imageMap[fileName] = mod.default;
    //        }
    //    }


    //    return imageMap;
//}

function importAllImages(   imageModules: Record<string, { default: string }>): Record<string, string> {
    const imageMap: Record<string, string> = {};

    for (const path in imageModules) {
        const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '');
        const mod = imageModules[path];
        if (fileName && mod?.default) {
            imageMap[fileName] = mod.default;
        }
    }

    return imageMap;
}


//const imagesTest = importAllImages(require.context('./assets/icons/tiempo-weather/galeria1', false, /\.(png)$/));

// weather icons
//const images1 = require.context("./assets/icons/tiempo-weather/galeria1", false);
//const icons_weather_galeria1 = images1.keys().map(image1 => images1(image1));
//const icons_weather_galeria1 = importAllImages(require.context('./assets/icons/tiempo-weather/galeria1', false, /\.(png)$/));
const icons_weather_galeria1 = importAllImages(import.meta.glob('./assets/icons/tiempo-weather/galeria1/*.png', { eager: true }));

//const images2 = require.context("./assets/icons/tiempo-weather/galeria2", false);
//const icons_weather_galeria2 = images2.keys().map(image2 => images2(image2));
//const icons_weather_galeria2 = importAllImages(require.context('./assets/icons/tiempo-weather/galeria2', false, /\.(png)$/));
const icons_weather_galeria2 = importAllImages(import.meta.glob('./assets/icons/tiempo-weather/galeria2/*.png', { eager: true }));

//const images3 = require.context("./assets/icons/tiempo-weather/galeria3", false);
//const icons_weather_galeria3 = images3.keys().map(image3 => images3(image3));
//const icons_weather_galeria3 = importAllImages(require.context('./assets/icons/tiempo-weather/galeria3', false, /\.(png)$/));
const icons_weather_galeria3 = importAllImages(import.meta.glob('./assets/icons/tiempo-weather/galeria3/*.png', { eager: true }));

//const images4 = require.context("./assets/icons/tiempo-weather/galeria4", false);
//const icons_weather_galeria4 = images4.keys().map(image4 => images4(image4));
//const icons_weather_galeria4 = importAllImages(require.context('./assets/icons/tiempo-weather/galeria4', false, /\.(png)$/));
const icons_weather_galeria4 = importAllImages(import.meta.glob('./assets/icons/tiempo-weather/galeria4/*.png', { eager: true }));


//const images5_color = require.context("./assets/icons/tiempo-weather/galeria5/PNG/Color", false);
//const icons_weather_galeria5_color = images5_color.keys().map(image5_color => images5_color(image5_color));
//const icons_weather_galeria5_color = importAllImages(require.context('./assets/icons/tiempo-weather/galeria5/PNG/Color', false, /\.(png)$/));
const icons_weather_galeria5_color = importAllImages(import.meta.glob('./assets/icons/tiempo-weather/galeria5/PNG/Color/*.png', { eager: true }));

//const images5_white = require.context("./assets/icons/tiempo-weather/galeria5/PNG/White", false);
//const icons_weather_galeria5_white = images5_white.keys().map(image5_white => images5_white(image5_white));
//const icons_weather_galeria5_white = importAllImages(require.context('./assets/icons/tiempo-weather/galeria5/PNG/White', false, /\.(png)$/));
const icons_weather_galeria5_white = importAllImages(import.meta.glob('./assets/icons/tiempo-weather/galeria5/PNG/White/*.png', { eager: true }));

//const images6 = require.context("./assets/icons/tiempo-weather/galeria6", false);
//const icons_weather_galeria6 = images6.keys().map(image6 => images6(image6));
//const icons_weather_galeria6 = importAllImages(require.context('./assets/icons/tiempo-weather/galeria6', false, /\.(png)$/));
const icons_weather_galeria6 = importAllImages(import.meta.glob('./assets/icons/tiempo-weather/galeria6/*.png', { eager: true }));

//wind icons
//const wind_images1 = require.context("./assets/icons/viento-wind/galeria1", false);
//const icons_wind_galeria1 = wind_images1.keys().map(wind_image1 => wind_images1(wind_image1));
//const icons_wind_galeria1 = importAllImages(require.context('./assets/icons/viento-wind/galeria1', false, /\.(png)$/));
const icons_wind_galeria1 = importAllImages(import.meta.glob('./assets/icons/viento-wind/galeria1/*.png', { eager: true }));

//const wind_images2 = require.context("./assets/icons/viento-wind/galeria2-Beaufort", false);
//const icons_wind_galeria2 = wind_images2.keys().map(wind_image2 => wind_images2(wind_image2));
//const icons_wind_galeria2 = importAllImages(require.context('./assets/icons/viento-wind/galeria2-Beaufort', false, /\.(png)$/));
const icons_wind_galeria2 = importAllImages(import.meta.glob('./assets/icons/viento-wind/galeria2-Beaufort/*.png', { eager: true }));

//const wind_images3 = require.context("./assets/icons/viento-wind/Beaufort-White", false);
//const icons_wind_Beaufort = wind_images3.keys().map(wind_image3 => wind_images3(wind_image3));
//const icons_wind_Beaufort = importAllImages(require.context('./assets/icons/viento-wind/Beaufort-White', false, /\.(png)$/));
const icons_wind_Beaufort = importAllImages(import.meta.glob('./assets/icons/viento-wind/Beaufort-White/*.png', { eager: true }));

// moon icons
// fehlen noch


const setDataStructures = async (
    field: RxWidgetInfoAttributesField,
    data: WidgetData,
    changeData: (newData: WidgetData) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket: LegacyConnection
    // eslint-disable-next-line @typescript-eslint/require-await
): Promise<void> => {

    console.log(`set new datastructure instance ${data["instance"]} ${data["location"]}`);

    const instance = data["instance"] || "DasWetter.0";
    const day2show = data["day2show"] || "0";
    //const datastructure = data["datastructure"];
    //const iconlabelset = data["iconset"];
    //const windiconlabelset = data["windiconset"];
    const location = data["location"] || "Location_2"

    if (instance && instance.length > 0 && instance.includes("daswetter") && location && day2show) {
        const instance_part = instance;
        //const datastructure_part = datastructure;
        const location_part = location;
        let day_part = "Day_1";
        switch (day2show) {
            case "0": day_part = "Day_1"; break;
            case "1": day_part = "Day_2"; break;
            case "2": day_part = "Day_3"; break;
            case "3": day_part = "Day_4"; break;
            case "4": day_part = "Day_5"; break;
            default: day_part = "Day_1"; break;
        }

        /*
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
        */

        data["oid_dayname"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.NameOfDay`;
        data["oid_date"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.date`;
        data["oid_temp_max"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.Temperature_Max`;
        data["oid_temp_min"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.Temperature_Min`;
        data["oid_symbol_description"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.symbol_description`;
        data["oid_symbol"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.symbol`;
        data["oid_wind_symbol"] = "";
        data["oid_wind_value"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.Wind_Speed`;
        data["oid_windgusts_value"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.Wind_Gust`;
        data["oid_sunshine_duration"] = `${instance_part}.${location_part}.ForecastDaily.${day_part}.sunshineduration`;


        /*
        neue OID's ab DasWetter@4.x.x

        max. 5 Days
        verschiedene locations
        Wind-symbol wird nicht zur Verfügung gestellt

        daswetter.0.location_2.ForecastDaily.Day_1.NameOfDay
        daswetter.0.location_2.ForecastDaily.Day_1.date
        daswetter.0.location_2.ForecastDaily.Day_1.Temperature_Max
        daswetter.0.location_2.ForecastDaily.Day_1.Temperature_Min
        daswetter.0.location_2.ForecastDaily.Day_1.symbol_description
        daswetter.0.location_2.ForecastDaily.Day_1.symbol

        daswetter.0.location_2.ForecastDaily.Day_1.Wind_Speed
        daswetter.0.location_2.ForecastDaily.Day_1.Wind_Gust
        daswetter.0.location_2.ForecastDaily.Day_1.sunshineduration


        */
    }

    changeData(data);
};

interface StaticRxData {
    noCard: boolean;
    widgetTitle: string;
    instance: string; // name of instance, e.g. daswetter.0
    //datastructure: string; // name of datastructure, e.g. NextDaysDetailed
    day2show: string; // day to show, e.g. 0 for today, 1 for tomorrow, etc.
    iconset: string; // iconset to use, e.g. galeria1, galeria2, etc.
    windiconset: string; // wind iconset to use, e.g. galeria1, galeria2, Beaufort
    oid_dayname: string; // OID for day name, e.g. daswetter.0.NextHours.Location_1.Day_1.day_name
    oid_date: string; // OID for date, e.g. daswetter.0.NextHours.Location_1.Day_1.day_value
    oid_temp_max: string; // OID for max temperature, e.g. daswetter.0.NextHours.Location_1.Day_1.tempmax_value
    oid_temp_min: string; // OID for min temperature, e.g. daswetter.0.NextHours.Location_1.Day_1.tempmin_value
    oid_symbol_description: string; // OID for symbol description, e.g. daswetter.0.NextHours.Location_1.Day_1.symbol_desc
    oid_symbol: string; // OID for weather symbol, e.g. daswetter.0.NextHours.Location_1.Day_1.symbol_value
    oid_wind_symbol: string; // OID for wind symbol, e.g. daswetter.0.NextHours.Location_1.Day_1.wind_symbol
    oid_wind_value: string; // OID for wind value, e.g. daswetter.0.NextHours.Location_1.Day_1.wind_value
    oid_windgusts_value: string; // OID for wind gusts value, e.g. daswetter.0.NextHours.Location_1.Day_1.windgusts_value
    oid_sunshine_duration: string; // OID for sunshine duration, e.g. daswetter.0.NextHours.Location_1.Day_1.sunshineDuration
}

interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
}

export default class WeatherDayWidget extends Generic<StaticRxData, StaticState> {
    private readonly refCardContent: React.RefObject<HTMLDivElement | null> = React.createRef();
    private lastRxData: string | undefined;
    private updateTimeout: ReturnType<typeof setTimeout> | undefined;
    constructor(props: VisRxWidgetProps) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo(): RxWidgetInfo {
        return {
            id: "tplWeatherDayWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

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
                            adapter: ["daswetter", "weatherunderground"].join(","),
                            default: "daswetter.0",
                            onChange: setDataStructures,
                        },
                        {
                            name: "location",    // name in data structure
                            label: "location", // translated field label
                            type: "text",
                            default: "location_1",
                            onChange: setDataStructures,
                        },

                        /*
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
                                },
                            ],
                            default: "NextHours",
                            onChange: setDataStructures,
                        },
                        */
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
                    label: "OIDS", // group label
                    fields: [
                        {
                            name: "oid_dayname",    // name in data structure
                            label: "oiddayname", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.NameOfDay",
                        },
                        {
                            name: "oid_date",    // name in data structure
                            label: "oiddate", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.date",
                        },
                        {
                            name: "oid_temp_max",    // name in data structure
                            label: "oidtempmax", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.Temperature_Max",
                        },
                        {
                            name: "oid_temp_min",    // name in data structure
                            label: "oidtempmin", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.Temperature_Min",
                        },
                        {
                            name: "oid_symbol_description",    // name in data structure
                            label: "oidsymboldescription", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.symbol_description",
                        },
                        {
                            name: "oid_symbol",    // name in data structure
                            label: "oidsymbol", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.symbol",
                        },

                        {
                            name: "oid_wind_symbol",    // name in data structure
                            label: "oidwindsymbol", // translated field label
                            type: "id",
                            default: "",
                        },

                        {
                            name: "oid_wind_value",    // name in data structure
                            label: "oidwindvalue", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.Wind_Speed",
                        },
                        {
                            name: "oid_windgusts_value",    // name in data structure
                            label: "oidwindgustsvalue", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.Wind_Gust",
                        },
                        {
                            name: "oid_sunshine_duration",    // name in data structure
                            label: "oidsunshineduration", // translated field label
                            type: "id",
                            default: "daswetter.0.location_1.ForecastDaily.Day_1.sunshineduration",
                        },

                    ],
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-weatherday.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    getWidgetInfo(): RxWidgetInfo {
        return WeatherDayWidget.getWidgetInfo();
    }

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {

        //super.renderWidgetBody(props);
        const baseRender = (Generic.prototype as any).renderWidgetBody;
        if (typeof baseRender === 'function') {
            baseRender.call(this, props);
        }


        let size;
        //if (!this.refCardContent.current) {
        //    setTimeout(() => this.forceUpdate(), 50);
        //} else {
        if (this.refCardContent.current) {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`wdw chart: size ${size}`);

        const iconlabelset = this.state.rxData["iconset"];
        const windiconlabelset = this.state.rxData["windiconset"];

        //weather symbol
        const weather_icon = this.state.values[`${this.state.rxData["oid_symbol"]}.val`];

        let src_icon_weather = null;
        let src_icon_weather_name = "";

        //const tobj = Object.fromEntries(icons_weather_galeria1);
        //const tjson = JSON.stringify(tobj);
        //console.warn("icons_weather_galeria1 " + tjson);

        let weatherimage = icons_weather_galeria1["1"];

        src_icon_weather = weatherimage;
        src_icon_weather_name = weatherimage;

        //console.warn("1111");

        if (weather_icon != null && typeof weather_icon !== 'undefined') {

            //console.log("weather icon " + weather_icon + " / " + weather_icon.toString() + " / " + typeof weather_icon);


            switch (iconlabelset) {
                case "galeria1":
                    weatherimage = icons_weather_galeria1[weather_icon.toString()];
                    break;
                case "galeria2":
                    weatherimage = icons_weather_galeria2[weather_icon.toString()];
                    break;
                case "galeria3":
                    weatherimage = icons_weather_galeria3[weather_icon.toString()];
                    break;
                case "galeria4":
                    weatherimage = icons_weather_galeria4[weather_icon.toString()];
                    break;
                case "galeria5_white":
                    weatherimage = icons_weather_galeria5_white[weather_icon.toString()];
                    break;
                case "galeria5_color":
                    weatherimage = icons_weather_galeria5_color[weather_icon.toString()];
                    break;
                case "galeria6":
                    weatherimage = icons_weather_galeria6[weather_icon.toString()];
                    break;
                default:
                    console.warn("weather no iconlabelset found " + iconlabelset);
                    weatherimage = icons_weather_galeria1[weather_icon.toString()];
                    break;
            }
            if (weatherimage != null && typeof weatherimage !== 'undefined') {
                src_icon_weather = weatherimage;
                //src_icon_weather_name = weatherimage.name;
            } else {
                console.warn("weather image not found " + iconlabelset + " / " + weather_icon);
            }
        }



        console.log(`weather icon ${weather_icon} = ${src_icon_weather_name}  ` + typeof weather_icon);

        //wind symbol
        const wind_icon = this.state.values[`${this.state.rxData["oid_wind_symbol"]}.val`];

        let src_icon_wind = null;
        let src_icon_wind_name = "";

        //const tobj = Object.fromEntries(icons_wind_galeria1);
        //const tjson = JSON.stringify(tobj);
        //console.warn("icons_wind_galeria1 " + tjson);

        //console.warn("1111 " + windiconlabelset + "/ " + wind_icon);


        if (wind_icon != null && typeof wind_icon !== 'undefined') {

            let windimage = icons_wind_galeria1["1"];

            src_icon_wind = windimage;
            src_icon_wind_name = windimage;

            switch (windiconlabelset) {
                case "galeria1":
                    //src_icon_wind = icons_wind_galeria1[wind_icon];
                    windimage = icons_wind_galeria1[wind_icon.toString()];
                    break;
                case "galeria2":
                    //src_icon_wind = icons_wind_galeria2[wind_icon];
                    windimage = icons_wind_galeria2[wind_icon.toString()];
                    break;
                case "Beaufort":
                    //src_icon_wind = icons_wind_Beaufort[wind_icon];
                    windimage = icons_wind_Beaufort[wind_icon.toString()];
                    break;
                default:
                    console.warn("no windiconlabelset found " + windiconlabelset);
                    //src_icon_wind = icons_wind_galeria1[wind_icon];
                    windimage = icons_wind_galeria1[wind_icon.toString()];
                    break;
            }
            if (windimage != null && typeof windimage !== 'undefined') {
                src_icon_wind = windimage;
                //src_icon_wind_name = windimage.name;
            } else {
                console.warn("wind image not found " + windiconlabelset + " / " + wind_icon);
            }
        }

        console.log(`wind icon ${wind_icon} = ${src_icon_wind_name} ` + typeof wind_icon);

        const date = this.state.values[`${this.state.rxData["oid_date"]}.val`];

        const sundurationval = (this.state.values[`${this.state.rxData["oid_sunshine_duration"]}.val`]);
        console.log(`sunduration ${sundurationval}`);

        let sunduration = 0;
        if (sundurationval) {
            sunduration = Number(sundurationval);
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
                <Grid size={{ xs: 12 }} >
                    <div>
                        <p>{this.state.values[`${this.state.rxData["oid_dayname"]}.val`]}</p>
                        <p>{date}</p>
                    </div>
                </Grid>
                <Grid size={{ xs: 6 }} >
                    <div>
                        <img src={src_icon_weather} alt={src_icon_weather_name} ></img>
                    </div>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <div style={{ fontSize: "small" }}>
                        <p>{Generic.t("max")} {this.state.values[`${this.state.rxData["oid_temp_max"]}.val`]} °C</p>
                        <p>{Generic.t("min")} {this.state.values[`${this.state.rxData["oid_temp_min"]}.val`]} °C</p>
                    </div>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <div>
                        <p>{this.state.values[`${this.state.rxData["oid_symbol_description"]}.val`]}</p>
                    </div>
                </Grid>


                {
                    src_icon_wind != null ? (
                        <Grid size={{ xs: 6 }}>
                            <div>
                                <img src={src_icon_wind} alt={src_icon_wind_name}></img>
                            </div>
                        </Grid>
                    ) : (
                        <Grid size={{ xs: 6 }}>
                            <div>

                            </div>
                        </Grid>
                    )
                }


                <Grid size={{ xs: 6 }}>
                    <div style={{ fontSize: "small" }}>
                        <p>{Generic.t("Wind")} {this.state.values[`${this.state.rxData["oid_wind_value"]}.val`]} km/h</p>
                        <p>{Generic.t("WindGusts")} {this.state.values[`${this.state.rxData["oid_windgusts_value"]}.val`]} km/h</p>
                    </div>
                </Grid>
                <Grid size={{ xs: 6 }}>
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

        console.log("weatherday widget: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

