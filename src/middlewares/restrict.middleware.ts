import CustomError from "../errors/CustomError";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

/* 
    function that allows only the admins to perform certain task like, delete and edit
*/
/* interface AuthenticatedRequest extends Request {
    user: User; 
} */
const restrict = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Find the user with the specified role
            const user = await User.findOne({ role });

            if (!user) {
                return next(new CustomError('User not found', 404));
            }
        
            // Check if the user's role matches the required role
            if (user.role !== role) {
                return next(new CustomError('You do not have permission to perform this action', 403));
            }

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error(error);
            return next(new CustomError('An error occurred while checking user role', 500));
        }
    };
};



export default restrict