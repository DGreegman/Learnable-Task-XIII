import { Document, Types} from "mongoose";

interface IRooms extends Document{
    name: String
    price: Number
    roomsTypes: Types.ObjectId

}

export default IRooms 