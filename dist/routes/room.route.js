"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = __importDefault(require("../controllers/room.controller"));
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const restrict_middleware_1 = __importDefault(require("../middlewares/restrict.middleware"));
const roomsRoute = express_1.default.Router();
const rooms = new room_controller_1.default;
roomsRoute.route('/').get(rooms.getAllRooms).post(validateToken_1.default, rooms.createRoom);
roomsRoute.route('/:id').get(rooms.getARoom).patch(validateToken_1.default, (0, restrict_middleware_1.default)('admin'), rooms.updateRoom).delete(validateToken_1.default, (0, restrict_middleware_1.default)('admin'), rooms.deleteRoom);
exports.default = roomsRoute;
