import mongoose, {Schema} from "mongoose";
import IUser, { ERole } from "../interfaces/user.interface";

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    confirm_password: {
        type: String
    },
    role: {
        type: String,
        enum: Object.values(ERole),
        default: 'guest'
    }
})

const User = mongoose.model<IUser>('userSchema', userSchema)
export default User