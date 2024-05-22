import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@mui/styles";

import moment from "moment";

//import { Card, CardContent } from "@mui/material";

import ReactEchartsCore from "echarts-for-react";

import { I18n } from "@iobroker/adapter-react-v5";

import Generic from "./Generic";

const styles = () => ({
    cardContent: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
});

//todo Auto-Kalkulation mit Unit k, M, m ...
//todo Dummy-Y Achse wird nicht gelöscht, wenn relae Daten kommen

//todo wenn keine Eineit angegeben, wird "null" angezeigt

//todo für sbfspot und ebus anpassen

const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure " + data["dataCount"] + " " + JSON.stringify(field) + " " + JSON.stringify(data));

    for (let d = 1; d <= data["dataCount"]; d++) {

        const instance_name = "instance" + d;
        const instance = data[instance_name];


        if (instance.indexOf("sbfspot") > -1) {

            console.log("we are in sbfspot " + instance);

            //todo OID setzen, X Achse Format setzen


            let formatstring = "";

            const datastructure_sbfspot_name = "datastructure_sbfspot" + d;
            const datastructure_sbfspot = data[datastructure_sbfspot_name];

            const datastructure_sbfspot_serial_name = "datastructure_sbfspot_serialnumber" + d;
            const datastructure_sbfspot_serial = data[datastructure_sbfspot_serial_name];


            let oid_data = instance + "." + datastructure_sbfspot_serial + ".history.";

            console.log("we are in sbfspot " + instance + " " + datastructure_sbfspot);

            if (datastructure_sbfspot === "today") {
                oid_data = oid_data + "today";
                formatstring = "HH:mm";
            }
            else if (datastructure_sbfspot === "last30Days") {
                oid_data = oid_data + "last30Days";
                formatstring = "DD.MM";
            }
            else if (datastructure_sbfspot === "last12Months") {
                oid_data = oid_data + "last12Months";
                formatstring = "DD.MM";
            }
            else if (datastructure_sbfspot === "years") {
                oid_data = oid_data + "years";
                formatstring = "YYYY";
            }

            //sbfspot.0.2000562095.history.today
            //sbfspot.0.2000562095.history.last30Days
            //sbfspot.0.2000562095.history.last12Months
            //sbfspot.0.2000562095.history.years


            console.log("new " + oid_data + " " + formatstring);

            data["oid_data" + d] = oid_data;

            data["xaxis_axisLabel_formatstring"] = formatstring;


        }
        else if (instance.indexOf("ebus") > -1) {



            //todo OID setzen, X Achse Format setzen

            let oid_data = instance + ".history.";
            let formatstring = "";

            const datastructure_ebus_name = "datastructure_ebus" + d;
            const datastructure_ebus = data[datastructure_ebus_name];

            console.log("we are in ebus " + instance + " " + datastructure_ebus);

            if (datastructure_ebus === "value1") {
                oid_data = oid_data + "value1";
                formatstring = "ddd HH:mm";
            }
            else if (datastructure_ebus === "value2") {
                oid_data = oid_data + "value2";
                formatstring = "ddd HH:mm";
            }
            else if (datastructure_ebus === "value3") {
                oid_data = oid_data + "value3";
                formatstring = "ddd HH:mm";
            }
            else if (datastructure_ebus === "value4") {
                oid_data = oid_data + "value4";
                formatstring = "ddd HH:mm";
            }
            //ebus.0.history.value1
            //ebus.0.history.value2
            //ebus.0.history.value3
            //ebus.0.history.value4
            //ebus.0.history.value5

            console.log("new " + oid_data + " " + formatstring);

            data["oid_data" + d] = oid_data;

            data["xaxis_axisLabel_formatstring"] = formatstring;

        }
        else {
            //do nothing
            console.log("do nothing for " + instance);
        }
    }


    changeData(data);
};


class GeneralEChartWidget extends (Generic) {

    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo() {

        return {
            id: "tplGeneralEChartWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather",        // Unique ID of widget set

            //visset -> see WeatherWidget
            //visSetLabel: "vis-2-widgets-weather",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "GeneralEChart",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-generalechart", // Label of widget
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
                            name: "headline",    // name in data structure
                            label: "widgets_echart_label_headline", // translated field label
                            type: "text",

                            default: "headline",
                        },
                        {
                            name: "dataCount",
                            type: "number",
                            label: "widgets_echart_label_datacount",
                            default: 1,
                        },

                    ],
                },
                {
                    name: "data", // group name
                    label: "data",
                    indexFrom: 1,
                    indexTo: "dataCount",
                    fields: [

                        {
                            name: "name",    // name in data structure
                            label: "widgets_weather_label_name", // translated field label
                            type: "text",
                            default: "serie",
                        },

                        {
                            name: "instance",    // name in data structure
                            label: "widgets_weather_label_instance", // translated field label
                            type: "instance",
                            default: "",
                            onChange: setDataStructures,
                        },

                        {
                            name: "datastructure_ebus",    // name in data structure
                            label: "widgets_echart_datastructure_ebus", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "value1",
                                    label: "widgets_echart_datastructure_ebus_value1"
                                },
                                {
                                    value: "value2",
                                    label: "widgets_echart_datastructure_ebus_value2"
                                },
                                {
                                    value: "value3",
                                    label: "widgets_echart_datastructure_ebus_value3"
                                },
                                {
                                    value: "value4",
                                    label: "widgets_echart_datastructure_ebus_value4"
                                }],
                            default: "value1",
                            onChange: setDataStructures,
                            hidden: (data, index) => {
                                console.log("???? " + JSON.stringify(data) + " " + JSON.stringify(index));
                                return data[`instance${index}`].indexOf("ebus") < 0;
                            }
                        },

                        {
                            name: "datastructure_sbfspot",    // name in data structure
                            label: "widgets_echart_datastructure_sbfspot", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "today",
                                    label: "widgets_echart_datastructure_sbfspot_today"
                                },
                                {
                                    value: "last30Days",
                                    label: "widgets_echart_datastructure_sbfspot_last30days"
                                },
                                {
                                    value: "last12Months",
                                    label: "widgets_echart_datastructure_sbfspot_last12months"
                                },
                                {
                                    value: "years",
                                    label: "widgets_echart_datastructure_sbfspot_years"
                                }],
                            default: "today",
                            onChange: setDataStructures,
                            hidden: (data, index) => {
                                console.log("???? " + JSON.stringify(data) + " " + JSON.stringify(index));
                                return data[`instance${index}`].indexOf("sbfspot") < 0;
                            }
                        },

                        {
                            name: "datastructure_sbfspot_serialnumber",    // name in data structure
                            label: "widgets_echart_datastructure_sbfspot_serialnumber", // translated field label
                            type: "text",
                            default: "",
                            onChange: setDataStructures,
                            hidden: (data, index) => {
                                console.log("???? " + JSON.stringify(data) + " " + JSON.stringify(index));
                                return data[`instance${index}`].indexOf("sbfspot") < 0;
                            }
                        },

                        {
                            name: "oid_data",    // name in data structure
                            label: "widgets_echart_label_oiddata", // translated field label
                            type: "id",
                            default: "",
                        },
                        {
                            name: "data_seriestype",    // name in data structure
                            label: "widgets_echart_data_seriestype", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "bar",
                                    label: "widgets_echart_seriestype_bar"
                                },
                                {
                                    value: "line",
                                    label: "widgets_echart_seriestype_line"
                                }],
                            default: "bar",
                        },
                        {
                            name: "data_unit",    // name in data structure
                            label: "widgets_echart_data_unit", // translated field label
                            type: "text",
                            default: "",
                        },
                        {
                            name: "data_color",    // name in data structure
                            label: "widgets_echart_data_color", // translated field label
                            type: "color",

                            default: "yellow",

                        },
                        {
                            name: "data_yaxispos",    // name in data structure
                            label: "widgets_echart_data_yaxispos", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "none",
                                    label: "widgets_echart_data_yaxispos_none"
                                },
                                {
                                    value: "left",
                                    label: "widgets_echart_data_yaxispos_left"
                                },
                                {
                                    value: "right",
                                    label: "widgets_echart_data_yaxispos_right"
                                }],
                            default: "left",
                        },
                        {
                            name: "data_calcdiff",    // name in data structure
                            label: "widgets_echart_data_calcdiff", // translated field label
                            type: "checkbox",

                            default: "false",

                        },
                    ]
                },
                {
                    name: "X_axis", // group name
                    fields: [
                        {
                            name: "xaxis_axisLabel_formatstring",    // name in data structure
                            label: "widgets_weather_label_xaxis_axisLabel_formatstring", // translated field label
                            type: "text",

                            default: "ddd HH:mm",

                        },
                    ]
                },


            ],
            visPrev: "widgets/vis-2-widgets-weather/img/vis-widget-echart.png",
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
        return GeneralEChartWidget.getWidgetInfo();
    }

    // This function is called every time when rxData is changed
    async onRxDataChanged() {

        this.propertiesUpdate();
    }

    // This function is called every time when rxStyle is changed
    // eslint-disable-next-line class-methods-use-this
    onRxStyleChanged() {

    }

    // This function is called every time when some Object State updated, but all changes lands into this.state.values too
    // eslint-disable-next-line class-methods-use-this, no-unused-vars
    onStateUpdated(id, state) {

    }

    /**
     *
     * @returns {echarts.EChartsOption}
     */
    getOption() {

        //todo legende von den einstellungen

        //todo Farbe der Graphen einstellbar

        //todo serien einstellbar


        console.log("getOption 1");

        let dataMin = 0;
        let dataMax = 100;

        const legend = [];
        const yaxis = [];
        const series = [];

        const headline = this.state.rxData["headline"];

        let cnt = 0;

        const axisLabel_formatstring = this.state.rxData["xaxis_axisLabel_formatstring"];

        for (let d = 1; d <= this.state.rxData["dataCount"]; d++) {

            const name_name =  "name" + d;
            let name = this.state.rxData[name_name];
            let OID_name = "oid_data" + d;
            const OID = this.state.rxData[OID_name];
            const OID_val = OID + ".val";
            const data_org1 = this.state.values[OID_val];

            console.log("data" + d + " :  " + OID_name + OID + " " + OID_val + " " + JSON.stringify(data_org1));

            const data = [];

            /*
            sbfspot.0.2000562095.history.years.val "[
                {\"year\":\"2008\",\"value\":7000},
                {\"year\":\"2009\",\"value\":2309000},
                {\"year\":\"2010\",\"value\":4445000},
                {\"year\":\"2011\",\"value\":7019000},
                {\"year\":\"2012\",\"value\":9371000},
                {\"year\":\"2013\",\"value\":11393000},
                {\"year\":\"2014\",\"value\":13666000},
                {\"year\":\"2015\",\"value\":16034000},
                {\"year\":\"2016\",\"value\":17826790}]"

            vs

            options: {
            
            "series":[{"name":"sun","type":"bar",
            "data":[
                ["2024-04-13T00:00:00.000Z",42],
                ["2024-04-13T03:00:00.000Z",34],
                ["2024-04-13T06:00:00.000Z",63],
                ["2024-04-13T09:00:00.000Z",45],
                ["2024-04-13T12:00:00.000Z",51],
                ["2024-04-13T15:00:00.000Z",50],
                ["2024-04-13T18:00:00.000Z",50],
                ["2024-04-13T21:00:00.000Z",50]]

                */

            if (data_org1 && data_org1.length > 1) {

                const data_org = JSON.parse(data_org1);

                let lastval4diff = 0;

                for (let i = 0; i < data_org.length; i++) {

                    const oVals = data_org[i];

                    //todo keys einstellbar
                    const year = parseInt(oVals["year"], 10);
                    let value = parseInt(oVals["value"], 10);

                    const oDate = new Date(year, 5, 30, 12, 0, 0, 0);


                    OID_name = "data_calcdiff" + d;

                    if (this.state.rxData[OID_name]) {
                        if (i === 0) {
                            lastval4diff = value;
                        }
                        else {
                            const newvalue = value - lastval4diff;
                            lastval4diff = value;
                            value = newvalue;
                        }
                    }

                    if (value < dataMin) { dataMin = value; }
                    if (value > dataMax) { dataMax = value; }

                    console.log("push # " + year + " " + value);
                    data.push(
                        [
                            oDate,
                            value
                        ]
                    );
                }

                //todo min max berechnen -> testen
                //todo type einstellbar -> testen

                //todo y achse unit einstellbar -> testen
                //todo x achse unit einstellbar
                //todo x achse type (time or category) einstellbar
                //todo option: diff aus aufeinander folgenden werten berechnen -> testen
                //todo autoumrechnung w -> kW usw. ???
                //todo keys einstellbar
                //todo einstellbares format (reine liste, oder object liste)

            }


            


            if (data && data.length > 0) {

                if (name === null || name === undefined) {
                    name = "serie " + d;
                }


                legend.push(name);

                const keys = Object.keys(data[0]);
                console.log("keys " + keys);

                const type_id = "data_seriestype" + d;
                const type = this.state.rxData[type_id];
                const color_id = "data_color" + d;
                const color = this.state.rxData[color_id];

                series.push({
                    name: name,
                    type: type,
                    data: data,
                    color: color,
                    yAxisIndex: cnt,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + " ";
                        }
                    },
                });
                cnt++;
            }

            const unit_id = "data_unit" + d;
            let unit = this.state.rxData[unit_id];
            if (unit === null || unit === undefined) {
                unit = "";
            }

            const yaxispos_id = "data_yaxispos" + d;
            let yaxispos = this.state.rxData[yaxispos_id];
            if (yaxispos === null || yaxispos === undefined) {
                yaxispos = "left";
            }


            yaxis.push({
                position: yaxispos,
                show: yaxispos === "none" ? false : true,
                type: "value",
                min: dataMin,
                max: dataMax,
                axisLabel: {
                    formatter: function (value) {
                        return value + " " + unit;
                    }

                }
            });
        }

        const useSecondDiagram = false;

        if (cnt === 0) {
            //add dummy data to show anything on screen

            console.log("add dummy data");

            legend.push(I18n.t("dummy"));
            yaxis.push({
                position: "left",
                type: "value",
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: function (value) {
                        return value;
                    }
                }
            });
            series.push({
                name: "data",
                type: "bar",
                data: [
                    ["2024-04-30T00:00:00.000Z", 10],
                    ["2024-04-30T03:00:00.000Z", 20],
                    ["2024-04-30T06:00:00.000Z", 20],
                    ["2024-04-30T09:00:00.000Z", 60]

                ],

                tooltip: {
                    valueFormatter: function (value) {
                        return value + " %";
                    }
                },
            });
        }

        //console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));
        const content = {
            backgroundColor: "transparent",
            title: {
                text: headline,
            },
            grid: {
                show: true,
                top: 30,
                bottom: useSecondDiagram ? 30 : 60,
                //backgroundColor: "#F5F5F5",
            },
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: legend,
                orient: "horizontal",
                right: 10,
                //top: "center",
            },
            xAxis: {
                type: "time",
                show: useSecondDiagram ? false : true,
                axisLabel: {

                    rotate: 45,
                    formatter: function (value, index) {
                        //http://momentjs.com/docs/#/displaying/format/
                        let formatstring = "ddd HH:mm";
                        if (axisLabel_formatstring !== null && axisLabel_formatstring !== undefined && axisLabel_formatstring.length > 2) {
                            formatstring = axisLabel_formatstring;
                        }
                        const date = moment(value).format(formatstring);
                        return date;
                    }


                }

            },

            yAxis: yaxis,

            series: series,
        };

        console.log("options: " + JSON.stringify(content));

        return content;
    }


    renderWidgetBody(props) {
        super.renderWidgetBody(props);


        console.log("gechart values" + JSON.stringify(this.state.values));
        console.log("gechart rxData " + JSON.stringify(this.state.rxData));

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log("echart: size " + size);


        const content = <div
            ref={this.refCardContent}
            className={this.props.classes.cardContent}
        >
            {size && <ReactEchartsCore
                option={this.getOption()}
                theme={this.props.themeType === "dark" ? "dark" : ""}
                style={{ height: `${size}px`, width: "100%" }}
                opts={{ renderer: "svg" }}
            />}
        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("echart: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

GeneralEChartWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default withStyles(styles)(withTheme(GeneralEChartWidget));

