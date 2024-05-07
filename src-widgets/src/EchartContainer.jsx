import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

class EchartContainer extends (ReactECharts) {

    constructor(props) {
        console.log("EchartContainer constructor " + JSON.stringify(props));

        props.onChartReady = (instance) => {

            const group = "Weather";

            console.log("EchartContainer on chart ready " + group);

            if (group !== undefined && group.length > 0) {

                console.log("EchartContainer connect to " + group);
                instance.group = group;
                echarts.connect(group);
            }
        };

        super(props);
    }
}

export default EchartContainer;
