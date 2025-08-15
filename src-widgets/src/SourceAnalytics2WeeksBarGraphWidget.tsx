import React, { type CSSProperties } from 'react';
import type {
    RxRenderWidgetProps,
    RxWidgetInfo,
    VisRxWidgetProps,
    WidgetData,
    VisRxWidgetState,
    RxWidgetInfoAttributesField
} from '@iobroker/types-vis-2';

import type { LegacyConnection } from '@iobroker/adapter-react-v5';

import moment from "moment";

import EchartContainer from "./EchartContainer";

import Generic from "./Generic";

const styles: Record<string, CSSProperties> = {
    cardContent: {
        flex: 1,
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
};




const setDataStructures = async (
    field: RxWidgetInfoAttributesField,
    data: WidgetData,
    changeData: (newData: WidgetData) => void,
    socket: LegacyConnection,
): Promise<void> => {
    console.log(`SourceAnalytics2WeeksBarGraph - set new datastructure ` );


    changeData(data);
};


interface StaticRxData {
    noCard: boolean;


    
    //OID's
    OID_CurrentWeek_Monday: string;
    OID_CurrentWeek_Tuesday: string;
    OID_CurrentWeek_Wednesday: string;
    OID_CurrentWeek_Thursday: string;
    OID_CurrentWeek_Friday: string;
    OID_CurrentWeek_Saturday: string;
    OID_CurrentWeek_Sunday: string;

    OID_PreviousWeek_Monday: string;
    OID_PreviousWeek_Tuesday: string;
    OID_PreviousWeek_Wednesday: string;
    OID_PreviousWeek_Thursday: string;
    OID_PreviousWeek_Friday: string;
    OID_PreviousWeek_Saturday: string;
    OID_PreviousWeek_Sunday: string;

    headline:string,
    headline_color: string;
    legend_text_color: string;

    xaxis_color: string;

    visible: boolean;
    prevweek_color: string;
    curweek_color: string;
    unit: string;
    axislablecolor: string;
    positionYAxis: string;


}

interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
    reloadTimer: NodeJS.Timeout | null;
}

export default class SourceAnalytics2WeeksBarGraphWidget extends Generic<StaticRxData, StaticState> {
    private readonly refCardContent: React.RefObject<HTMLDivElement> = React.createRef();

   

    constructor(props: VisRxWidgetProps) {
        super(props);
        this.refCardContent = React.createRef();

        this.state = {
            ...this.state,
            
        };
    }

    async componentDidMount() {

        super.componentDidMount();

        console.log(`SourceAnalytics2WeeksBarGraph - componentDidMount ` );


    }

    async componentWillUnmount() {
        super.componentWillUnmount();
        console.log("SourceAnalytics2WeeksBarGraph - componentWillUnmount");

    }

    async onPropertyUpdate() {

        console.log("SourceAnalytics2WeeksBarGraph - onPropertyUpdate");

    }

    

    

    static getWidgetInfo(): RxWidgetInfo {
        return {
            id: "tplSourceAnalytics2WeeksBarGraphWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

            //visset -> see HeatingGeneralParamsWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "SourceAnalytics2WeeksBarGraphWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-SourceAnalytics2WeeksBarGraphWidget", // Label of widget
            visWidgetColor: "#005cc4",               // Optional widget color. If not set, default color of widget set will be used.
            visResizeLocked: false,                   // require, that width is always equal to height
            visResizable: true,                     // widget is not resizable
            visDraggable: true,                     // widget is not draggable
            visAttrs: [
                {
                    // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
                    name: "common", // group name
                    label: "common", // group label
                    fields: [

                        {
                            name: "noCard",
                            label: "without_card",
                            type: "checkbox",
                        },
                        {
                            name: "headline",    // name in data structure
                            label: "headline", // translated field label
                            type: "text",
                            default: "",
                        },


                        {
                            name: "headline_color",    // name in data structure
                            label: "headline_color", // translated field label
                            type: "color",
                            default: "white",
                        },
                        {
                            name: "legend_text_color",    // name in data structure
                            label: "legend_text_color", // translated field label
                            type: "color",
                            default: "black",
                        },

                        {
                            name: "visible",    // name in data structure
                            label: "visible", // translated field label
                            type: "checkbox",
                            default: false,
                        },
                        {
                            name: "unit",    // name in data structure
                            label: "unit", // translated field label
                            type: "text",
                            default: "kWh",
                        },
                        {
                            name: "prevweek_color",    // name in data structure
                            label: "prevweek_color", // translated field label
                            type: "color",
                            default: "blue",
                        },
                        {
                            name: "curweek_color",    // name in data structure
                            label: "curweek_color", // translated field label
                            type: "color",
                            default: "yellow",
                        },
                        {
                            name: "axislablecolor",    // name in data structure
                            label: "axislablecolor", // translated field label
                            type: "color",
                            default: "blue",
                        },
                        {
                            name: "positionYAxis",    // name in data structure
                            label: "positionYAxis", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "left",
                                    label: "left"
                                },
                                {
                                    value: "right",
                                    label: "right"
                                },
                            ],
                            default: "right",
                        },
                       
                       
                        
                    ],
                },
                {
                    name: "X_axis", // group name
                    label: "x_axis",
                    fields: [
                        
                        {
                            name: "xaxis_color",    // name in data structure
                            label: "xaxis_color", // translated field label
                            type: "color",
                            default: "white",
                        },
                    ]
                },
                {
                    name: "OIDS", // group name
                    label: "OIDS", // group label
                    fields: [
                      

                        {
                            name: 'OID_CurrentWeek_Monday',
                            type: 'id',
                            default: '',
                            label: 'Current Week Monday OID',
                        },
                        {
                            name: 'OID_CurrentWeek_Tuesday',
                            type: 'id',
                            default: '',
                            label: 'Current Week Tuesday OID',
                        },
                        {
                            name: 'OID_CurrentWeek_Wednesday',
                            type: 'id',
                            default: '',
                            label: 'Current Week Wednesday OID',
                        },
                        {
                            name: 'OID_CurrentWeek_Thursday',
                            type: 'id',
                            default: '',
                            label: 'Current Week Thursday OID',
                        },
                        {
                            name: 'OID_CurrentWeek_Friday',
                            type: 'id',
                            default: '',
                            label: 'Current Week Friday OID',
                        },
                        {
                            name: 'OID_CurrentWeek_Saturday',
                            type: 'id',
                            default: '',
                            label: 'Current Week Saturday OID',
                        },
                        {
                            name: 'OID_CurrentWeek_Sunday',
                            type: 'id',
                            default: '',
                            label: 'Current Week Sunday OID',
                        },


                        {
                            name: 'OID_PreviousWeek_Monday',
                            type: 'id',
                            default: '',
                            label: 'Previous Week Monday OID',
                        },
                        {
                            name: 'OID_PreviousWeek_Tuesday',
                            type: 'id',
                            default: '',
                            label: 'Previous Week Tuesday OID',
                        },
                        {
                            name: 'OID_PreviousWeek_Wednesday',
                            type: 'id',
                            default: '',
                            label: 'Previous Week Wednesday OID',
                        },
                        {
                            name: 'OID_PreviousWeek_Thursday',
                            type: 'id',
                            default: '',
                            label: 'Previous Week Thursday OID',
                        },
                        {
                            name: 'OID_PreviousWeek_Friday',
                            type: 'id',
                            default: '',
                            label: 'Previous Week Friday OID',
                        },
                        {
                            name: 'OID_PreviousWeek_Saturday',
                            type: 'id',
                            default: '',
                            label: 'Previous Week Saturday OID',
                        },
                        {
                            name: 'OID_PreviousWeek_Sunday',
                            type: 'id',
                            default: '',
                            label: 'Previous Week Sunday OID',
                        },

                    ]
                }
                
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-SourceAnalytics2WeeksBarGraph.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo(): RxWidgetInfo {
        return SourceAnalytics2WeeksBarGraphWidget.getWidgetInfo();
    }


    getOption(): echarts.EChartsOption {
        console.log("getOption ");


        let content: echarts.EChartsOption;

        const legend: string[] = [];
        const yaxis: echarts.YAXisComponentOption[] = [];
        const series: echarts.SeriesOption[] = [];

        let Min;
        let Max;

        

        let series1 = [
             this.state.values[`${this.state.rxData["OID_PreviousWeek_Monday"]}.val`],
             this.state.values[`${this.state.rxData["OID_PreviousWeek_Tuesday"]}.val`],
             this.state.values[`${this.state.rxData["OID_PreviousWeek_Wednesday"]}.val`],
             this.state.values[`${this.state.rxData["OID_PreviousWeek_Thursday"]}.val`],
             this.state.values[`${this.state.rxData["OID_PreviousWeek_Friday"]}.val`],
             this.state.values[`${this.state.rxData["OID_PreviousWeek_Saturday"]}.val`],
             this.state.values[`${this.state.rxData["OID_PreviousWeek_Sunday"]}.val`],
            ];

        let series2 = [
             this.state.values[`${this.state.rxData["OID_CurrentWeek_Monday"]}.val`],
             this.state.values[`${this.state.rxData["OID_CurrentWeek_Tuesday"]}.val`],
             this.state.values[`${this.state.rxData["OID_CurrentWeek_Wednesday"]}.val`],
             this.state.values[`${this.state.rxData["OID_CurrentWeek_Thursday"]}.val`],
             this.state.values[`${this.state.rxData["OID_CurrentWeek_Friday"]}.val`],
             this.state.values[`${this.state.rxData["OID_CurrentWeek_Saturday"]}.val`],
             this.state.values[`${this.state.rxData["OID_CurrentWeek_Sunday"]}.val`]
        ];


        let cnt = 0;

        for (let i = 0; i < series1.length; i++) {

            if (series1[i] === null || series1[i] === undefined || isNaN(series1[i])) {
            }
            else {
                if (Min === undefined || series1[i] < Min) {
                    Min = series1[i];
                    console.log("new min " + Min);
                }
                if (Max=== undefined || series1[i] > Max) {
                    Max = series1[i];
                    console.log("new max " + Max);
                }
            }
        }
        for (let i = 0; i < series2.length; i++) {

            if (series2[i] === null || series2[i] === undefined || isNaN(series2[i])) {
            }
            else {
                if (Min === undefined || series2[i] < Min) {
                    Min = series2[i];
                    console.log("new min " + Min);
                }
                if (Max === undefined || series2[i] > Max) {
                    Max = series2[i];
                    console.log("new max " + Max);
                }
            }
        }


        

        
        if (this.state.rxData["visible"]) {
            yaxis.push({
                position: this.state.rxData["positionYAxis"] || "right",
                type: "value",
                // min max berechnen
                min: Min,
                max: Max,
                axisLabel: {
                    color: this.state.rxData["axislablecolor"] || "blue",
                    formatter: (value: number) => `${value} ${this.state.rxData["unit"]}`,
                },
            });

            legend.push(Generic.t("previous week"));
            series.push({
                name: Generic.t("previous week"),
                type: "bar",
                data: series1,
                color: this.state.rxData["prevweek_color"] || "blue",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: (value: number) => `${value} ${this.state.rxData["unit"]}`,
                },
                emphasis: {
                    focus: 'series'
                },
            });

            legend.push(Generic.t("current week"));
            series.push({
                name: Generic.t("current week"),
                type: "bar",
                data: series2,
                color: this.state.rxData["curweek_color"] || "green",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: (value: number) => `${value} ${this.state.rxData["unit"]}`,
                },
                emphasis: {
                    focus: 'series'
                },
            });

            cnt++;
        }




        if (cnt === 0) {
            // add dummy data to show anything on screen

            console.log("add dummy data");

            legend.push(Generic.t("dummy"));
            yaxis.push({
                position: "left",
                type: "value",
                min: 0,
                max: 100,
                axisLabel: {

                    //todo axis lable color
                    color: "yellow",


                    formatter: "{value} %",
                },
            });
            series.push({
                name: Generic.t("dummy"),
                type: "bar",
                data: [
                    ["2024-04-30T00:00:00.000Z", 10],
                    ["2024-04-30T03:00:00.000Z", 20],
                    ["2024-04-30T06:00:00.000Z", 20],
                    ["2024-04-30T09:00:00.000Z", 60]
                ],

                tooltip: {
                    valueFormatter: (value: number) => `${value} %`,
                },
            });
        }

        // console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));

        let headline = this.state.rxData["headline"] || "";

        content = {
            backgroundColor: "transparent", 
            title: {
                text: headline,

                show: headline.length > 0 ? true : false,
                textStyle: {
                    //headline color
                    color: this.state.rxData["headline_color"] || "white",
                }
            },
            grid: {
                show: true,
                top: 30,
                bottom: 60,
                //backgroundColor: "#F5F5F5",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: legend,
                orient: "horizontal",
                right: 10,
                // top: "center",
                textStyle: {
                    color: this.state.rxData["legend_text_color"] || "black",
                }
            },
            xAxis: {
                type: "category",
                show: true,

                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

                axisLabel: {

                    // axis lable color
                    color: this.state.rxData["xaxis_color"] || "white",
                    
                }
                
            },

            yAxis: yaxis,

            series: series,
        };

        console.log(`options1: ${JSON.stringify(content)}`);


        return content;
    }


    createTable(size: number | undefined): JSX.Element {

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >

            {size && <EchartContainer
                option={this.getOption()}
                theme={this.props.themeType === "dark" ? "dark" : ""}
                style={{ height: `${size}px`, width: "100%" }}
                opts={{ renderer: "svg" }}
            />}


        </div>;
    }

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
        super.renderWidgetBody(props);

        console.log(`SourceAnalytics2WeeksBarGraph - renderWidgetBody `);

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`SourceAnalytics2WeeksBarGraph - renderWidgetBody size ${size}`);
      

        const content = this.createTable(size);

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("SourceAnalytics2WeeksBarGraph - content only");
            return content;
        }



        return this.wrapContent(content, null, { textAlign: "center" });
    }
}



