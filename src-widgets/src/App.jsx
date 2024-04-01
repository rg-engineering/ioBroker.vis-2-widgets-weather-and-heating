import React from 'react';
import { withStyles } from '@mui/styles';

import WidgetDemoApp from '@iobroker/vis-2-widgets-react-dev/widgetDemoApp';
import { i18n as I18n } from '@iobroker/adapter-react-v5';

import WeatherWidget from './WeatherWidget';
import GeneralEChartWidget from './GeneralEChartWidget';
import translations from './translations';


const styles = theme => ({
    app: {
        backgroundColor: theme?.palette?.background.default,
        color: theme?.palette?.text.primary,
        height: '100%',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
    },
});

class App extends WidgetDemoApp {
    constructor(props) {
        super(props);

        // init translations
        I18n.extendTranslations(translations);
    }

    renderWidget() {
        return <div 
            className={this.props.classes.app}
               >

            <WeatherWidget
                socket={this.socket}
                themeType={this.state.themeType}
                style={{
                    width: 600,
                    height: 200,
                }}
                data={{
                    type: 'all',
                }}
            />;

            <GeneralEChartWidget
                socket={this.socket}
                themeType={this.state.themeType}
                style={{
                    width: 600,
                    height: 200,
                }}
                data={{
                    type: 'all',
                }}
            />;

        </div>;
    }
}

export default withStyles(styles)(App);
