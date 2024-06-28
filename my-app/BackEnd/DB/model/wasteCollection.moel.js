import { required } from "joi";
import mongoose, { Schema, Types } from "mongoose";

const wasteCollectionSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref: 'User',
        required:true,
    },
    wasteType:{
        type:String,
        enum:['Plastic', 'Glass', 'Metal', 'Organic'],
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
},
{
    timestamps:true
}
)

const wasteCollectionModel = mongoose.model('WasteCollection',wasteCollectionModel)

export default wasteCollectionModel;