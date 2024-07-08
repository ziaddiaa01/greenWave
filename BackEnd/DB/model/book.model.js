import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: { type: String, required: false },
    author: { type: String, required: false },
    genre: { type: String, required: false },
    publishedDate: { type: Date, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false },
    coverImage: { type: String, required: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
}, { timestamps: true });

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;
