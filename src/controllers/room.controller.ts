import { Request, Response } from "express";
import Rooms from "../models/room.model";


class RoomsController {

    // Method to get all the rooms available 
    async getAllRooms(req:Request, res:Response){

        const rooms = await Rooms.find({})
        try {
            // checking if the there is a room created already...
            if (!rooms || rooms.length === 0) {
                return res.status(404).json({
                    status: 'Fail', 
                    message: 'Sorry, but it seems like no room Have been created Yet.. kindly Do so if you have the Permission...'
                })
            }

            res.status(200).json({
                status: 'Success',
                data: {
                    rooms
                }
            })
            
        } catch (error : unknown | any ) {
            console.log(error.name)
            res.status(500).json({
                status: 'Error', 
                message: error.message,
                name: error.name,
                stackTrace: error.stack

            })
        }

    }

    async createRoom(req:Request, res:Response){
        try {
            const { name, price, roomsTypes } = req.body

            if (!name || !price || !roomsTypes) {
    
                return res.status(400).json({
                    status: 'Fail',
                    message: 'You must fill out all the provided field'
                })
            }
    
            // Room name starts with Room space before the accustomed number e.g Room 204
            const roomMatch = /^Room \d{3}$/
            if (!roomMatch.test(name)) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'Room Name must start with Room Followed by three Digits e.g Room 204'
                })
            }
    
            
            const rooms = new Rooms({ name, price, roomsTypes })
            
            // checking if a room exists 
            const roomExists = await Rooms.findOne({ name })
    
            if(roomExists){
                console.log(roomExists.name)
                return res.status(400).json({
                    status: 'Failed...',
                    message: `${roomExists.name} Already Exists Kindly Register a New Line...`
                })
    
            }
    
            // saving the room if all parameters are met
            await rooms.save()
            return res.status(201).json({
                status: "Success...",
                message: `${rooms.name} Created Successfully...`
            })

        } catch (error: unknown | any) {
            console.log(error.name)
            res.status(500).json({
                status: 'Error',
                message: error.message,
                name: error.name,
                stackTrace: error.stack
            })
        }


    }

    async getARoom(req:Request, res:Response){
        const { id } = req.params

        const room = await Rooms.findById(id)
        if(!room){
            return res.status(400).json({
                status: 'Failed...',
                message: 'Sorry...., but it seems like the room you requested does not exist...'
            })
        }
        res.status(200).json({
            status: 'Success...',
            data: {
                room
            }
        })


    }

    async updateRoom(req:Request, res:Response){
        const { id } = req.params
       const { name, price, roomType } = req.body
        try {
            const updatedRoom = await Rooms.findByIdAndUpdate(id, { name, price, roomType }, { new: true })

            if (!updatedRoom) {
            return res.status(400).json({
                    status: 'Failed...',
                    message: 'Could not find the Id to Update...'
                })
            }

            res.status(200).json({
                status: 'Success...',
                data: {
                    updatedRoom
                }
            })
        } catch (error : unknown | any ) {
            console.log(error.name)
            res.status(500).json({
                status: 'Error',
                message: error.message,
                name: error.name,
                stackTrace: error.stack
            })
        }

    }

    async deleteRoom(req:Request, res:Response){
        const { id } = req.params

        try {
            const deletedRoom = await Rooms.findByIdAndDelete(id)
            console.log(deletedRoom)
            if (!deletedRoom) {
                return  res.status(404).json({
                    status: 'Failed...', 
                    message: 'Failed to Delete with the ID Specified'
                })
            }

            res.status(200).json({
                status: 'Success...',
                message: 'Deleted Successfully...'
            })
        } catch (error : unknown | any ) {
            console.log(error.name)
            res.status(500).json({
                status: 'Error',
                message: error.message,
                name: error.name,
                stackTrace: error.stack
            })
        }

    }
}


export default RoomsController