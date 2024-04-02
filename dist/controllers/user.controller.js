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
                const existingUser = yield user_model_1.default.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'Sorry but it seems like the user with this email Exists, You can Login Instead'
                    });
                }
                if (password !== confirm_password) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'Sorry, Your Password Does Not Match, Please check and Try Again...'
                    });
                }
                let role = 'guest';
                const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
                if (email === 'obeagug@gmail.com' || email === 'graciousobeagu@gmail.com') {
                    role = 'admin';
                }
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
                    message: error.message,
                    name: error.name,
                    stackTrace: error.stack
                });
            }
        });
    }
    // get all users
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find({});
            if (!users || users.length === 0) {
                return res.status(404).json({
                    status: 'Failed...',
                    message: 'Sorry No Existing User'
                });
            }
            res.status(200).json({
                status: 'Success',
                data: {
                    users
                }
            });
        });
    }
    // login method 
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({
                        status: 'Failed...',
                        message: 'Email and Password Field are Required, kindly provide them'
                    });
                }
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({
                        status: 'failed...',
                        message: 'Sorry User does not Exist'
                    });
                }
                const passwordCompare = bcryptjs_1.default.compareSync(password, user.password);
                if (!passwordCompare) {
                    return res.status(400).json({
                        status: 'Failed...',
                        message: 'Email or Password is Incorrect...'
                    });
                }
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
    deleteAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDeleted = yield user_model_1.default.deleteMany();
            if (!userDeleted) {
                return res.status(404).json({
                    status: 'Failed...',
                    message: 'No User Found....'
                });
            }
            res.status(204).json({
                status: 'Success',
                message: 'All Users Deleted Successfully...'
            });
        });
    }
}
exports.default = UserController;
