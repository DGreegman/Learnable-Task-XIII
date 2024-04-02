"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_type_controller_1 = __importDefault(require("../controllers/room-type.controller"));
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const roomsTypesRoute = express_1.default.Router();
const roomsTypes = new room_type_controller_1.default;
// route for creating and getting rooms types
roomsTypesRoute.route('/')
    .get(roomsTypes.getAllRoomType)
    .post(validateToken_1.default, roomsTypes.createRoomType);
exports.default = roomsTypesRoute;
