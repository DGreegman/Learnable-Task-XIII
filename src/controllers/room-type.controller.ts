import { Request, Response } from "express";
import RoomsTypes from "../models/room-type.model";

class RoomsTypesController {

    // create A Room Type method
    async createRoomType(req:Request, res:Response){
        const { name } = req.body
        try {
            if(!name) {
                return res.status(400).json({
                 status: 'failed...',
                 message:"Enter the Room Name"
             })}

            //  checking if the name starts with number, and preventing the user from submitting
            const numMatch =  /^\d+/
            if(numMatch.test(name)) {
                return res.status(400).json({
                    status: 'Failed...',
                    message: 'Your Rooms Type must not start with a number...'
                })
            }
            //  name must be at-least five characters 

             if (name.length < 5) {
                 return res.status(400).json({
                    data:{

                        status: 'failed...',
                        message: 'Hey!.... the Room Types name you provided is less than 5 Characters...'
                    }
                 })
             }

            //  checking for existing room 
            const existingRoomType = await RoomsTypes.findOne({ name })
            if(existingRoomType){
                return res.status(400).json({
                    status: 'Failed...',
                    message: 'There is a Room Type with this name, Please Try another one...'
                })
            }
             const roomType =  await RoomsTypes.create({name})
     
             res.status(201).json({
                 status: 'success', 
                 data: {
                     roomType
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

    
    // method to get all the rooms available 
    async getAllRoomType(req:Request, res:Response){

        try {
            const roomsTypes = await RoomsTypes.find({})

        if (!roomsTypes || roomsTypes.length === 0) {
            return res.status(200).json({
                status: 'No Rooms Types...',
                message: 'Room Types have not been created Yet, kindly do so if you have the permission'
            })
        }
        res.status(200).json({
            status: 'Success...',
            length: roomsTypes.length,
            data: {
                roomsTypes
            }
        })
        } catch (error: unknown | any) {
            console.log(error.name)
            res.status(500).json({
                status: 'Error', 
                message: error.message,
                name: error.name
            })
        }

        
    }

}

export default RoomsTypesController