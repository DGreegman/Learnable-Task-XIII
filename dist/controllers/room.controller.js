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
const room_model_1 = __importDefault(require("../models/room.model"));
class RoomsController {
    // Method to get all the rooms available 
    getAllRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield room_model_1.default.find({});
            try {
                // checking if the there is a room created already...
                if (!rooms || rooms.length === 0) {
                    return res.status(404).json({
                        status: 'Fail',
                        message: 'Sorry, but it seems like no room Have been created Yet.. kindly Do so if you have the Permission...'
                    });
                }
                res.status(200).json({
                    status: 'Success',
                    data: {
                        rooms
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
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, roomsTypes } = req.body;
                if (!name || !price || !roomsTypes) {
                    return res.status(400).json({
                        status: 'Fail',
                        message: 'You must fill out all the provided field'
                    });
                }
                // Room name starts with Room space before the accustomed number e.g Room 204
                const roomMatch = /^Room \d{3}$/;
                if (!roomMatch.test(name)) {
                    return res.status(400).json({
                        status: 'Fail',
                        message: 'Room Name must start with Room Followed by three Digits e.g Room 204'
                    });
                }
                const rooms = new room_model_1.default({ name, price, roomsTypes });
                // checking if a room exists 
                const roomExists = yield room_model_1.default.findOne({ name });
                if (roomExists) {
                    console.log(roomExists.name);
                    return res.status(400).json({
                        status: 'Failed...',
                        message: `${roomExists.name} Already Exists Kindly Register a New Line...`
                    });
                }
                // saving the room if all parameters are met
                yield rooms.save();
                return res.status(201).json({
                    status: "Success...",
                    message: `${rooms.name} Created Successfully...`
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
    getARoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const room = yield room_model_1.default.findById(id);
            if (!room) {
                return res.status(400).json({
                    status: 'Failed...',
                    message: 'Sorry...., but it seems like the room you requested does not exist...'
                });
            }
            res.status(200).json({
                status: 'Success...',
                data: {
                    room
                }
            });
        });
    }
    updateRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, price, roomType } = req.body;
            try {
                const updatedRoom = yield room_model_1.default.findByIdAndUpdate(id, { name, price, roomType }, { new: true });
                if (!updatedRoom) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'Could not find the Id to Update...'
                    });
                }
                res.status(200).json({
                    status: 'Success...',
                    data: {
                        updatedRoom
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
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedRoom = yield room_model_1.default.findByIdAndDelete(id);
                console.log(deletedRoom);
                if (!deletedRoom) {
                    return res.status(404).json({
                        status: 'Failed...',
                        message: 'Failed to Delete with the ID Specified'
                    });
                }
                res.status(200).json({
                    status: 'Success...',
                    message: 'Deleted Successfully...'
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
}
exports.default = RoomsController;
