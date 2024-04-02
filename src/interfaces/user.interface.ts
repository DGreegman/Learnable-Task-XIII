import { Document } from "mongoose";

enum ERole {
    admin = 'admin',
    user = 'guest'
}
interface IUser extends Document{

    name: string
    email: string
    password: string 
    confirm_password: string
    role: ERole
}

export default IUser
export { ERole }