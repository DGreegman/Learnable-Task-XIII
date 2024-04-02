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
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const user_model_1 = __importDefault(require("../models/user.model"));
/*
    function that allows only the admins to perform certain task like, delete and edit
*/
/* interface AuthenticatedRequest extends Request {
    user: User;
} */
const restrict = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Find the user with the specified role
            const user = yield user_model_1.default.findOne({ role });
            if (!user) {
                return next(new CustomError_1.default('User not found', 404));
            }
            // Check if the user's role matches the required role
            if (user.role !== role) {
                return next(new CustomError_1.default('You do not have permission to perform this action', 403));
            }
            // Proceed to the next middleware or route handler
            next();
        }
        catch (error) {
            console.error(error);
            return next(new CustomError_1.default('An error occurred while checking user role', 500));
        }
    });
};
exports.default = restrict;
