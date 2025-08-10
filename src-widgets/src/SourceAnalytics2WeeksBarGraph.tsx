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

        this.CreateTimer();
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
                        
                    ],
                },
                
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-SourceAnalytics2WeeksBarGraph.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo(): RxWidgetInfo {
        return SourceAnalytics2WeeksBarGraphWidget.getWidgetInfo();
    }

    createTable(): JSX.Element {

        


        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >

            <div>

            </div>


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
      

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("SourceAnalytics2WeeksBarGraph - content only");
            return content;
        }



        return this.wrapContent(content, null, { textAlign: "center" });
    }
}



