import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@mui/styles';

import Grid from '@mui/material/Grid';


import { Card, CardContent } from '@mui/material';

import { I18n } from '@iobroker/adapter-react-v5';

import Generic from './Generic';

const styles = () => ({
    cardContent: {
        flex: 1,
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },

    

});

//weather icons

const images1 = require.context('./assets/icons/tiempo-weather/galeria1', false);
const icons_weather_galeria1 = images1.keys().map(image1 => images1(image1));

const images2 = require.context('./assets/icons/tiempo-weather/galeria2', false);
const icons_weather_galeria2 = images2.keys().map(image2 => images2(image2));

const images3 = require.context('./assets/icons/tiempo-weather/galeria3', false);
const icons_weather_galeria3 = images3.keys().map(image3 => images3(image3));

const images4 = require.context('./assets/icons/tiempo-weather/galeria4', false);
const icons_weather_galeria4 = images4.keys().map(image4 => images4(image4));

const images5_color = require.context('./assets/icons/tiempo-weather/galeria5/PNG/Color', false);
const icons_weather_galeria5_color = images5_color.keys().map(image5_color => images5_color(image5_color));

const images5_white = require.context('./assets/icons/tiempo-weather/galeria5/PNG/White', false);
const icons_weather_galeria5_white = images5_white.keys().map(image5_white => images5_white(image5_white));

const images6 = require.context('./assets/icons/tiempo-weather/galeria6', false);
const icons_weather_galeria6 = images6.keys().map(image6 => images6(image6));


//wind icons
const wind_images1 = require.context('./assets/icons/viento-wind/galeria1', false);
const icons_wind_galeria1 = wind_images1.keys().map(wind_image1 => wind_images1(wind_image1));

const wind_images2 = require.context('./assets/icons/viento-wind/galeria2-Beaufort', false);
const icons_wind_galeria2 = wind_images2.keys().map(wind_image2 => wind_images2(wind_image2));


const wind_images3 = require.context('./assets/icons/viento-wind/Beaufort-White', false);
const icons_wind_Beaufort = wind_images3.keys().map(wind_image3 => wind_images3(wind_image3));


//moon icons
//todo



//todo tag auswahl setzt OID's neu -> testen
//todo mondphase anzeigen

const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure instance" + data['instance'] + " " + data['datastructure']);

    const instance = data['instance'];
    const day2show = data['day2show'];
    const datastructure = data['datastructure'];
    const iconlabelset = data['iconset'];
    const windiconlabelset = data['windiconset'];


    if (instance && instance.length > 0 && instance.includes("daswetter") && datastructure && day2show) {


        const inctance_part = instance;
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


        data['oid_dayname'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.day_name';
        data['oid_date'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.day_value';
        data['oid_temp_max'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.tempmax_value';
        data['oid_temp_min'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.tempmin_value';
        data['oid_symbol_description'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.symbol_desc';
        data['oid_symbol'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.symbol_value';
        data['oid_wind_symbol'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.wind_symbol';
        data['oid_wind_value'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.wind_value';
        data['oid_windgusts_value'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.windgusts_value';
        data['oid_sunshine_duration'] = inctance_part + '.' + datastructure_part + '.Location_1.' + day_part + '.sunshineDuration';

    }




    changeData(data);
}


class WeatherDayWidget extends (Generic) {

    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }


    static getWidgetInfo() {

       


        return {
            id: 'tplWeatherDayWidget',                 // Unique widget type ID. Should start with `tpl` followed
            visSet: 'vis-2-widgets-weather',        // Unique ID of widget set

            //visset -> see WeatherWidget
            //visSetLabel: 'vis-2-widgets-weather',   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: '#cf00ff',                 // Color of widget set. it is enough to set color only in one widget of set
            visName: 'WeatherDayWidget',                     // Name of widget
            visWidgetLabel: 'vis_2_widgets-weatherday', // Label of widget
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
                            name: 'instance',    // name in data structure
                            label: 'widgets_weather_label_instance', // translated field label
                            type: 'instance',
                            default: 'daswetter.0',
                            onChange: setDataStructures,
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
                            default: 'NextHours',
                            onChange: setDataStructures,

                        },
                        {
                            name: 'day2show',    // name in data structure
                            label: 'widgets_weather_label_day2show', // translated field label
                            type: 'select',
                            options: [
                                {
                                    value: '0',
                                    label: 'widgets_weather_label_day2show_today'
                                },
                                {
                                    value: '1',
                                    label: 'widgets_weather_label_day2show_today+1'
                                },
                                {
                                    value: '2',
                                    label: 'widgets_weather_label_day2show_today+2'
                                },
                                {
                                    value: '3',
                                    label: 'widgets_weather_label_day2show_today+3'
                                },
                                {
                                    value: '4',
                                    label: 'widgets_weather_label_day2show_today+4'
                                },
                                
                            ],
                            default: '0',
                            onChange: setDataStructures,

                        },

                        {
                            name: 'iconset',    // name in data structure
                            label: 'widgets_weather_label_iconset', // translated field label
                            type: 'select',
                            options: [
                                {
                                    value: 'galeria1',
                                    label: 'widgets_weather_label_iconset_galeria1'
                                },
                                {
                                    value: 'galeria2',
                                    label: 'widgets_weather_label_iconset_galeria2'
                                },
                                {
                                    value: 'galeria3',
                                    label: 'widgets_weather_label_iconset_galeria3'
                                },
                                {
                                    value: 'galeria4',
                                    label: 'widgets_weather_label_iconset_galeria4'
                                },
                                {
                                    value: 'galeria5_white',
                                    label: 'widgets_weather_label_iconset_galeria5_white'
                                },
                                {
                                    value: 'galeria5_color',
                                    label: 'widgets_weather_label_iconset_galeria5_color'
                                },
                                {
                                    value: 'galeria6',
                                    label: 'widgets_weather_label_iconset_galeria6'
                                },
                                
                            ],
                            default: 'galeria1',
                            onChange: setDataStructures,

                        },

                        {
                            name: 'windiconset',    // name in data structure
                            label: 'widgets_weather_label_windiconset', // translated field label
                            type: 'select',
                            options: [
                                {
                                    value: 'galeria1',
                                    label: 'widgets_weather_label_windiconset_galeria1'
                                },
                                {
                                    value: 'galeria2',
                                    label: 'widgets_weather_label_windiconset_galeria2'
                                },
                                {
                                    value: 'Beaufort',
                                    label: 'widgets_weather_label_windiconset_beaufort'
                                },


                            ],
                            default: 'galeria1',
                            onChange: setDataStructures,

                        },
                        
                    ],
                },
                {



                    name: 'OIDS', // group name
                    fields: [

                        {
                            name: 'oid_dayname',    // name in data structure
                            label: 'widgets_weather_label_oiddayname', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.day_name',
                        },
                        {
                            name: 'oid_date',    // name in data structure
                            label: 'widgets_weather_label_oiddate', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.day_value',
                        },
                        {
                            name: 'oid_temp_max',    // name in data structure
                            label: 'widgets_weather_label_oidtempmax', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.tempmax_value',
                        },
                        {
                            name: 'oid_temp_min',    // name in data structure
                            label: 'widgets_weather_label_oidtempmin', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.tempmin_value',
                        },
                        {
                            name: 'oid_symbol_description',    // name in data structure
                            label: 'widgets_weather_label_oidsymboldescription', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.symbol_desc',
                        },
                        {
                            name: 'oid_symbol',    // name in data structure
                            label: 'widgets_weather_label_oidsymbol', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.symbol_value',
                        },
                        {
                            name: 'oid_wind_symbol',    // name in data structure
                            label: 'widgets_weather_label_oidwindsymbol', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.wind_symbol',
                        },
                        {
                            name: 'oid_wind_value',    // name in data structure
                            label: 'widgets_weather_label_oidwindvalue', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.wind_value',
                        },
                        {
                            name: 'oid_windgusts_value',    // name in data structure
                            label: 'widgets_weather_label_oidwindgustsvalue', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.windgusts_value',
                        },
                        {
                            name: 'oid_sunshine_duration',    // name in data structure
                            label: 'widgets_weather_label_oidsunshineduration', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.sunshineDuration',
                        },

                    ],
                },
               

            ],
            visPrev: 'widgets/vis-2-test/img/vis-widget-weatherday.png',
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
        return WeatherDayWidget.getWidgetInfo();
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

    
   

    renderWidgetBody(props) {
        super.renderWidgetBody(props);


        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }
        
        console.log("wdw chart: size " + size);

        const iconlabelset = this.state.rxData['iconset'];
        const windiconlabelset = this.state.rxData['windiconset'];


        //weather symbol
        const weather_icon = this.state.values[`${this.state.rxData['oid_symbol']}.val`]
        console.log("weather icon " + weather_icon);

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


        //wind symbol
        const wind_icon = this.state.values[`${this.state.rxData['oid_wind_symbol']}.val`]
        console.log("wind icon " + wind_icon);
        //todo galerie umschaltbar
        let src_icon_wind = icons_wind_galeria1[wind_icon];
        switch (windiconlabelset) {
            case "galeria1": src_icon_wind = icons_wind_galeria1[weather_icon]; break;
            case "galeria2": src_icon_wind = icons_wind_galeria2[weather_icon]; break;
            case "Beaufort": src_icon_wind = icons_wind_Beaufort[weather_icon]; break;
            default: src_icon_wind = icons_wind_galeria1[weather_icon]; break;
        }


        const date = this.state.values[`${this.state.rxData['oid_date']}.val`];
        let day = 1;
        let month = 1;
        let year = 2024;

        if (date && date.length > 0) {
            day = date.substring(6);
            month = date.substring(4, 6);
            month = month - 1;
            year = date.substring(0, 4);
        }

        console.log("date " + date + " " + day + "." + month + "." + year);
        const oDate = new Date(year = year, month = month, day = day);
        console.log("date " + oDate.toLocaleDateString());

        const sundurationval = (this.state.values[`${this.state.rxData['oid_sunshine_duration']}.val`]);
        console.log("sunduration " + sundurationval);

        let sunduration = 0;
        if (sundurationval) {

            sunduration = Number(sundurationval).toFixed(2);
            console.log("sunduration " + sunduration + " " + typeof sunduration);

        }

        const content = <div
            ref={this.refCardContent}
            className={this.props.classes.cardContent}
        >

            <Grid
                container spacing={0.5}
                alignItems="center"
                justifyContent="center"
                >

                <Grid item xs={12}>
                    <div>
                        <p>{this.state.values[`${this.state.rxData['oid_dayname']}.val`]}</p>    
                        <p>{oDate.toLocaleDateString()}</p>
                    </div>
                </Grid>
                <Grid item xs={6} >
                    <div>
                        <img src={src_icon_weather} ></img>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ fontSize: 'small' }}>
                        <p>{I18n.t("max")} {this.state.values[`${this.state.rxData['oid_temp_max']}.val`]} °C</p>
                        <p>{I18n.t("min")} {this.state.values[`${this.state.rxData['oid_temp_min']}.val`]} °C</p>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div>
                        <p>{this.state.values[`${this.state.rxData['oid_symbol_description']}.val`]}</p>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div>
                        <img src={src_icon_wind}></img>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ fontSize: 'small' }}>
                        <p>{I18n.t("Wind")} {this.state.values[`${this.state.rxData['oid_wind_value']}.val`]} km/h</p>
                        <p>{I18n.t("WindGusts")} {this.state.values[`${this.state.rxData['oid_windgusts_value']}.val`]} km/h</p>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <p>{I18n.t("sun")} {sunduration} h</p>
                    </div>
                </Grid>
        
            </Grid>
        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("wdw: wrap content");

        return this.wrapContent(content, null, { textAlign: 'center' });
    }
}

WeatherDayWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default withStyles(styles)(withTheme(WeatherDayWidget));

