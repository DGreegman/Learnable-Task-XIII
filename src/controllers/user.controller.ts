import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt,{hashSync, compare} from "bcryptjs";
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";

configDotenv()

class UserController {
    
    async registerUser(req: Request, res:Response ){
        const { name, email, password, confirm_password} = req.body

        try {
            if (!name || !email || !password || !confirm_password) {

                return res.status(400).json({
                    status: 'Failed...',
                    message: 'All the Field are Required..'
                })
                
            }
    
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(400).json({
                    status: 'Failed...',
                    message: 'Sorry but it seems like the user with this email Exists, You can Login Instead'
                })
            }
    
            if (password !== confirm_password) {
                return res.status(400).json({
                    status: 'Failed...', 
                    message: 'Sorry, Your Password Does Not Match, Please check and Try Again...'
                })
            }
    
            let role = 'guest'
            const hashedPassword = bcrypt.hashSync(password, 10)
    
            if(email === 'obeagug@gmail.com' || email === 'graciousobeagu@gmail.com'){
                role = 'admin'
            }
    
            
    
            const user = new User({name, email, password:hashedPassword, role})
            await user.save()
            res.status(201).json({
                status: 'Success...',
                message: `User ${user.name} Created Successfully`
            })
        } catch (error:unknown | any) {
            res.status(500).json({
                status: 'Error',
                message: error.message,
                name: error.name,
                stackTrace: error.stack
            })
        }


    }

    // get all users
    async getAllUsers(req:Request, res:Response){
        const users = await User.find({})
        if (!users || users.length === 0) {
            return res.status(404).json({
                status: 'Failed...',
                message: 'Sorry No Existing User'
            })
        }

        res.status(200).json({
            status: 'Success',
            data: {
                users
            }
        })


    }

    // login method 

    async loginUser(req: Request, res:Response){
        try {
            const {email, password } = req.body 

            if(!email || !password){
                res.status(400).json({
                    status: 'Failed...', 
                    message: 'Email and Password Field are Required, kindly provide them'
                })
            }
    
            const user = await User.findOne({ email })
            if(!user){
                return res.status(404).json({
                    status: 'failed...', 
                    message: 'Sorry User does not Exist'
                })
            }
    
            const passwordCompare = bcrypt.compareSync(password, user.password)
    
            if(!passwordCompare){
                return res.status(400).json({
                    status: 'Failed...',
                    message: 'Email or Password is Incorrect...'
                })
            }

            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY as string, { expiresIn: '1hr'})
            res.status(200).json({
                status: 'Success',
                token,
                message: 'You have successfully Logged in...'
            })
            
        } catch (error : unknown | any ) {
            res.status(500).json({
                status: 'Error',
                message: error.message,
                name: error.name,
                stackTrace: error.stack
            })

            
        }

    }

    async deleteAllUsers(req:Request, res:Response){
        const userDeleted = await User.deleteMany()
        if (!userDeleted) {
           return res.status(404).json({
                status: 'Failed...',
                message: 'No User Found....'
            })
        }
        res.status(204).json({
            status: 'Success', 
            message: 'All Users Deleted Successfully...'
        })
    }
}

export default UserController