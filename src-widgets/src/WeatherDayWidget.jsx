import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@mui/styles';



import { Card, CardContent } from '@mui/material';

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



//todo Übersetzungen

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
                            name: 'oid_date',    // name in data structure
                            label: 'widgets_weather_label_oiddate', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.day_name',
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
                            name: 'oid_iconURL',    // name in data structure
                            label: 'widgets_weather_label_oidiconurl', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.iconURL',
                        },
                        {
                            name: 'oid_windiconURL',    // name in data structure
                            label: 'widgets_weather_label_oidwindiconurl', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.windIconURL',
                        },
                        {
                            name: 'oid_wind_value',    // name in data structure
                            label: 'widgets_weather_label_oidwindvalue', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Day_1.wind_value',
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

        console.log("chart: size " + size);


        const content = <div
            ref={this.refCardContent}
            className={this.props.classes.cardContent}
        >
            <div>
                <h2>{this.state.rxData['oid_date']}</h2>
                <h3>8. Apr.</h3>
            </div>
            <div>
                
                <li>min {this.state.rxData['oid_temp_min']}</li>
                <li>max {this.state.rxData['oid_temp_max']}</li>
            </div>
            <div>
                <p>{this.state.rxData['oid_symbol_description']}</p>
            </div>
            <div>
                <li>{I18n.t("Böen")} {this.state.rxData['oid_wind_value']}</li>
            </div>
            <div>
                <p>{I18n.t("sun")} {this.state.rxData['oid_sunshine_duration']}</p>
            </div>
        

        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("wrap content");

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

