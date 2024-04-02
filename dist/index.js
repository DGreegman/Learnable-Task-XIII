"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const config_1 = __importDefault(require("./config/config"));
const room_type_route_1 = __importDefault(require("./routes/room-type.route"));
const room_route_1 = __importDefault(require("./routes/room.route"));
const CustomError_1 = __importDefault(require("./errors/CustomError"));
const error_handler_middleware_1 = __importDefault(require("./middlewares/error-handler.middleware"));
const user_route_1 = __importDefault(require("./routes/user.route"));
(0, dotenv_1.configDotenv)();
(0, config_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
// ROUTES
app.use('/api/v1/rooms-types', room_type_route_1.default);
app.use('/api/v1/rooms', room_route_1.default);
app.use('/api/v1/user', user_route_1.default);
// DEFAULT ROUTE 
app.use('*', (req, res, next) => {
    const error = new CustomError_1.default(`Oops... Seems Like the Route ${req.originalUrl} You are Looking For does not Exist`, 404);
    next(error);
});
app.use(error_handler_middleware_1.default);
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
