const makeFederation = require('@iobroker/vis-2-widgets-react-dev/modulefederation.config');

module.exports = makeFederation(
    'vis2Weather', // internal name of package - must be unique and identical with io-package.json=>common.visWidgets.vis2demoWidget
    {
        './WeatherWidget': './src/WeatherWidget', // List of all widgets in this package
        './translations': './src/translations',
    },
);
