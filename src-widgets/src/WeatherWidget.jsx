import React from 'react';

import {
    Card, CardContent,
} from '@mui/material';

import ReactEchartsCore from 'echarts-for-react';

import { I18n } from '@iobroker/adapter-react-v5';

import Generic from './Generic'; 


const loadStates = async (field, data, changeData, socket) => {
    if (data[field.name]) {
        const object = await socket.getObject(data[field.name]);
        if (object && object.common) {
            const id = data[field.name].split('.');
            id.pop();
            const states = await socket.getObjectView(`${id.join('.')}.`, `${id.join('.')}.\u9999`, 'state');
            if (states) {
                const currentMediaTypes = [...mediaTypes];
                Object.values(states).forEach(state => {
                    const role = state?.common?.role?.match(/^(media\.mode|media|button|level)\.(.*)$/)?.[2];
                    if (role && currentMediaTypes.includes(role) && (!data[role] || data[role] === 'nothing_selected') && field !== role) {
                        currentMediaTypes.splice(currentMediaTypes.indexOf(role), 1);
                        data[role] = state._id;
                    }
                });
                changeData(data);
            }
        }
    }
};

const datachange = async (field, data, changeData, socket) => {

    console.log("datachange");

};



class WeatherWidget extends (Generic) {
    static getWidgetInfo() {

        let oid_rain_fields = [];
        let oid_temp_fields = [];
        let oid_cloud_fields = [];
        let oid_time_fields = [];
        let oid_general_fields = [];
        let cnt = 1;

        let max_days = 5;
        let max_periods = 8;

        for (var d = 1; d <= max_days; d++) {

            oid_general_fields.push(
                {
                    name: 'oid_general_day_' + d,    // name in data structure
                    label: 'widgets_weather_label_oid_general_day_' + d, // translated field label
                    type: 'id',
                    default: "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".day_value",
                }
            )

            for (var p = 1; p <= max_periods; p++) {

                oid_rain_fields.push(
                    {
                        name: 'oid_rain_' + cnt,    // name in data structure
                        label: 'widgets_weather_label_oid_rain_' + cnt, // translated field label
                        type: 'id',
                        default: "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".rain_value",
                    }
                );
                oid_temp_fields.push(
                    {
                        name: 'oid_temp_' + cnt,    // name in data structure
                        label: 'widgets_weather_label_oid_temp_' + cnt, // translated field label
                        type: 'id',
                        default: "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".temp_value",
                    }
                );
                oid_cloud_fields.push(
                    {
                        name: 'oid_cloud_' + cnt,    // name in data structure
                        label: 'widgets_weather_label_oid_cloud_' + cnt, // translated field label
                        type: 'id',
                        default: "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".clouds_value",
                    }
                );
                oid_time_fields.push(
                    {
                        name: 'oid_time_' + cnt,    // name in data structure
                        label: 'widgets_weather_label_oid_time_' + cnt, // translated field label
                        type: 'id',
                        default: "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".hour_value",
                    }
                );
                cnt++;
            }
        }


        return {
            id: 'tplWeatherWidget',                 // Unique widget type ID. Should start with `tpl` followed
            visSet: 'vis-2-widgets-weather',        // Unique ID of widget set 
            visSetLabel: 'vis-2-widgets-weather',   // Widget set translated label (should be defined only in one widget of set)
            visSetColor: '#cf00ff',                 // Color of widget set. it is enough to set color only in one widget of set
            visName: 'weather',                     // Name of widget
            visWidgetLabel: 'vis_2_widgets-weather', // Label of widget
            visWidgetColor: '#005cc4',               // Optional widget color. If not set, default color of widget set will be used.
            visResizeLocked: true,                   // require, that width is always equal to height
            visResizable: false,                     // widget is not resizable 
            visDraggable: false,                     // widget is not draggable 
            visAttrs: [
                {
                    // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
                    name: 'common', // group name
                    fields: [
                        {
                            name: 'instance',    // name in data structure
                            label: 'widgets_weather_label_instance', // translated field label
                            type: 'instance',

                            default: 'daswetter.0',
                        },
                        {
                            name: 'oid_location',    // name in data structure
                            label: 'widgets_weather_label_oidlocation', // translated field label
                            type: 'id',

                            default: 'daswetter.0.NextDaysDetailed.Location_1.Location',
                        },
                        {
                            name: 'datastructure',    // name in data structure
                            label: 'widgets_weather_label_datastructure', // translated field label
                            type: 'select',
                            options: [
                                {
                                    value: 'NextDaysDetailed',
                                    label: 'widgets_weather_label_datastructure_nextdaysdetailed'
                                },
                                {
                                    value: 'NextHours',
                                    label: 'widgets_weather_label_datastructure_nexthours'
                                },
                                {
                                    value: 'NextHours2',
                                    label: 'widgets_weather_label_datastructure_nexthours2'
                                }
                            ],
                            default: 'NextDaysDetailed',
                            onChange: datachange,
                        },
                    ],
                },
                {
                    name: 'rain', // group name
                    fields: [
                        {
                            name: 'rain_visible',    // name in data structure
                            label: 'widgets_weather_label_rain_visible', // translated field label
                            type: 'checkbox ',

                            default: false,
                            onChange: datachange,
                        },
                    ]
                },
                {
                    name: 'temperature', // group name
                    fields: [
                        {
                            name: 'temperature_visible',    // name in data structure
                            label: 'widgets_weather_label_temperature_visible', // translated field label
                            type: 'checkbox ',

                            default: false,
                            onChange: datachange,
                        },
                    ]
                },
                {
                    name: 'clouds', // group name
                    fields: [
                        {
                            name: 'clouds_visible',    // name in data structure
                            label: 'widgets_weather_label_clouds_visible', // translated field label
                            type: 'checkbox ',

                            default: false,
                            onChange: datachange,
                        },
                        {
                            name: 'sun_or_cloud',    // name in data structure
                            label: 'widgets_weather_label_sunorcloud', // translated field label
                            type: 'select',
                            options: [
                                {
                                    value: 'sun',
                                    label: 'widgets_weather_label_sunorcloud_sun'
                                },
                                {
                                    value: 'cloud',
                                    label: 'widgets_weather_label_sunorcloud_cloud'
                                },

                            ],
                            default: 'sun',
                            onChange: datachange,
                        },
                    ]
                },
                {
                    name: 'chanceofraining', // group name
                    fields: [
                        {
                            name: 'chanceofraining_visible',    // name in data structure
                            label: 'widgets_weather_label_chanceofraining_visible', // translated field label
                            type: 'checkbox ',

                            default: false,
                            onChange: datachange,
                        },
                    ]
                },
                {
                    name: 'OIDS_general', // group name
                    fields: oid_general_fields
                },
                {
                    name: 'OIDS_rain', // group name
                    fields: oid_rain_fields
                },
                {
                    name: 'OIDS_temp', // group name
                    fields: oid_temp_fields
                },
                {
                    name: 'OIDS_cloud', // group name
                    fields: oid_cloud_fields
                },
                {
                    name: 'OIDS_time', // group name
                    fields: oid_time_fields
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
        return WeatherWidget.getWidgetInfo();
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

        let weatherData = this.getWeatherData();

        console.log("##got " + JSON.stringify(weatherData));

        return {
            backgroundColor: 'transparent',
            title: {
                text: 'Test'
            },
            tooltip: {},
            legend: {
                data: ['rain', 'temperature', 'cloud']
            },
            xAxis: {
                type: "time",

                axisLabel: {

                    rotate: 45,
                    formatter: '{dd}.{MM}.{yy} {mm}:{hh}'
                }

            },
            yAxis: {},
            series: [
                {
                    name: 'rain',
                    type: 'bar',
                    data: weatherData[0].rainData,

                    //[5, 20, 36, 10, 10, 20]
                    /*
                        [
                            ['2024-3-27 02:00', 4.5],
                            ['2024-3-27 05:00', 2.3],
                            ['2024-3-27 08:00', 9.5],
                            ['2024-3-27 11:00', 8.8],
                            ['2024-3-27 14:00', 5.8],
                            ['2024-3-27 17:00', 6.8],
                            ['2024-3-27 20:00', 6.8],
                            ['2024-3-27 23:00', 8.8],

                            ['2024-3-28 02:00', 4.5],
                            ['2024-3-28 05:00', 2.3],
                            ['2024-3-28 08:00', 9.5],
                            ['2024-3-28 11:00', 8.8],
                            ['2024-3-28 14:00', 5.8],
                            ['2024-3-28 17:00', 6.8],
                            ['2024-3-28 20:00', 6.8],
                            ['2024-3-28 23:00', 8.8],

                            ['2024-3-29 02:00', 4.5],
                            ['2024-3-29 05:00', 2.3],
                            ['2024-3-29 08:00', 9.5],
                            ['2024-3-29 11:00', 8.8],
                            ['2024-3-29 14:00', 5.8],
                            ['2024-3-29 17:00', 6.8],
                            ['2024-3-29 20:00', 6.8],
                            ['2024-3-29 23:00', 8.8],

                            ['2024-3-30 02:00', 4.5],
                            ['2024-3-30 05:00', 2.3],
                            ['2024-3-30 08:00', 9.5],
                            ['2024-3-30 11:00', 8.8],
                            ['2024-3-30 14:00', 5.8],
                            ['2024-3-30 17:00', 6.8],
                            ['2024-3-30 20:00', 6.8],
                            ['2024-3-30 23:00', 8.8]
                        ]
                        */
                },
                {
                    name: 'temperature',
                    type: 'line',
                    data: weatherData[0].tempData,
                },
                {
                    name: 'cloud',
                    type: 'bar',
                    data: weatherData[0].cloudData,
                }
            ]
        };
    }




    getWeatherData() {

        console.log("getWeatherData " + this.state.rxData['datastructure']);

        let weatherData = [];
        if (this.state.rxData['datastructure'] == "NextDaysDetailed") {
            weatherData = this.getWeatherDataNextDaysDetailed();
        }
        else if (this.state.rxData['datastructure'] == "NextHours") {
            weatherData = this.getWeatherDataNextHours();
        }
        else if (this.state.rxData['datastructure'] == "NextHours2") {
            weatherData = this.getWeatherDataNextHours2();
        }
        else {
            console.log("getWeatherData: inknown data structure");
        }

        console.log("getWeatherData got " + JSON.stringify(weatherData));

        /*
        got data [[0,2,36,"02:00"],[0,2,69,"05:00"],[0,3,64,"08:00"],[0,6,97,"11:00"],[0,9,16,"14:00"],[0,8,60,"17:00"],[0,4,83,"20:00"],[0,2,55,"23:00"],[0,1,34,"02:00"],[0,0,58,"05:00"],[0,4,53,"08:00"],[0,9,91,"11:00"],[0,9,100,"14:00"],[0.1,8,100,"17:00"],[0.1,5,100,"20:00"],[0,5,51,"23:00"],[0,1,10,"02:00"],[0,0,38,"05:00"],[0,5,8,"08:00"],[0,10,53,"11:00"],[0,12,64,"14:00"],[0,11,74,"17:00"],[0,5,56,"20:00"],[0,6,49,"23:00"],[0,5,17,"01:00"],[0,4,24,"04:00"],[0,5,45,"07:00"],[0,12,42,"10:00"],[0,14,46,"13:00"],[0,14,50,"16:00"],[0,10,50,"19:00"],[0,8,49,"22:00"],[0,8,50,"01:00"],[0,8,28,"04:00"],[0,8,55,"07:00"],[0,13,72,"10:00"],[0,15,68,"13:00"],[0,16,30,"16:00"],[0,13,93,"19:00"],[0,11,100,"22:00"]]
        */

        return weatherData;
    }

    getWeatherDataNextDaysDetailed() {

        //const ids = [];
        const weatherData = [];
        let max_days = 5;
        let max_periods = 8;
        let instanceID = this.state.rxData['instance']

        const rainData = [];
        const tempData = [];
        const cloudData = [];

        console.log("getWeatherDataNextDaysDetailed " + instanceID);


        for (var d = 1; d <= max_days; d++) {

            console.log("day " + d);

            //daswetter.0.NextDaysDetailed.Location_1.Day_1.day_value
            const dayData = this.state.values[instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".day_value"];
            let year = 0;
            let month = 0;
            let day = 0;
            let hour = 0;
            let minute = 0;

            console.log("dayData " + JSON.stringify(dayData));

            if (dayData != null) {
                year = Number(dayData.val.substring(0, 4));
                month = Number(dayData.val.substring(4, 6));
                day = Number(dayData.val.substring(6, 8));
            }
            for (var p = 1; p <= max_periods; p++) {

                console.log("period " + p);

                //get rain oid
                //const rain_val = await this.props.context.socket.getState(instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".rain_value");
                const rain_val = this.state.values[instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".rain_value"];

                //get temperature oid
                //const temp_val = await this.props.context.socket.getState(instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".temp_value");
                const temp_val = this.state.values[instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".temp_value"];
                //get cloud oid
                //const cloud_val = await this.props.context.socket.getState(instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".clouds_value");
                const cloud_val = this.state.values[instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".clouds_value"];
                // get time oid
                //const time_val = await this.props.context.socket.getState(instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".hour_value");
                const time_val = this.state.values[instanceID + ".NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".hour_value"];

                console.log("got data " + JSON.stringify(rain_val) + " " + JSON.stringify(temp_val) + " " + JSON.stringify(cloud_val) + " " + JSON.stringify(time_val));

                //calc date
                let oDate = null;

                if (time_val != null && year > 0 && month > 0 && day > 0) {
                    let timeData = time_val.val.split(":");
                    hour = timeData[0];
                    minute = timeData[1];

                    oDate = new Date(year, month, day, hour, minute, 0, 0);
                }

                if (this.state.rxData['rain_visible'] == true && oDate != null && rain_val != null) {
                    rainData.push(
                        [
                            oDate,
                            rain_val.val
                        ]
                    );
                }

                if (this.state.rxData['temperature_visible'] == true && oDate != null && temp_val != null) {
                    tempData.push(
                        [
                            oDate,
                            temp_val
                        ]
                    );
                }
                if (this.state.rxData['clouds_visible'] == true && oDate != null && cloud_val != null) {

                    cloudData.push(
                        [
                            oDate,
                            cloud_val
                        ]
                    );
                }
                console.log("date " + JSON.stringify(oDate) + " " + year + "." + month + "." + day + " " + hour + ":" + minute);

            }
        }

        console.log("rainData " + JSON.stringify(rainData));
        console.log("tempData " + JSON.stringify(tempData));
        console.log("cloudData " + JSON.stringify(cloudData));

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        weatherData.push(
            [
                rainData,
                tempData,
                cloudData
            ]
        );

        return weatherData;
    }


    getWeatherDataNextHours() {

        //const ids = [];
        const weatherData = [];
        let max_days = 5;
        let max_periods = 24;
        let instanceID = this.state.rxData['instance']

        const rainData = [];
        const tempData = [];
        const cloudData = [];

        for (var d = 1; d <= max_days; d++) {

            //daswetter.0.NextHours.Location_1.Day_1.day_value
            const dayData = this.state.values[instanceID + ".NextHours.Location_1.Day_" + d + ".day_value"];
            const year = dayData.val.substring(0, 4);
            const month = dayData.val.substring(4, 6);
            const day = dayData.val.substring(6, 8);

            for (var p = 1; p <= max_periods; p++) {

                //get rain oid
                const rain_val = this.state.values[instanceID + ".NextHours.Location_1.Day_" + d + ".Hour_" + p + ".rain_value"];
                //get temperature oid
                const temp_val = this.state.values[instanceID + ".NextHours.Location_1.Day_" + d + ".Hour_" + p + ".temp_value"];
                //get cloud oid
                const cloud_val = this.state.values[instanceID + ".NextHours.Location_1.Day_" + d + ".Hour_" + p + ".clouds_value"];
                // get time oid
                const time_val = this.state.values[instanceID + ".NextHours.Location_1.Day_" + d + ".Hour_" + p + ".hour_value"];

                //console.log("got data " + JSON.stringify(rain_val.val) + " " + JSON.stringify(temp_val.val) + " " + JSON.stringify(cloud_val.val) + " " + JSON.stringify(time_val.val));

                //calc data 
                let timeData = time_val.val.split(":");
                let hour = timeData[0];
                let minute = timeData[1];

                let oDate = new Date(year, month, day, hour, minute, 0, 0);

                rainData.push(
                    [
                        oDate,
                        rain_val.val
                    ]
                );
                tempData.push(
                    [
                        oDate,
                        temp_val
                    ]
                );
                cloudData.push(
                    [
                        oDate,
                        cloud_val
                    ]
                )

                //console.log("date " + JSON.stringify(oDate) + " " + year + "." + month + "." + day + " " + hour + ":" + minute);
            }
        }

        //console.log("get data from " + JSON.stringify(rainData));

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        weatherData.push(
            [
                rainData,
                tempData,
                cloudData
            ]
        );

        return weatherData;
    }

    getWeatherDataNextHours2() {
        //const ids = [];
        const weatherData = [];
        let max_days = 5;
        let max_periods = 8;
        let instanceID = this.state.rxData['instance']

        const rainData = [];
        const tempData = [];
        const cloudData = [];

        for (var d = 1; d <= max_days; d++) {

            //daswetter.0.NextHours2.Location_1.Day_1.date
            const dayData = this.state.values[instanceID + ".NextHours2.Location_1.Day_" + d + ".date"];
            const year = dayData.val.substring(0, 4);
            const month = dayData.val.substring(4, 6);
            const day = dayData.val.substring(6, 8);

            for (var p = 1; p <= max_periods; p++) {

                //get rain oid
                const rain_val = this.state.values[instanceID + ".NextHours2.Location_1.Day_" + d + ".Hour_" + p + ".rain"];
                //get temperature oid
                const temp_val = this.state.values[instanceID + ".NextHours2.Location_1.Day_" + d + ".Hour_" + p + ".temp"];
                //get cloud oid
                const cloud_val = this.state.values[instanceID + ".NextHours2.Location_1.Day_" + d + ".Hour_" + p + ".clouds"];
                // get time oid
                const time_val = this.state.values[instanceID + ".NextHours2.Location_1.Day_" + d + ".Hour_" + p + ".hour"];

                //console.log("got data " + JSON.stringify(rain_val.val) + " " + JSON.stringify(temp_val.val) + " " + JSON.stringify(cloud_val.val) + " " + JSON.stringify(time_val.val));

                //calc data 
                let timeData = time_val.val.split(":");
                let hour = timeData[0];
                let minute = timeData[1];

                let oDate = new Date(year, month, day, hour, minute, 0, 0);

                rainData.push(
                    [
                        oDate,
                        rain_val.val
                    ]
                );
                tempData.push(
                    [
                        oDate,
                        temp_val
                    ]
                );
                cloudData.push(
                    [
                        oDate,
                        cloud_val
                    ]
                )

                //console.log("date " + JSON.stringify(oDate) + " " + year + "." + month + "." + day + " " + hour + ":" + minute);
            }
        }

        //console.log("get data from " + JSON.stringify(rainData));

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        weatherData.push(
            [
                rainData,
                tempData,
                cloudData
            ]
        );

        return weatherData;
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        console.log("values" + JSON.stringify(this.state.values));
        console.log("rxData " + JSON.stringify(this.state.rxData));

        return <Card style={{ width: '100%', height: '100%' }}>
            <CardContent>
                {I18n.t('Weather widget: ')}
                {this.state.values[`${this.state.rxData.oid}.val`]}
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

export default WeatherWidget;
