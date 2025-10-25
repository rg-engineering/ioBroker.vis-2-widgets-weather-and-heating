/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/dot-notation */
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

// todo oid nach Instanz neu belegen
// todo reload script after timeout or reopen


const setDataStructures = async (
    field: RxWidgetInfoAttributesField,
    data: WidgetData,
    changeData: (newData: WidgetData) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket: LegacyConnection
    // eslint-disable-next-line @typescript-eslint/require-await
): Promise<void> => {
    console.log(`WeatherMeteoredWidget - set new datastructure ` );


    changeData(data);
};


interface StaticRxData {
    noCard: boolean;
    WidgetID: string;
    EnableReload: boolean;
}

interface StaticState extends VisRxWidgetState {
    showDialog: number | null;
    objects: { common: ioBroker.StateCommon; _id: string; isChart: boolean }[];
    reloadTimer: NodeJS.Timeout | null;
}

export default class WeatherMeteoredWidget extends Generic<StaticRxData, StaticState> {
    private readonly refCardContent: React.RefObject<HTMLDivElement> = React.createRef();

    private reloadTimer: ReturnType<typeof setTimeout> | null = null;

    constructor(props: VisRxWidgetProps) {
        super(props);
        this.refCardContent = React.createRef();

        this.state = {
            ...this.state,
            
        };
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async componentDidMount() : Promise<void>{

        super.componentDidMount();

        console.log(`WeatherMeteoredWidget - componentDidMount ` );

        this.AppendScript();

        this.CreateTimer();
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async componentWillUnmount() : Promise<void>{
        super.componentWillUnmount();
        console.log("WeatherMeteoredWidget - componentWillUnmount");
        if (this.reloadTimer != null) {
            clearTimeout(this.reloadTimer);
            this.reloadTimer = null;
        }
        const WidgetID = this.state.rxData["WidgetID"];
        const id = "script_mrwid" + WidgetID;
        // Prüfen, ob das Skript bereits geladen wurde
        if (document.getElementById(id)) {
            console.log(`WeatherMeteoredWidget - script already loaded, need to remove `);
            const element = document.getElementById(id);
            if (element != null) {
                element.remove();
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async onPropertyUpdate():Promise<void> {

        console.log("WeatherMeteoredWidget - onPropertyUpdate");

        this.CreateTimer();
    }

    CreateTimer():void {
        if (this.state.rxData.EnableReload) {

            console.log("WeatherMeteoredWidget - create intervall timer");
            //only once per hour
            const refreshInterval = 1000 * 60 * 60;

            if (this.reloadTimer != null) {
                clearTimeout(this.reloadTimer);
                this.reloadTimer = null;
            }

            this.reloadTimer = setInterval(() => {
                console.log("WeatherMeteoredWidget - reload script");
                this.AppendScript();
            }, refreshInterval);

        } else {
            console.log("WeatherMeteoredWidget - clear intervall timer");
            if (this.reloadTimer != null) {
                clearTimeout(this.reloadTimer);
                this.reloadTimer = null;
            }
        }
    }

    AppendScript():void {
        const WidgetID = this.state.rxData["WidgetID"];

        const src = "https://api.meteored.com/widget/loader/" + WidgetID;
        const id = "script_mrwid" + WidgetID;

        //const html = "<script type='text/javascript' async src=" + src + " onLoad={() => console.log('Meteored script loaded')}></script >";

        // Prüfen, ob das Skript bereits geladen wurde
        if (document.getElementById(id)) {
            console.log(`WeatherMeteoredWidget - script already loaded, need to remove `);

            const element = document.getElementById(id);
            if (element!=null) {
                element.remove();
            }
        }

        console.log(`WeatherMeteoredWidget - script new created `);
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = true;
        document.body.appendChild(script);
    }

    static getWidgetInfo(): RxWidgetInfo {
        return {
            id: "tplWeatherMeteoredWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-weather-and-heating",        // Unique ID of widget set

            //visset -> see HeatingGeneralParamsWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "WeatherMeteoredWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-WeatherMeteoredWidget", // Label of widget
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
                            name: "WidgetID",    // name in data structure
                            label: "MeteoredWidgetID", // translated field label
                            type: "text",
                            default: "",
                            onChange: setDataStructures,
                            tooltip: "MeteoredWidgetID_tooltip",
                        },
                        {
                            name: "EnableReload",    // name in data structure
                            label: "ReloadEnabled", // translated field label
                            type: "checkbox",
                            default: true,
                            tooltip: "MeteoredWidgetEnableReload_tooltip",
                        },
                    ],
                },
                
            ],
            visPrev: "widgets/vis-2-widgets-weather-and-heating/img/vis-widget-WeatherMeteored.png",
        };
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    getWidgetInfo(): RxWidgetInfo {
        return WeatherMeteoredWidget.getWidgetInfo();
    }

    createTable(): JSX.Element {

        const WidgetID = this.state.rxData["WidgetID"];
        const id = "mrwid" + WidgetID;


        return <div
            ref={this.refCardContent}
            style={styles.cardContent}
        >

            <div id={id}>

            </div>


        </div>;
    }

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
        super.renderWidgetBody(props);

        console.log(`WeatherMeteoredWidget - renderWidgetBody `);

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log(`WeatherMeteoredWidget - renderWidgetBody size ${size}`);
      

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("WeatherMeteoredWidget - content only");
            return content;
        }



        return this.wrapContent(content, null, { textAlign: "center" });
    }
}



