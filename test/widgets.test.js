const helper = require('@iobroker/vis-2-widgets-testing');
const adapterName = require('../package.json').name.split('.').pop();

//just to other widgets too

const heating_widget_set = "vis-2-widgets-heating";

describe('vis-2-widgets-weather', () => {
    before(async function () {
        this.timeout(720000);
        // install js-controller, web and vis-2-beta
        await helper.startIoBroker();
        await helper.startBrowser(process.env.CI === 'true' ? 'new' : false);
        await helper.createProject();

        // open widgets
        console.log("open " + adapterName);
        await helper.palette.openWidgetSet(null, adapterName);

        //console.log("open " + heating_widget_set);
        //await helper.palette.openWidgetSet(null, heating_widget_set);

        await helper.screenshot(null, '02_widgets_opened');
    });

    it('Check all widgets', async function () {
        this.timeout(120000);

        
        let widgets = await helper.palette.getListOfWidgets(null, adapterName);
        console.log("got " + widgets.length + " widgets " + adapterName);
        for (let w = 0; w < widgets.length; w++) {

            console.log("widget " + widgets[w]);

            const wid = await helper.palette.addWidget(null, widgets[w], true);
            await helper.screenshot(null, `10_${widgets[w]}`);
            await helper.view.deleteWidget(null, wid);
        }
        


       /*

        widgets = await helper.palette.getListOfWidgets(null, heating_widget_set);
        console.log("got " + widgets.length + " widgets " + heating_widget_set);
        for (let w = 0; w < widgets.length; w++) {

            console.log("widget " + widgets[w]);

            const wid = await helper.palette.addWidget(null, widgets[w], true);
            await helper.screenshot(null, `10_${widgets[w]}`);
            await helper.view.deleteWidget(null, wid);
        }
        */


        return Promise.resolve();
    });

    after(async function () {
        this.timeout(5000);
        await helper.stopBrowser();
        return helper.stopIoBroker();
    });
});