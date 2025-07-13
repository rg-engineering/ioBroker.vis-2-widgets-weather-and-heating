import React, { type CSSProperties } from 'react';
import type {
    RxRenderWidgetProps,
    RxWidgetInfo,
    VisRxWidgetProps,
    VisWidgetCommand,
    WidgetData,
    VisRxWidgetState,
    RxWidgetInfoAttributesField
} from '@iobroker/types-vis-2';
import type { LegacyConnection } from '@iobroker/adapter-react-v5';

import Generic from "./Generic";

const styles: Record<string, CSSProperties> =  {
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
    console.log(`set new data structure instance ${data["instance"]}` );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {

    }
    changeData(data);
};


interface StaticRxData {
    noCard: boolean;
    widgetTitle: string;
    instance: string;
    oid_RoomStatesHtmlTable: string;
    headline_color: string;

}

interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
}



export default class HeatingRoomsOverviewWidget extends Generic<StaticRxData, StaticState> {
    private readonly refCardContent: React.RefObject<HTMLDivElement> = React.createRef();
    private lastRxData: string | undefined;
    private updateTimeout: ReturnType<typeof setTimeout> | undefined;
    constructor(props: VisRxWidgetProps) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo(): RxWidgetInfo {
        return {
            id: "tplHeatingRoomsOverviewWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

            //visset -> see HeatingGeneralParamsWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "HeatingRoomsOverviewWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-HeatingRoomsOverview", // Label of widget
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
                            name: "instance",    // name in data structure
                            label: "instance", // translated field label
                            type: "instance",
                            default: "heatingcontrol.0",
                            onChange: setDataStructures, 
                        },
                    ],
                },
                {
                    name: "OIDS_general", // group name
                    label: "OIDS_general", // group label
                    fields: [
                        {
                            name: "oid_RoomStatesHtmlTable",    // name in data structure
                            label: "currentprofile", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.RoomStatesHtmlTable",
                        },
                    ],
                },
                {
                    name: "colors", // group name
                    label: "colors", // group label
                    fields: [
                        {
                            name: "headline_color",    // name in data structure
                            label: "headline_color", // translated field label
                            type: "color",
                            default: "white",
                        },
                    ],
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-HeatingRoomsOverview.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo(): RxWidgetInfo {
        return HeatingRoomsOverviewWidget.getWidgetInfo();
    }

    createTable(): React.JSX.Element {
        const htmlTable = this.state.values[`${this.state.rxData["oid_RoomStatesHtmlTable"]}.val`];

        console.log(`html ${htmlTable}`);

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div style={{ color: this.state.rxData["headline_color"] || "white" }} >
                <p>{Generic.t("Rooms Status Overview")}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: htmlTable }} style={{ margin: "10px"  }} ></div>
        </div>;
    }

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null{
        super.renderWidgetBody(props);

        //console.log("HeatingRoomsOverviewWidget values ${JSON.stringify(this.state.values)");
        //console.log("HeatingRoomsOverviewWidget rxData ${JSON.stringify(this.state.rxData)");

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        //console.log(`heating time schedule: size ${size}`);

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            //console.log("nur content");
            return content;
        }

        //console.log("heating rooms overview: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}



