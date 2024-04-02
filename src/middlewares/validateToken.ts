import { configDotenv } from 'dotenv';
import CustomError from "../errors/CustomError";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

configDotenv()

interface DecodedToken {
    id: string
}

interface AuthenticatedRequest extends Request {
    user?: string; 
}
const validateToken = async(req:AuthenticatedRequest, res:Response, next: NextFunction) => {
    const testToken = req.headers.authorization || req.headers.Authorization 

    let token 
    if (typeof testToken === 'string' && testToken.startsWith('Bearer') ) {
        token = testToken.split(' ')[1]
    }

    if (!token) {
        return next(new CustomError('Sorry but it seems like you are not Logged in, Kindly Login and Try again', 401))
    }
    // console.log(token);

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        return next(new CustomError('Internal server error. Secret key not set.', 500));
    }
    // decode token 

    const decoded =  jwt.verify(token, secretKey) as DecodedToken
    // console.log(decoded)

    const user = await User.findById(decoded.id)

    if(!user){
        return next(new CustomError('Sorry it seems like the user with the given token does not exist', 401))
    }

    req.user = user._id.toString()

    next()
    
}

export default validateToken