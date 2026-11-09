import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSelectedRoom, parseRooms, writeSelectedRoom } from "./RoomSelectorLogic.ts";

describe("RoomSelector room list", () => {
    it("parses semicolon-separated room names and trims whitespace", () => {
        assert.deepEqual(
            parseRooms("Küche;Bad EG;Schlafzimmer;Bad OG;Wohnzimmer;Kinderzimmer"),
            ["Küche", "Bad EG", "Schlafzimmer", "Bad OG", "Wohnzimmer", "Kinderzimmer"],
        );
    });

    it("ignores empty entries and duplicate room names", () => {
        assert.deepEqual(parseRooms(" Küche ;;Bad EG; Küche ; ;Wohnzimmer;"), ["Küche", "Bad EG", "Wohnzimmer"]);
    });

    it("returns an empty list for missing or non-string state values", () => {
        assert.deepEqual(parseRooms(undefined), []);
        assert.deepEqual(parseRooms(null), []);
        assert.deepEqual(parseRooms(42), []);
    });
});

describe("RoomSelector selected room", () => {
    const rooms = ["Küche", "Bad EG", "Wohnzimmer"];

    it("shows the current selection when it exists in the room list", () => {
        assert.equal(getSelectedRoom(rooms, "Bad EG"), "Bad EG");
    });

    it("clears an absent, invalid, or non-string selection without choosing a fallback", () => {
        assert.equal(getSelectedRoom(rooms, "Schlafzimmer"), "");
        assert.equal(getSelectedRoom(rooms, undefined), "");
        assert.equal(getSelectedRoom(rooms, 1), "");
    });

    it("writes a valid selected room to the configured state", () => {
        const writes = [];
        writeSelectedRoom("Bad EG", rooms, "heatingcontrol.0.vis.ChoosenRoom", false, (oid, value) => {
            writes.push([oid, value]);
        });

        assert.deepEqual(writes, [["heatingcontrol.0.vis.ChoosenRoom", "Bad EG"]]);
    });

    it("does not write in edit mode or for empty, invalid, or unconfigured selections", () => {
        const writes = [];
        const setValue = (oid, value) => { writes.push([oid, value]); };

        writeSelectedRoom("Bad EG", rooms, "selectedRoom", true, setValue);
        writeSelectedRoom("", rooms, "selectedRoom", false, setValue);
        writeSelectedRoom("Unknown", rooms, "selectedRoom", false, setValue);
        writeSelectedRoom("Bad EG", rooms, undefined, false, setValue);

        assert.deepEqual(writes, []);
    });
});
