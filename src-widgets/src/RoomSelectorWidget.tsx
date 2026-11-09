import React, { type CSSProperties } from 'react';
import type {
    RxRenderWidgetProps,
    RxWidgetInfo,
    VisRxWidgetState,
} from '@iobroker/types-vis-2';
import Generic from "./Generic";
import { MenuItem, TextField } from "@mui/material";
import { getSelectedRoom, parseRooms, writeSelectedRoom } from "./RoomSelectorLogic";

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
    noCard?: boolean;
    oid_values?: string;
    oid_selectedroom?: string;
}

export default class RoomSelectorWidget extends Generic<StaticRxData, VisRxWidgetState> {
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


    private getRooms(): string[] {
        const valuesOid = this.state.rxData.oid_values;
        if (!valuesOid) {
            return [];
        }

        return parseRooms(this.state.values[`${valuesOid}.val`]);
    }

    private onRoomChange(room: string): void {
        writeSelectedRoom(
            room,
            this.getRooms(),
            this.state.rxData.oid_selectedroom,
            this.props.editMode,
            (oid, value) => this.props.context.setValue(oid, value),
        );
    }

    createView(): React.JSX.Element {
        const rooms = this.getRooms();
        const selectedRoomOid = this.state.rxData.oid_selectedroom;
        const selectedRoomValue = selectedRoomOid
            ? this.state.values[`${selectedRoomOid}.val`]
            : undefined;
        const selectedRoom = getSelectedRoom(rooms, selectedRoomValue);

        return <div style={styles.cardContent}>
            <div style={styles.inlineRow}>
                <TextField
                    select
                    fullWidth
                    size="small"
                    label="Room"
                    value={selectedRoom}
                    disabled={this.props.editMode || rooms.length === 0 || !selectedRoomOid}
                    onChange={event => this.onRoomChange(event.target.value)}
                >
                    <MenuItem value="" disabled>
                        {rooms.length > 0 ? "Select a room" : "No rooms available"}
                    </MenuItem>
                    {rooms.map(room => <MenuItem key={room} value={room}>{room}</MenuItem>)}
                </TextField>
            </div>
        </div>;
    }

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element | React.JSX.Element[] | null {
        super.renderWidgetBody(props);

        const content = this.createView();
        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            return content;
        }

        return this.wrapContent(content, null, { textAlign: "center" });
    }
}