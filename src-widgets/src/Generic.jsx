import PropTypes from "prop-types";

import { VisRxWidget } from "@iobroker/vis-2-widgets-react-dev";

class Generic extends (window.visRxWidget || VisRxWidget) {
    getPropertyValue = state => this.state.values[`${this.state.rxData[state]}.val`];

    static getI18nPrefix() {
        return '';
    }
}

Generic.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default Generic;
