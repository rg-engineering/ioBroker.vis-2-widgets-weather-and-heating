import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

class EchartContainer extends (ReactECharts) {

    constructor(props) {
        console.log("EchartContainer constructor " + JSON.stringify(props));

        let groupToConnect = "Weather";

        props.onChartReady = (instance, groupToConnect) => {

            let group = "Weather";

            console.log("EchartContainer on chart ready " + group); 

            if (group !== undefined && group.length > 0) {

                console.log("EchartContainer connect to " + group);
                instance.group = group;
                echarts.connect(group);
            }

        }

        super(props);
        this.groupToConnect = groupToConnect; 
    }
}




export default EchartContainer;

