import React from "react";
import PropTypes from "prop-types";

import Generic from "./Generic";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";


const styles = {
    cardContent: {
        flex: 1,
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
    },
};



//todo Image sollte in gleicher Zeile wie Raum, Uhrzeit sollte kleinere Schrift
//todo Anzeige Anzahl offener Fenster fehlt

//todo Übersetzungen



const setDataStructures = async (field, data, changeData, socket) => {

    console.log(`set new datastructure instance ${data["instance"]}` );

    const instance = data["instance"];

    if (instance && instance.length > 0 && instance.includes("heatingcontrol") ) {

        data["oid_WindowStatesHtmlTable"] = `${instance}.vis.WindowStatesHtmlTableVis2`;
        data["oid_OpenWindowRoomCount"] = `${instance}.vis.OpenWindowRoomCount`;
    }
    changeData(data);
};


class HeatingWindowStatusOverviewWidget extends (Generic) {
    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
    }

    static getWidgetInfo() {
        return {
            id: "tplHeatingWindowStatusOverviewWidget",                 // Unique widget type ID. Should start with `tpl` followed
            visSet: "vis-2-widgets-heating",        // Unique ID of widget set

            //visset -> see HeatingGeneralParamsWidget
            //visSetLabel: "vis-2-widgets-heating",   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: "#cf00ff",                 // Color of widget set. it is enough to set color only in one widget of set
            visName: "HeatingWindowStatusOverviewWidget",                     // Name of widget
            visWidgetLabel: "vis_2_widgets-HeatingWindowStatusOverview", // Label of widget
            visWidgetColor: "#005cc4",               // Optional widget color. If not set, default color of widget set will be used.
            visResizeLocked: false,                   // require, that width is always equal to height
            visResizable: true,                     // widget is not resizable
            visDraggable: true,                     // widget is not draggable
            visAttrs: [
                {
                    // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
                    name: "common", // group name
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
                    name: "OIDS_General", // group name
                    fields: [
                        {
                            name: "oid_WindowStatesHtmlTable",    // name in data structure
                            label: "widgets_heating_label_windowsstateshtmltable", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.WindowStatesHtmlTableVis2",
                        },
                        {
                            name: "oid_OpenWindowRoomCount",    // name in data structure
                            label: "widgets_heating_label_openwindowsstatescount", // translated field label
                            type: "id",
                            default: "heatingcontrol.0.vis.OpenWindowRoomCount",
                        },
                    ],
                },
            ],
            visPrev: "widgets/vis-2-widgets-weather/img/vis-widget-HeatingWindowStatusOverview.png",
        };
    }


    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return HeatingWindowStatusOverviewWidget.getWidgetInfo();
    }

    createTable() {

        const htmlTable = this.state.values[`${this.state.rxData["oid_WindowStatesHtmlTable"]}.val`];
        console.log("###html " + htmlTable);

        if (htmlTable != null && typeof htmlTable === "string" && htmlTable.length > 5) {

            const data = JSON.parse(htmlTable);

            console.log("###html " + htmlTable + " " + data.length + " " + JSON.stringify(data));

            /* old version
            < div class="mdui-listitem mdui-center-v mdui-red-bg" style = "height:48px;" > 
                <img height=40px src = "/vis.0/HeatingControl/images/fts_window_1w_open.svg" ></img > 
                    <div class="mdui-label">TestRaum
                        <div class="mdui-subtitle">seit 25 Jul 2024 21:11:07</div>
                    </div>
             </div >
             */

            /* new version
    
            [{ "room": "TestRaum", "sinceText": "seit", "icon": "/vis.0/HeatingControl/images/fts_window_1w_open.svg", "changed": "28 Jul 2024 08:46:44" }]
            */


            const content = <div
                ref={this.refCardContent}
                style={styles.cardContent}
            >

                <div>
                    <p>{Generic.t("Window Status Overview")}</p>
                </div>

                < List sx={{ width: '100 % ', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {data.map((roomData, i) => {

                        return <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <img
                                        src={roomData.icon}
                                        height='40px' >
                                    </img>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={roomData.room}
                                secondary={roomData.sinceText + " " + roomData.changed}
                                primaryTypographyProps={{
                                    color: roomData.isOpen ? 'red' : 'black',
                                }}
                            />
                        </ListItem >

                    })}
                </List >
            </div>;


            /*
             const content = <div
                 ref={this.refCardContent}
                 style={styles.cardContent}
             >
     
                 <div>
                     <p>{Generic.t("Window Status Overview")}</p>
                 </div>
     
     
     
                
                 < List sx = {{ width: '100 % ', maxWidth: 360, bgcolor: 'background.paper' }  }>
                     <ListItem>
                         <ListItemAvatar>
                             <Avatar>
                                 <img 
                                     src='/vis.0/HeatingControl/images/fts_window_1w_open.svg' 
                                     height='40px' >
                                 </img>
                             </Avatar>
                         </ListItemAvatar>
                         <ListItemText
                             primary='TestRaum'
                             secondary='seit 26 Jul 2024 21:36:13'
                             primaryTypographyProps={{
                                 color: 'black',
                             }}
                         />
                     </ListItem >
                 </List >
     
                 
     
             </div>;
             */
            return content;
        }

        return null;

        
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        console.log("HeatingWindowStatusOverviewWidget values ${JSON.stringify(this.state.values)");
        console.log("HeatingWindowStatusOverviewWidget rxData ${JSON.stringify(this.state.rxData)");

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log("heating window states overview: size " + size);

        const content = this.createTable();

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("heating window states overview: wrap content");

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}

HeatingWindowStatusOverviewWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default HeatingWindowStatusOverviewWidget;

