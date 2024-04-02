"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __importDefault(require("../Helpers/helper"));
const validateSchema = (req, res, next) => {
    const { error } = helper_1.default.validate(req.body);
    error ? res.status(400).json({ message: error.details[0].message }) : next();
};
exports.default = validateSchema;
