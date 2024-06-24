import mongoose from 'mongoose';

const wasteCollectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    wasteType: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const WasteCollection = mongoose.model('WasteCollection', wasteCollectionSchema);

export default WasteCollection;
