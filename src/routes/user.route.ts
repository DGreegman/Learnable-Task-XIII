import express, { Router } from "express";
import UserController from "../controllers/user.controller";
import validateToken from "../middlewares/validateToken";
import validateSchema from "../middlewares/validateUserInput";

const userRoute:Router = express.Router()
const user = new UserController

userRoute.route('/')
.get(validateToken, user.getAllUsers)
.delete(user.deleteAllUsers)


userRoute.route('/login').post(user.loginUser)
userRoute.route('/register').post(validateSchema, user.registerUser)

export default userRoute