import authSchema from "../Helpers/helper";
import { Request, Response, NextFunction } from "express";

const validateSchema = (req: Request, res: Response, next: NextFunction ) =>{
    const { error } = authSchema.validate(req.body)
    error ? res.status(400).json({message: error.details[0].message}) : next()
}

export default validateSchema