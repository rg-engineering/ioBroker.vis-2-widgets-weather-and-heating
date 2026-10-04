/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { type CSSProperties } from 'react';
import type {
    RxRenderWidgetProps,
    RxWidgetInfo,
    VisRxWidgetProps,
    VisRxWidgetState,
} from '@iobroker/types-vis-2';
//import type { LegacyConnection } from '@iobroker/adapter-react-v5';
import Generic from "./Generic";






import {
    TextField,
    Button,
    MenuItem
} from "@mui/material";

const styles: Record<string, CSSProperties> = {
    cardContent: {
        flex: 1,
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
    inlineRow: {
        display: "flex",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
};

interface StaticRxData {
    noCard: boolean;
    
}

interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
}

export default class RoomSelectorWidget extends Generic<StaticRxData, StaticState> {
    private readonly refCardContent: React.RefObject<HTMLDivElement> = React.createRef();
    private lastRxData: string | undefined;
    private updateTimeout: ReturnType<typeof setTimeout> | undefined;
    

    constructor(props: VisRxWidgetProps) {
        super(props);
        this.refCardContent = React.createRef();
        
    }

    static getWidgetInfo(): RxWidgetInfo {
        return {
            id: "tplRoomSelectorWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

           
            visName: "RoomSelectorWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-RoomSelector", // Label of widget
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
                            name: "oid_values",    // name in data structure
                            label: "oidvalues", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.info.UsedRooms",
                        },
                        {
                            name: "oid_selectedroom",    // name in data structure
                            label: "oidselectedroom", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.ChoosenRoom",
                        },
                    ],
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-RoomSelector.png",
        };
    }


    // Do not delete this method. It is used by vis to read the widget configuration.
    getWidgetInfo(): RxWidgetInfo {
    return RoomSelectorWidget.getWidgetInfo();
    }


    createView(): React.JSX.Element {

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div style={styles.inlineRow}>
                
            </div>
        </div>;
    }

    

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
        super.renderWidgetBody(props);

    console.log(`RoomSelectorWidget values ${JSON.stringify(this.state.values)}`);
    console.log(`RoomSelectorWidget rxData ${JSON.stringify(this.state.rxData)}`);

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`RoomSelectorWidget: size ${size}`);

        const content = this.createView();


        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

    console.log("RoomSelectorWidget: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}