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
const dotenv_1 = require("dotenv");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
(0, dotenv_1.configDotenv)();
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const testToken = req.headers.authorization || req.headers.Authorization;
    let token;
    if (typeof testToken === 'string' && testToken.startsWith('Bearer')) {
        token = testToken.split(' ')[1];
    }
    if (!token) {
        return next(new CustomError_1.default('Sorry but it seems like you are not Logged in, Kindly Login and Try again', 401));
    }
    // console.log(token);
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        return next(new CustomError_1.default('Internal server error. Secret key not set.', 500));
    }
    // decode token 
    const decoded = jsonwebtoken_1.default.verify(token, secretKey);
    // console.log(decoded)
    const user = yield user_model_1.default.findById(decoded.id);
    if (!user) {
        return next(new CustomError_1.default('Sorry it seems like the user with the given token does not exist', 401));
    }
    req.user = user._id.toString();
    next();
});
exports.default = validateToken;
