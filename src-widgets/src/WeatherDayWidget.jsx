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


import Icon_weather_galeria1_1 from './assets/icons/tiempo-weather/galeria1/1.png';
import Icon_weather_galeria1_2 from './assets/icons/tiempo-weather/galeria1/2.png';
import Icon_weather_galeria1_3 from './assets/icons/tiempo-weather/galeria1/3.png';
import Icon_weather_galeria1_4 from './assets/icons/tiempo-weather/galeria1/4.png';
import Icon_weather_galeria1_5 from './assets/icons/tiempo-weather/galeria1/5.png';
import Icon_weather_galeria1_6 from './assets/icons/tiempo-weather/galeria1/6.png';
import Icon_weather_galeria1_7 from './assets/icons/tiempo-weather/galeria1/7.png';
import Icon_weather_galeria1_8 from './assets/icons/tiempo-weather/galeria1/8.png';
import Icon_weather_galeria1_9 from './assets/icons/tiempo-weather/galeria1/9.png';
import Icon_weather_galeria1_10 from './assets/icons/tiempo-weather/galeria1/10.png';
import Icon_weather_galeria1_11 from './assets/icons/tiempo-weather/galeria1/11.png';
import Icon_weather_galeria1_12 from './assets/icons/tiempo-weather/galeria1/12.png';
import Icon_weather_galeria1_13 from './assets/icons/tiempo-weather/galeria1/13.png';
import Icon_weather_galeria1_14 from './assets/icons/tiempo-weather/galeria1/14.png';
import Icon_weather_galeria1_15 from './assets/icons/tiempo-weather/galeria1/15.png';
import Icon_weather_galeria1_16 from './assets/icons/tiempo-weather/galeria1/16.png';
import Icon_weather_galeria1_17 from './assets/icons/tiempo-weather/galeria1/17.png';
import Icon_weather_galeria1_18 from './assets/icons/tiempo-weather/galeria1/18.png';
import Icon_weather_galeria1_19 from './assets/icons/tiempo-weather/galeria1/19.png';
import Icon_weather_galeria1_20 from './assets/icons/tiempo-weather/galeria1/20.png';
import Icon_weather_galeria1_21 from './assets/icons/tiempo-weather/galeria1/21.png';
import Icon_weather_galeria1_22 from './assets/icons/tiempo-weather/galeria1/22.png';


import Icon_weather_galeria2_1 from './assets/icons/tiempo-weather/galeria2/1.png';
import Icon_weather_galeria2_2 from './assets/icons/tiempo-weather/galeria2/2.png';
import Icon_weather_galeria2_3 from './assets/icons/tiempo-weather/galeria2/3.png';
import Icon_weather_galeria2_4 from './assets/icons/tiempo-weather/galeria2/4.png';
import Icon_weather_galeria2_5 from './assets/icons/tiempo-weather/galeria2/5.png';
import Icon_weather_galeria2_6 from './assets/icons/tiempo-weather/galeria2/6.png';
import Icon_weather_galeria2_7 from './assets/icons/tiempo-weather/galeria2/7.png';
import Icon_weather_galeria2_8 from './assets/icons/tiempo-weather/galeria2/8.png';
import Icon_weather_galeria2_9 from './assets/icons/tiempo-weather/galeria2/9.png';
import Icon_weather_galeria2_10 from './assets/icons/tiempo-weather/galeria2/10.png';
import Icon_weather_galeria2_11 from './assets/icons/tiempo-weather/galeria2/11.png';
import Icon_weather_galeria2_12 from './assets/icons/tiempo-weather/galeria2/12.png';
import Icon_weather_galeria2_13 from './assets/icons/tiempo-weather/galeria2/13.png';
import Icon_weather_galeria2_14 from './assets/icons/tiempo-weather/galeria2/14.png';
import Icon_weather_galeria2_15 from './assets/icons/tiempo-weather/galeria2/15.png';
import Icon_weather_galeria2_16 from './assets/icons/tiempo-weather/galeria2/16.png';
import Icon_weather_galeria2_17 from './assets/icons/tiempo-weather/galeria2/17.png';
import Icon_weather_galeria2_18 from './assets/icons/tiempo-weather/galeria2/18.png';
import Icon_weather_galeria2_19 from './assets/icons/tiempo-weather/galeria2/19.png';


import Icon_wind_galeria1_1 from "./assets/icons/viento-wind/galeria1/1.png"
import Icon_wind_galeria1_2 from "./assets/icons/viento-wind/galeria1/2.png"
import Icon_wind_galeria1_3 from "./assets/icons/viento-wind/galeria1/3.png"
import Icon_wind_galeria1_4 from "./assets/icons/viento-wind/galeria1/4.png"
import Icon_wind_galeria1_5 from "./assets/icons/viento-wind/galeria1/5.png"
import Icon_wind_galeria1_6 from "./assets/icons/viento-wind/galeria1/6.png"
import Icon_wind_galeria1_7 from "./assets/icons/viento-wind/galeria1/7.png"
import Icon_wind_galeria1_8 from "./assets/icons/viento-wind/galeria1/8.png"
import Icon_wind_galeria1_9 from "./assets/icons/viento-wind/galeria1/8.png"  //9 fehlt
import Icon_wind_galeria1_10 from "./assets/icons/viento-wind/galeria1/10.png"
import Icon_wind_galeria1_11 from "./assets/icons/viento-wind/galeria1/11.png"
import Icon_wind_galeria1_12 from "./assets/icons/viento-wind/galeria1/12.png"
import Icon_wind_galeria1_13 from "./assets/icons/viento-wind/galeria1/13.png"
import Icon_wind_galeria1_14 from "./assets/icons/viento-wind/galeria1/14.png"
import Icon_wind_galeria1_15 from "./assets/icons/viento-wind/galeria1/15.png"
import Icon_wind_galeria1_16 from "./assets/icons/viento-wind/galeria1/16.png"
import Icon_wind_galeria1_17 from "./assets/icons/viento-wind/galeria1/17.png"
import Icon_wind_galeria1_18 from "./assets/icons/viento-wind/galeria1/17.png" //18 fehlt
import Icon_wind_galeria1_19 from "./assets/icons/viento-wind/galeria1/19.png"
import Icon_wind_galeria1_20 from "./assets/icons/viento-wind/galeria1/20.png"
import Icon_wind_galeria1_21 from "./assets/icons/viento-wind/galeria1/21.png"
import Icon_wind_galeria1_22 from "./assets/icons/viento-wind/galeria1/22.png"
import Icon_wind_galeria1_23 from "./assets/icons/viento-wind/galeria1/23.png"
import Icon_wind_galeria1_24 from "./assets/icons/viento-wind/galeria1/24.png"
import Icon_wind_galeria1_25 from "./assets/icons/viento-wind/galeria1/25.png"
import Icon_wind_galeria1_26 from "./assets/icons/viento-wind/galeria1/26.png"
import Icon_wind_galeria1_27 from "./assets/icons/viento-wind/galeria1/26.png" //27 fehlt
import Icon_wind_galeria1_28 from "./assets/icons/viento-wind/galeria1/28.png"
import Icon_wind_galeria1_29 from "./assets/icons/viento-wind/galeria1/29.png"
import Icon_wind_galeria1_30 from "./assets/icons/viento-wind/galeria1/30.png"
import Icon_wind_galeria1_31 from "./assets/icons/viento-wind/galeria1/31.png"
import Icon_wind_galeria1_32 from "./assets/icons/viento-wind/galeria1/32.png"
import Icon_wind_galeria1_33 from "./assets/icons/viento-wind/galeria1/33.png"



const icons_weather_galeria1 = {
    1: Icon_weather_galeria1_1,
    2: Icon_weather_galeria1_2,
    3: Icon_weather_galeria1_3,
    4: Icon_weather_galeria1_4,
    4: Icon_weather_galeria1_5,
    6: Icon_weather_galeria1_6,
    7: Icon_weather_galeria1_7,
    8: Icon_weather_galeria1_8,
    9: Icon_weather_galeria1_9,
    10: Icon_weather_galeria1_10,
    11: Icon_weather_galeria1_11,
    12: Icon_weather_galeria1_12,
    13: Icon_weather_galeria1_13,
    14: Icon_weather_galeria1_14,
    15: Icon_weather_galeria1_15,
    16: Icon_weather_galeria1_16,
    17: Icon_weather_galeria1_17,
    18: Icon_weather_galeria1_18,
    19: Icon_weather_galeria1_19,
    20: Icon_weather_galeria1_20,
    21: Icon_weather_galeria1_21,
    22: Icon_weather_galeria1_22,


}


const icons_wind_galeria1 = {
    1: Icon_wind_galeria1_1,
    2: Icon_wind_galeria1_2,
    3: Icon_wind_galeria1_3,
    4: Icon_wind_galeria1_4,
    5: Icon_wind_galeria1_5,
    6: Icon_wind_galeria1_6,
    7: Icon_wind_galeria1_7,
    8: Icon_wind_galeria1_8,
    9: Icon_wind_galeria1_9,
    10: Icon_wind_galeria1_10,
    11: Icon_wind_galeria1_11,
    12: Icon_wind_galeria1_12,
    13: Icon_wind_galeria1_13,
    14: Icon_wind_galeria1_14,
    15: Icon_wind_galeria1_15,
    16: Icon_wind_galeria1_16,
    17: Icon_wind_galeria1_17,
    18: Icon_wind_galeria1_18,
    19: Icon_wind_galeria1_19,
    20: Icon_wind_galeria1_20,
    21: Icon_wind_galeria1_21,
    22: Icon_wind_galeria1_22,
    23: Icon_wind_galeria1_23,
    24: Icon_wind_galeria1_24,
    25: Icon_wind_galeria1_25,
    26: Icon_wind_galeria1_26,
    27: Icon_wind_galeria1_27,
    28: Icon_wind_galeria1_28,
    29: Icon_wind_galeria1_29,
    30: Icon_wind_galeria1_30,
    31: Icon_wind_galeria1_31,
    32: Icon_wind_galeria1_32,
    33: Icon_wind_galeria1_33,



}


//todo Übersetzungen
//todo icons nach OID anzeigen
//todo Einheiten der Werte fehlen
//todo temperatur und Icon in eine Zeile
//todo Wind und Icon in eine Zeile
//todo Auswahl des Iconsets
//todo Datum formatieren
//todo galeria umschlatbar
//todo mondphase anzeigen

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

        //weather symbol
        const weather_icon = this.state.values[`${this.state.rxData['oid_symbol']}.val`]
        console.log("weather icon " + weather_icon);
        //todo galerie umschaltbar
        const src_icon_weather = icons_weather_galeria1[weather_icon];

        //wind symbol
        const wind_icon = this.state.values[`${this.state.rxData['oid_wind_symbol']}.val`]
        console.log("wind icon " + wind_icon);
        //todo galerie umschaltbar
        const src_icon_wind = icons_wind_galeria1[wind_icon];

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
                    <div>
                        <p>{I18n.t("min")} {this.state.values[`${this.state.rxData['oid_temp_min']}.val`]} °C</p>
                        <p>{I18n.t("max")} {this.state.values[`${this.state.rxData['oid_temp_max']}.val`]} °C</p>
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
                    <div>
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

