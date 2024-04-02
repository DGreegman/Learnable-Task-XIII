import express, {Router} from "express";
import RoomsController from "../controllers/room.controller";
import validateToken from "../middlewares/validateToken";
import restrict from "../middlewares/restrict.middleware";

const roomsRoute: Router = express.Router()
const rooms = new RoomsController

roomsRoute.route('/').get(rooms.getAllRooms).post(validateToken, rooms.createRoom)
roomsRoute.route('/:id').get(rooms.getARoom).patch(validateToken, restrict('admin'), rooms.updateRoom).delete(validateToken, restrict('admin'), rooms.deleteRoom)

export default roomsRoute