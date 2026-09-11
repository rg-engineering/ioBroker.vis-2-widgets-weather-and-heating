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
    instance: string;
    MessageType: string;

}

interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
}

export default class InformMyLandlordWidget extends Generic<StaticRxData, StaticState> {
    private readonly refCardContent: React.RefObject<HTMLDivElement> = React.createRef();
    private lastRxData: string | undefined;
    private updateTimeout: ReturnType<typeof setTimeout> | undefined;
    private messageInputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement> = React.createRef();
    private priorityInputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement> = React.createRef();

    constructor(props: VisRxWidgetProps) {
        super(props);
        this.refCardContent = React.createRef();
        this.messageInputRef = React.createRef();
        this.priorityInputRef = React.createRef();
    }

    static getWidgetInfo(): RxWidgetInfo {
        return {
            id: "tplInformMyLandlordWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

           
            visName: "InformMyLandlordWidgetWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-InformMyLandlord", // Label of widget
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
                            name: "MessageType",    // name in data structure
                            label: "MessageType", // translated field label
                            type: "select",
                            options: [
                                {
                                    value: "email",
                                    label: "Email"
                                },
                                {
                                    value: "whatsapp",
                                    label: "WhatsApp"
                                },
                                {
                                    value: "signal",
                                    label: "Signal"
                                },
                                {
                                    value: "pushbullet",
                                    label: "Pushbullet"
                                },
                                {
                                    value: "jira",
                                    label: "Jira"
                                },
                            ],
                            default: "email",
                        },

                        {
                            name: "instance",    // name in data structure
                            label: "instance", // translated field label
                            type: "instance",
                            default: "email.0",
                            //onChange: setDataStructures,
                        },
                    ],
                },








                
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-InformMyLandlord.png",
        };
    }


    // Do not delete this method. It is used by vis to read the widget configuration.
    getWidgetInfo(): RxWidgetInfo {
    return InformMyLandlordWidget.getWidgetInfo();
    }


    onSend = async (): Promise<void> => {
        const message = this.messageInputRef.current ? (this.messageInputRef.current as HTMLInputElement).value : "";
        const priority = this.priorityInputRef.current ? (this.priorityInputRef.current as HTMLInputElement).value : "information";
        console.log(`InformMyLandlordWidget: Send clicked, priority: ${priority}, message: ${message} with MessageType: ${this.state.rxData["MessageType"]} to instance: ${this.state.rxData["instance"]}`);


        if (this.state.rxData["MessageType"] == "email" && this.state.rxData["instance"].startsWith("email.")) {
            const result = await this.props.context.socket.sendTo(this.state.rxData["instance"], "send", message);
            console.log(`InformMyLandlordWidget: Email send result: ${JSON.stringify(result)}`);
        } else if (this.state.rxData["MessageType"] == "whatsapp") {
            console.log(`InformMyLandlordWidget: whatsapp not implemented yet`);
        } else if (this.state.rxData["MessageType"] == "signal") {
            console.log(`InformMyLandlordWidget: signal not implemented yet`);
        } else if (this.state.rxData["MessageType"] == "pushbullet") {
            console.log(`InformMyLandlordWidget: pushbullet not implemented yet`);
        } else if (this.state.rxData["MessageType"] == "jira") {
            console.log(`InformMyLandlordWidget: jira not implemented yet`);
        } else {
            console.log(`InformMyLandlordWidget: unknown MessageType: ${this.state.rxData["MessageType"]} or wrong instance: ${this.state.rxData["instance"]}`);
        }
    }



    createView(): React.JSX.Element {

        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >
            <div style={styles.inlineRow}>
                <TextField
                    select
                    inputRef={this.priorityInputRef}
                    defaultValue="information"
                    label="Priority"
                    variant="outlined"
                    size="small"
                    style={{ minWidth: 160 }}
                >
                    <MenuItem value="information">{Generic.t("information")}</MenuItem>
                    <MenuItem value="important">{Generic.t("important")}</MenuItem>
                    <MenuItem value="urgent">{Generic.t("urgent")}</MenuItem>
                </TextField>

                <TextField
                    inputRef={this.messageInputRef}
                    label="Message"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={6}
                />



                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onSend}
                >
                    {Generic.t("send")}
                </Button>
            </div>
        </div>;
    }

    

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
        super.renderWidgetBody(props);

    console.log(`InformMyLandlordWidget values ${JSON.stringify(this.state.values)}`);
    console.log(`InformMyLandlordWidget rxData ${JSON.stringify(this.state.rxData)}`);

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`InformMyLandlordWidget: size ${size}`);

        const content = this.createView();


        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

    console.log("InformMyLandlordWidget: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}