import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt,{hashSync, compare} from "bcryptjs";
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";

configDotenv()

class UserController {
    
    // Method for Registering a User
    async registerUser(req: Request, res:Response ){
        const { name, email, password, confirm_password} = req.body

        try {
            if (!name || !email || !password || !confirm_password) {

                return res.status(400).json({
                    status: 'Failed...',
                    message: 'All the Field are Required..'
                })
                
            }
            // checking if a user exists using the users email
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(400).json({
                    status: 'Failed...',
                    message: 'Sorry but it seems like the user with this email Exists, You can Login Instead'
                })
            }
            
            // checking if the password and confirm_password field matched..
            if (password !== confirm_password) {
                return res.status(400).json({
                    status: 'Failed...', 
                    message: 'Sorry, Your Password Does Not Match, Please check and Try Again...'
                })
            }
            
            // assigning roles to user who registered been guest or admin based on the email provided and hashing password
            let role = 'guest'
            const hashedPassword = bcrypt.hashSync(password, 10)
    
            if(email === 'obeagug@gmail.com' || email === 'graciousobeagu@gmail.com'){
                role = 'admin'
            }
    
            
            // Saving the user after all the parameters are satisfied
    
            const user = new User({name, email, password:hashedPassword, role})
            await user.save()
            res.status(201).json({
                status: 'Success...',
                message: `User ${user.name} Created Successfully`
            })
        } catch (error:unknown | any) {
            res.status(500).json({
                status: 'Error',
                message: error.message
            })
        }


    }


    // login method 

    async loginUser(req: Request, res:Response){
        try {
            const {email, password } = req.body 

            // checking if password and email field are empty
            if(!email || !password){
                res.status(400).json({
                    status: 'Failed...', 
                    message: 'Email and Password Field are Required, kindly provide them'
                })
            }
            
            // Checking if a user exists in the database using the users email
            const user = await User.findOne({ email })
            if(!user){
                return res.status(404).json({
                    status: 'failed...', 
                    message: 'Sorry User does not Exist'
                })
            }
            
            // comparing password provided and the password in the database
            const passwordCompare = bcrypt.compareSync(password, user.password)
    
            if(!passwordCompare){
                return res.status(400).json({
                    status: 'Failed...',
                    message: 'Email or Password is Incorrect...'
                })
            }

            // creating jwt token for authentication and authorization 
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

}

export default UserController