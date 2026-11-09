export function parseRooms(value: unknown): string[] {
    if (typeof value !== "string") {
        return [];
    }

    return [...new Set(value.split(";").map(room => room.trim()).filter(Boolean))];
}

export function getSelectedRoom(rooms: string[], selectedRoomValue: unknown): string {
    return typeof selectedRoomValue === "string" && rooms.includes(selectedRoomValue)
        ? selectedRoomValue
        : "";
}

export function writeSelectedRoom(
    room: string,
    rooms: string[],
    selectedRoomOid: string | undefined,
    editMode: boolean,
    setValue: (oid: string, value: string) => void,
): void {
    if (!editMode && room && selectedRoomOid && rooms.includes(room)) {
        setValue(selectedRoomOid, room);
    }
}
