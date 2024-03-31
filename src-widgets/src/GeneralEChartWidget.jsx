import React from 'react';

import {
    Card, CardContent,
} from '@mui/material';

import ReactEchartsCore from 'echarts-for-react';

import { I18n } from '@iobroker/adapter-react-v5';

import Generic from './Generic'; 







class GeneralEChartWidget extends (Generic) {
    static getWidgetInfo() {

       


        return {
            id: 'tplGeneralEChartWidget',                 // Unique widget type ID. Should start with `tpl` followed
            visSet: 'vis-2-widgets-generalechart',        // Unique ID of widget set 
            visSetLabel: 'vis-2-widgets-generalechart',   // Widget set translated label (should be defined only in one widget of set)
            visSetColor: '#cf00ff',                 // Color of widget set. it is enough to set color only in one widget of set
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
                            name: 'oid_data',    // name in data structure
                            label: 'widgets_weather_label_oiddata', // translated field label
                            type: 'id',

                            default: '',
                        },
                        
                    ],
                },
               

            ],
            visPrev: 'widgets/vis-2-test/img/vis-widget-weather.png',
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

        

        //todo Farbe der Graphen einstellbar

        return {
            backgroundColor: 'transparent',
            title: {
                text: headline
            },
            tooltip: {},
            legend: {
                data: legend
            },
            xAxis: {
                type: "time",

                axisLabel: {

                    rotate: 45,
                    //todo format einstellbar
                    formatter: '{ee} {hh}:{mm}'
                }

            },
            yAxis: [
                {
                    position: "left",
                    type: "value",
                    //todo: min max berechnen
                    min: -20,
                    max: 30,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                
            ],
            series: [
                {
                    name: 'rain',
                    type: 'bar',
                    data: [
                        [0, 0],
                        [0,1]
                    ],
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' mm';
                        }
                    },
                },
                
            ]
        };
    }




   

    renderWidgetBody(props) {
        super.renderWidgetBody(props);




        return <Card style={{ width: '100%', height: '100%' }}>
            <CardContent>
                {I18n.t('EChart widget: ')}
                {
                    <ReactEchartsCore
                        option={this.getOption()}
                        theme={'dark'}
                        style={{ height: `100%`, width: '100%' }}
                        opts={{ renderer: 'svg' }}
                    />
                }
            </CardContent>
        </Card>;
    }
}

export default GeneralEChartWidget;
