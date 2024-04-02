"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_type_model_1 = __importDefault(require("../models/room-type.model"));
class RoomsTypesController {
    // create A Room Type method
    createRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                if (!name) {
                    return res.status(400).json({
                        status: 'failed...',
                        message: "Enter the Room Name"
                    });
                }
                //  checking if the name starts with number, and preventing the user from submitting
                const numMatch = /^\d+/;
                if (numMatch.test(name)) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'Your Rooms Type must not start with a number...'
                    });
                }
                //  name must be at-least five characters 
                if (name.length < 5) {
                    return res.status(400).json({
                        data: {
                            status: 'failed...',
                            message: 'Hey!.... the Room Types name you provided is less than 5 Characters...'
                        }
                    });
                }
                //  checking for existing room 
                const existingRoomType = yield room_type_model_1.default.findOne({ name });
                if (existingRoomType) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'There is a Room Type with this name, Please Try another one...'
                    });
                }
                const roomType = yield room_type_model_1.default.create({ name });
                res.status(201).json({
                    status: 'success',
                    data: {
                        roomType
                    }
                });
            }
            catch (error) {
                console.log(error.name);
                res.status(500).json({
                    status: 'Error',
                    message: error.message,
                    name: error.name,
                    stackTrace: error.stack
                });
            }
        });
    }
    // method to get all the rooms available 
    getAllRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomsTypes = yield room_type_model_1.default.find({});
                if (!roomsTypes || roomsTypes.length === 0) {
                    return res.status(200).json({
                        status: 'No Rooms Types...',
                        message: 'Room Types have not been created Yet, kindly do so if you have the permission'
                    });
                }
                res.status(200).json({
                    status: 'Success...',
                    length: roomsTypes.length,
                    data: {
                        roomsTypes
                    }
                });
            }
            catch (error) {
                console.log(error.name);
                res.status(500).json({
                    status: 'Error',
                    message: error.message,
                    name: error.name
                });
            }
        });
    }
    // Delete all the Documents
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allRoomsTypes = yield room_type_model_1.default.deleteMany();
                res.status(204).json({ message: 'All Rooms Types Deleted Successfully...' });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 'Error',
                    message: 'An Unexpected Error Occurred...',
                    name: error.name,
                    stackTrace: error.stack
                });
            }
        });
    }
}
exports.default = RoomsTypesController;
