import express, { Router } from "express";
import UserController from "../controllers/user.controller";
import validateSchema from "../middlewares/validateUserInput";

const userRoute:Router = express.Router()
const user = new UserController



userRoute.route('/login').post(user.loginUser)
userRoute.route('/register').post(validateSchema, user.registerUser)

export default userRoute