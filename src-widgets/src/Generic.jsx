import PropTypes from "prop-types";

import {
    Card, CardContent,
} from "@mui/material";

import { VisRxWidget } from "@iobroker/vis-2-widgets-react-dev";

class Generic extends (window.visRxWidget || VisRxWidget) {

    getPropertyValue = state => this.state.values["${this.state.rxData[state]}.val"];

    // eslint-disable-next-line class-methods-use-this
    wrapContent(content, addToHeader, cardContentStyle, headerStyle, onCardClick) {
        return super.wrapContent(content, addToHeader, cardContentStyle, headerStyle, onCardClick, { Card, CardContent });
    }

}

Generic.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default Generic;