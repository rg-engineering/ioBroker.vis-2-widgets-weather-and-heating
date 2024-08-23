import PropTypes from "prop-types";

import { VisRxWidget } from "@iobroker/vis-2-widgets-react-dev";

class Generic extends (window.visRxWidget || VisRxWidget) {
    getPropertyValue = state => this.state.values[`${this.state.rxData[state]}.val`];

    static getI18nPrefix() {
        return 'vis_2_widgets_weather_heating_label_';
    }
}

Generic.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default Generic;
