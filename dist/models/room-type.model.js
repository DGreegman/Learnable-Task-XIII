"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomsTypesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const RoomsTypes = (0, mongoose_1.model)('roomsTypes', roomsTypesSchema);
exports.default = RoomsTypes;
