import React from 'react';
import {
    Card, CardContent,
} from '@mui/material';

import ReactEchartsCore from 'echarts-for-react';

import { I18n } from '@iobroker/adapter-react-v5';
import { VisRxWidget } from '@iobroker/vis-2-widgets-react-dev';

class WeatherWidget extends (window.visRxWidget || VisRxWidget) {
    static getWidgetInfo() {
        return {
            id: 'tplWeatherWidget',
            visSet: 'vis-2-widgets-weather',
            visSetLabel: 'vis-2-widgets-weather', // Widget set translated label (should be defined only in one widget of set)
            visSetColor: '#cf00ff',                // Color of widget set. it is enough to set color only in one widget of set
            visName: 'weather',                 // Name of widget
            visAttrs: [
                {
                    name: 'common', // group name
                    fields: [
                        {
                            name: 'type',    // name in data structure
                            label: 'vis_2_widgets_template_type', // translated field label
                            type: 'select',
                            options: ['all', 'current', 'days'],
                            default: 'all',
                        },
                        {
                            name: 'test input',    // name in data structure
                            label: 'vis_2_test', // translated field label
                            type: 'text',
                            default: 'just test',
                        },
                    ],
                },
                {
                    name: 'private', // group name
                    label: 'vis_2_widgets_template_private', // translated group label
                    fields: [
                        {
                            name: 'oid',     // name in data structure
                            type: 'id',
                            label: 'vis_2_widgets_template_oid', // translated field label
                        },
                    ],
                },
                // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
            ],
            visPrev: 'widgets/vis-2-test/img/vis-widget-demo.png',
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

    componentDidMount() {
        super.componentDidMount();

        // Update data
        this.propertiesUpdate();
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return WeatherWidget.getWidgetInfo();
    }

    // This function is called every time when rxData is changed
    onRxDataChanged() {
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
        const data = [];
        for (let i = 1; i <= this.state.rxData.devicesCount; i++) {
            data.push({
                name: this.state.rxData[`name${i}`] || '',
                value: this.state.values[`${this.state.rxData[`oid${i}`]}.val`] || '',
                values: this.state[`history${i}`] || [],
                color: this.state.rxData[`color${i}`] || '',
            });
        }

        const timeTypes = {
            year: 'MMM',
            month: 'DD.MM',
            week: 'ddd',
            day: 'HH:00',
        };

        const textStyle = {
            color: this.props.context.themeType === 'dark' ? '#ddd' : '#222',
        };

        return {
            backgroundColor: 'transparent',
            tooltip: {},
            legend: {
                data: data.map(item => ({
                    name: item.name,
                    textStyle,
                })),
            },
            toolbox: {
                feature: {
                    magicType: {
                        type: ['stack'],
                    },
                    dataView: {},
                },
            },
            grid: {
                containLabel: true,
                left: 10,
                top: 40,
                right: 10,
                bottom: 10,
            },
            yAxis: {},
            xAxis: {
                type: 'category',
                data: data?.[0]?.values?.map(dateValue => moment(dateValue.ts).format(
                    timeTypes[this.getTimeInterval()],
                )),
            },
            series: data.map(item => (
                {
                    type: 'bar',
                    name: item.name,
                    itemStyle: {
                        color: item.color,
                    },
                    data: item.values?.map(dateValue => dateValue.val),
                    stack: 'one',
                }
            )),
        };
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        return <Card style={{ width: '100%', height: '100%' }}>
            <CardContent>
                {I18n.t('Weather widget: ')}
                {this.state.values[`${this.state.rxData.oid}.val`]}
                {
                    <ReactEchartsCore
                    option={this.getOption()}
                    theme={ 'dark' }
                    style={{ height: `100%`, width: '100%' }}
                    opts={{ renderer: 'svg' }}
                    />
                }
            </CardContent>
        </Card>;
    }
}

export default WeatherWidget;
