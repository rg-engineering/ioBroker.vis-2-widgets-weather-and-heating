import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@mui/styles";

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

//todo für sbfspot und ebus anpassen

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

                            default: "{ee} {hh}:{mm}",

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
        //todo XAchse einstellbar

        console.log("getOption 1");
        
        let dataMin = 0;
        let dataMax = 100;

        const legend = [];
        const yaxis = [];
        const series = [];

        const headline = this.state.rxData["headline"];

        let cnt = 0;

        console.log("getOption 2");

        /*
        gechart values{ "sbfspot.0.2000562095.history.years.val": "[{\"year\":\"2008\",\"value\":7000},{\"year\":\"2009\",\"value\":2309000},{\"year\":\"2010\",\"value\":4445000},{\"year\":\"2011\",\"value\":7019000},{\"year\":\"2012\",\"value\":9371000},{\"year\":\"2013\",\"value\":11393000},{\"year\":\"2014\",\"value\":13666000},{\"year\":\"2015\",\"value\":16034000},{\"year\":\"2016\",\"value\":17826790}]", "sbfspot.0.2000562095.history.years.ack": true, "sbfspot.0.2000562095.history.years.ts": 1660977902396, "sbfspot.0.2000562095.history.years.q": 0, "sbfspot.0.2000562095.history.years.from": "system.adapter.sbfspot.0", "sbfspot.0.2000562095.history.years.user": "system.user.admin", "sbfspot.0.2000562095.history.years.lc": 1660725002668 } src_GeneralEChartWidget_jsx.8424614c.chunk.js: 1: 2855
        gechart rxData { "bindings": [], "oid_data": "sbfspot.0.2000562095.history.years", "g_common": true, "headline": "head", "xaxis_axisLabel_formatstring": "undefined undefined:undefined", "g_X_axis": true, "noCard": false, "dataCount": "1", "oid_data1": "sbfspot.0.2000562095.history.years", "data_color1": "yellow", "g_data-1": true }
        */

        for (let d = 1; d <= this.state.rxData["dataCount"]; d++) {

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
                //todo x Achse labe format einstellbar
                //todo y achse unit einstellbar -> testen
                //todo x achse unit einstellbar
                //todo x achse type (tome or category) einstellbar
                //todo option: diff aus aufeinander folgenden werten berechnen -> testen
                //todo autoumrechnung w -> kW usw. ???
                //todo keys einstellbar
                //todo einstellbares format (reine liste, oder object liste)

            }

            if (data && data.length > 0) {

                legend.push("data" + d);

                const keys = Object.keys(data[0]);
                console.log("keys " + keys);

                const type_id = "data_seriestype" + d;
                const type = this.state.rxData[type_id];
                const color_id = "data_color" + d;
                const color = this.state.rxData[color_id];

                series.push({
                    name: "data",
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
            const unit = this.state.rxData[unit_id];
            const yaxispos_id = "data_yaxispos" + d;
            const yaxispos = this.state.rxData[yaxispos_id];

            yaxis.push({
                position: yaxispos,
                show: yaxispos==="none" ? false : true,
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
                        return value ;
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
                    //todo format einstellbar
                    formatter: "{yyyy}",
                    //formatter: axisLabel_formatstring,
                }

            },

            yAxis: yaxis,

            series: series,
        };

        console.log("options: " + JSON.stringify(content));

        return content;
    }
    /*

    options: {"backgroundColor":"transparent","title":{"text":"head"},"grid":{"show":true,"top":30,"bottom":60},"tooltip":{"trigger":"axis"},"legend":{"data":["data1"],"orient":"horizontal","right":10},"xAxis":{"type":"time","show":true,"axisLabel":{"rotate":45,"formatter":"{yy}"}},"yAxis":[{"position":"left","type":"value","min":0,"max":17826790,"axisLabel":{"formatter":"{value} undefined"}}],"series":[{"name":"data","type":"bar","data":[["2008-06-30T10:00:00.000Z",7000],["2009-06-30T10:00:00.000Z",2309000],["2010-06-30T10:00:00.000Z",4445000],["2011-06-30T10:00:00.000Z",7019000],["2012-06-30T10:00:00.000Z",9371000],["2013-06-30T10:00:00.000Z",11393000],["2014-06-30T10:00:00.000Z",13666000],["2015-06-30T10:00:00.000Z",16034000],["2016-06-30T10:00:00.000Z",17826790]],"color":"yellow","yAxisIndex":0,"tooltip":{}}]}
    */

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

