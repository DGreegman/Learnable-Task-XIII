import express, {Router } from 'express'
import RoomsTypesController from '../controllers/room-type.controller'
import validateToken from '../middlewares/validateToken'

const roomsTypesRoute: Router = express.Router()
const roomsTypes = new RoomsTypesController


// route for creating and getting rooms types
roomsTypesRoute.route('/')
.get(roomsTypes.getAllRoomType)
.post(validateToken, roomsTypes.createRoomType)



export default roomsTypesRoute 