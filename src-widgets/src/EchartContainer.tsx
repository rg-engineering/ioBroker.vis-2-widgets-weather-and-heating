
import React from "react";
//import ReactEChartsCore, { EChartsReactProps } from "echarts-for-react";

import ReactEChartsCore from "echarts-for-react";
import type { EChartsReactProps } from "echarts-for-react";

import * as echarts from "echarts";
import type { ECharts as EChartsType } from "echarts";

//interface EchartContainerProps extends EChartsReactProps { }

class EchartContainer extends React.Component<EChartsReactProps> {
    render(): JSX.Element {
        const { onChartReady, ...restProps } = this.props;

        const handleChartReady = (instance: EChartsType): void => {
            const group = "Weather";
            console.log(`EchartContainer on chart ready ${group}`);

            if (group && group.length) {
                console.log(`EchartContainer connect to ${group}`);
                instance.group = group;
                echarts.connect(group);
            }

            if (onChartReady) {
                onChartReady(instance);
            }
        };

        return (
            <ReactEChartsCore
                {...restProps}
                onChartReady={handleChartReady}
            />
        );
    }
}

export default EchartContainer;


