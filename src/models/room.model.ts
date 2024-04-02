import mongoose, {Document, Schema} from "mongoose";
import IRooms from "../interfaces/room.interface";

const roomsSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    price: {
        type: Number, 
        required: true
    },
    roomsTypes: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'roomsTypes'
    }
},
{
    timestamps: true,
    versionKey: false
}
)

const Rooms = mongoose.model<IRooms>('rooms', roomsSchema)
export default Rooms    