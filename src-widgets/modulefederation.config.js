const makeFederation = require("@iobroker/vis-2-widgets-react-dev/modulefederation.config");

module.exports = makeFederation(
    "vis2Weatherheating", // internal name of package - must be unique and identical with io-package.json=>common.visWidgets.vis2demoWidget
    {
        "./GeneralEChartWidget": "./src/GeneralEChartWidget",

        "./WeatherWidget": "./src/WeatherWidget", // List of all widgets in this package
        "./WeatherDayWidget": "./src/WeatherDayWidget", 

        "./HeatingTimescheduleWidget": "./src/HeatingTimescheduleWidget", 
        "./HeatingGeneralParamsWidget": "./src/HeatingGeneralParamsWidget",
        "./HeatingRoomWidget": "./src/HeatingRoomWidget",
        "./HeatingRoomsOverviewWidget": "./src/HeatingRoomsOverviewWidget",
        "./HeatingRomProfileParamsWidget": "./src/HeatingRoomProfileParamsWidget",
        "./HeatingWindowStatusOverviewWidget": "./src/HeatingWindowStatusOverviewWidget",

        "./translations": "./src/translations",
    },
);
