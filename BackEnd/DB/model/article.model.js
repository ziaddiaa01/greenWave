import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: false },
    content: { type: String, required: false },
    author: { type: String, required: false },
    tags: { type: [String], required: false },
    publishedDate: { type: Date, default: Date.now },
    coverImage: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
}, { timestamps: true });

const articleModel = mongoose.model('Article', articleSchema);

export default articleModel;
