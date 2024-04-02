import { Schema, model } from "mongoose";
import IRoomsTypes from "../interfaces/room-type.interface";


const roomsTypesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
}
)

const RoomsTypes = model<IRoomsTypes>('roomsTypes', roomsTypesSchema)
export default RoomsTypes