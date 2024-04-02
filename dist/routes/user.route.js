"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validateUserInput_1 = __importDefault(require("../middlewares/validateUserInput"));
const userRoute = express_1.default.Router();
const user = new user_controller_1.default;
userRoute.route('/login').post(user.loginUser);
userRoute.route('/register').post(validateUserInput_1.default, user.registerUser);
exports.default = userRoute;
