import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@mui/styles';

import { Card, CardContent } from '@mui/material';

import ReactEchartsCore from 'echarts-for-react';

import { I18n } from '@iobroker/adapter-react-v5';

import Generic from './Generic';

const styles = () => ({
    cardContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },
});


//todo Anpassunge aus Wetter widget übernehmen
//todo readme anpassen -> Beschreibung Widget und JSON Input
//todo JSON Input als Datenquelle
//todo mehrere Inputs unterstützen
//todo Übersetzungen

class GeneralEChartWidget extends (Generic) {

    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }


    static getWidgetInfo() {

       


        return {
            id: 'tplGeneralEChartWidget',                 // Unique widget type ID. Should start with `tpl` followed
            visSet: 'vis-2-widgets-weather',        // Unique ID of widget set

            //visset -> see WeatherWidget
            //visSetLabel: 'vis-2-widgets-weather',   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: '#cf00ff',                 // Color of widget set. it is enough to set color only in one widget of set
            visName: 'GeneralEChart',                     // Name of widget
            visWidgetLabel: 'vis_2_widgets-generalechart', // Label of widget
            visWidgetColor: '#005cc4',               // Optional widget color. If not set, default color of widget set will be used.
            visResizeLocked: false,                   // require, that width is always equal to height
            visResizable: true,                     // widget is not resizable 
            visDraggable: true,                     // widget is not draggable 
            visAttrs: [
                {
                    // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
                    name: 'common', // group name
                    fields: [
                        {
                            name: 'noCard',
                            label: 'without_card',
                            type: 'checkbox',
                        },
                       
                        {
                            name: 'headline',    // name in data structure
                            label: 'widgets_echart_label_headline', // translated field label
                            type: 'text',

                            default: 'headline',
                        },
                        
                    ],
                },
                {
                    name: 'data', // group name
                    fields: [
                        {
                            name: 'oid_data',    // name in data structure
                            label: 'widgets_echart_label_oiddata', // translated field label
                            type: 'id',

                            default: "",

                        },
                        {
                            name: 'data_color',    // name in data structure
                            label: 'widgets_echart_label_data_color', // translated field label
                            type: 'color',

                            default: "yellow",

                        },
                    ]
                },
                {
                    name: 'X_axis', // group name
                    fields: [
                        {
                            name: 'xaxis_axisLabel_formatstring',    // name in data structure
                            label: 'widgets_weather_label_xaxis_axisLabel_formatstring', // translated field label
                            type: 'text',

                            default: "{ee} {hh}:{mm}",

                        },
                    ]
                },
               

            ],
            visPrev: 'widgets/vis-2-test/img/vis-widget-echart.png',
        };
    }

    // eslint-disable-next-line class-methods-use-this
    propertiesUpdate() {
        // Widget has 3 important states
        // 1. this.state.values - contains all state values, that are used in widget (automatically collected from widget info).
        //                        So you can use `this.state.values[this.state.rxData.oid + '.val']` to get value of state with id this.state.rxData.oid
        // 2. this.state.rxData - contains all widget data with replaced bindings. E.g. if this.state.data.type is `{system.adapter.admin.0.alive}`,
        //                        then this.state.rxData.type will have state value of `system.adapter.admin.0.alive`
        // 3. this.state.rxStyle - contains all widget styles with replaced bindings. E.g. if this.state.styles.width is `{javascript.0.width}px`,
        //                        then this.state.rxData.type will have state value of `javascript.0.width` + 'px
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


        const data = this.state.values[`${this.state.rxData['oid_data']}.val`];

        console.log("data " + JSON.stringify(data));

        let dataMin = 0;
        let dataMax = 100;

        let legend = [];
        let yaxis = [];
        let series = []

        let headline = this.state.rxData["headline"];

        let cnt = 0;

        if (data && data.length>1) {

            legend.push("data");

            yaxis.push({
                position: "left",
                type: "value",
                min: dataMin,
                max: dataMax,
                axisLabel: {
                    formatter: '{value} '
                }
            });
            series.push({
                name: "data",
                type: 'bar',
                data: data,
                color: this.state.rxData['rain_color'] || "yellow",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' ';
                    }
                },
            });
            cnt++;
        }



        let useSecondDiagram = false;

        if (cnt == 0) {
            //add dummy data to show anything on screen

            console.log("add dummy data");

            legend.push(I18n.t('dummy'));
            yaxis.push({
                position: "left",
                type: "value",
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value} %'
                }
            });
            series.push({
                name: 'data',
                type: 'bar',
                data: [
                    ["2024-04-30T00:00:00.000Z", 10],
                    ["2024-04-30T03:00:00.000Z", 20],
                    ["2024-04-30T06:00:00.000Z", 20],
                    ["2024-04-30T09:00:00.000Z", 60]

                ],

                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' %';
                    }
                },
            });



        }



        //console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));




        let content = {
            backgroundColor: 'transparent',
            title: {
                text: headline,
            },
            grid: {
                show: true,
                top: 30,
                bottom: useSecondDiagram ? 30 : 60,
                //backgroundColor: '#F5F5F5',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend,
                orient: 'horizontal',
                right: 10,
                //top: 'center',
            },
            xAxis: {
                type: "time",
                show: useSecondDiagram ? false : true,
                axisLabel: {

                    rotate: 45,
                    //todo format einstellbar
                    formatter: '{ee} {hh}:{mm}',
                    //formatter: axisLabel_formatstring,
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
                theme={this.props.themeType === 'dark' ? 'dark' : ''}
                style={{ height: `${size}px`, width: '100%' }}
                opts={{ renderer: 'svg' }}
            />}
        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("echart: wrap content");

        return this.wrapContent(content, null, { textAlign: 'center' });
    }
}

GeneralEChartWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default withStyles(styles)(withTheme(GeneralEChartWidget));

