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
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
class UserController {
    // Method for Registering a User
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confirm_password } = req.body;
            try {
                if (!name || !email || !password || !confirm_password) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'All the Field are Required..'
                    });
                }
                // checking if a user exists using the users email
                const existingUser = yield user_model_1.default.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'Sorry but it seems like the user with this email Exists, You can Login Instead'
                    });
                }
                // checking if the password and confirm_password field matched..
                if (password !== confirm_password) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'Sorry, Your Password Does Not Match, Please check and Try Again...'
                    });
                }
                // assigning roles to user who registered been guest or admin based on the email provided and hashing password
                let role = 'guest';
                const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
                if (email === 'obeagug@gmail.com' || email === 'graciousobeagu@gmail.com') {
                    role = 'admin';
                }
                // Saving the user after all the parameters are satisfied
                const user = new user_model_1.default({ name, email, password: hashedPassword, role });
                yield user.save();
                res.status(201).json({
                    status: 'Success...',
                    message: `User ${user.name} Created Successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 'Error',
                    message: error.message
                });
            }
        });
    }
    // login method 
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // checking if password and email field are empty
                if (!email || !password) {
                    res.status(400).json({
                        status: 'Failed...',
                        message: 'Email and Password Field are Required, kindly provide them'
                    });
                }
                // Checking if a user exists in the database using the users email
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({
                        status: 'failed...',
                        message: 'Sorry User does not Exist'
                    });
                }
                // comparing password provided and the password in the database
                const passwordCompare = bcryptjs_1.default.compareSync(password, user.password);
                if (!passwordCompare) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'Email or Password is Incorrect...'
                    });
                }
                // creating jwt token for authentication and authorization 
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1hr' });
                res.status(200).json({
                    status: 'Success',
                    token,
                    message: 'You have successfully Logged in...'
                });
            }
            catch (error) {
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
exports.default = UserController;
