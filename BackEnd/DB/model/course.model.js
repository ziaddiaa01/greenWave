import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const courseSchema = new Schema({
    name: { type: String, required: false, unique: true, lowercase: true },
    description: { type: String, required: false, lowercase: true },
    duration: { type: Number, required: false },
    price: { type: Number, required: false, default: 0 },
    instructor: { type: String, required: false },
    category: { type: Types.ObjectId, ref: 'Category', required: false },
    image: { type: String, required: false },
    rating: { type: Number, default: 0 },
    createdBy: { type: Types.ObjectId, ref: 'User', required: false }
}, {
    timestamps: true
});

const courseModel = mongoose.model('Course', courseSchema);

export default courseModel;