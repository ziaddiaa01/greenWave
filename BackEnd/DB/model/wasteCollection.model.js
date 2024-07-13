import mongoose, { Schema, Types } from "mongoose";

const wasteCollectionSchema = new Schema({
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['Plastic', 'Glass', 'Metal', 'Organic', 'Paper'],
      required: false,
    },
    weight: {
      type: String, 
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
  }, {
    timestamps: true
  });
const wasteCollectionModel = mongoose.model('WasteCollection',wasteCollectionSchema)

export default wasteCollectionModel;