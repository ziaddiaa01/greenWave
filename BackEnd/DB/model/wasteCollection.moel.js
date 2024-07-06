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
      required: true,
    },
    weight: {
      type: String, 
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true
  });
const wasteCollectionModel = mongoose.model('WasteCollection',wasteCollectionSchema)

export default wasteCollectionModel;