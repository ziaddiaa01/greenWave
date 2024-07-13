import mongoose from 'mongoose';

const urbanGreeningSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    greeningType: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const UrbanGreening = mongoose.model('UrbanGreening', urbanGreeningSchema);
export default UrbanGreening;
