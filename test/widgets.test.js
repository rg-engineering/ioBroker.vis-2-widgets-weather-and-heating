const helper = require('@iobroker/vis-2-widgets-testing');
const adapterName = require('../package.json').name.split('.').pop();

//just to other widgets too

const widget_sets = ["vis-2-widgets-weather", "vis-2-widgets-heating"];

describe(widget_sets[0], () => {
    before(async function () {
        this.timeout(720000);
        // install js-controller, web and vis-2-beta
        await helper.startIoBroker();
        await helper.startBrowser(process.env.CI === 'true' ? 'new' : false);
        await helper.createProject();

        // open widgets
        // console.log("open " + adapterName);
        // await helper.palette.openWidgetSet(null, adapterName);

        console.log(`open ${widget_sets[0]}`);
        await helper.palette.openWidgetSet(null, widget_sets[0]);

        await helper.screenshot(null, '02_widgets_opened');
    });

    it('Check all widgets', async function () {
        this.timeout(120000);
        // let widgets = await helper.palette.getListOfWidgets(null, adapterName);
        let widgets = await helper.palette.getListOfWidgets(null, widget_sets[0]);
        console.log(`got ${widgets.length} widgets ${adapterName} ${widget_sets[0]}`);
        for (let w = 0; w < widgets.length; w++) {
            console.log(`widget ${widgets[w]}`);

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
