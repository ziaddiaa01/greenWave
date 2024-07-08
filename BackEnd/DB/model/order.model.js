import { model, Schema, Types } from "mongoose"

const orderSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[{
        product:{
            productId: { type: Types.ObjectId, ref: 'Product' },
            name:{type: String, required:false},
            price: { type: Number , required:false},
            paymentPrice: { type: Number , required:false},
            quantity:{
                type:Number,
                //required:true,
            },
        },
        book:{
            bookId:{type: Types.ObjectId, ref:'Book'},
            name: { type: String , required:false },
            author: { type: String , required:false},
            genre: { type: String , required:false},
            price: {type: Number},
            quantity:{
                type:Number,
                //required:true,
            },
        },
        course:{
            courseId:{type: Types.ObjectId, ref:'Course'},
            name: { type: String , required:false},
            price: { type: Number},
            quantity:{
                type:Number,
                //required:true,
            },
        },
    }],
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    note:{
        type:String
    },
    coupon:{
        type:Types.ObjectId,ref:'Coupon',
        required:false
    },
    price:{
        type:Number,
        //required:true
    },
    paymentPrice:{
        type: Number,
        //required: true
    },
    paymentMethod:{
        type:String,
        enum:['Cash','Card'],
        default:'Cash'
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed','placed','shipped', 'delivered', 'cancelled'],
        default: 'placed'
    },
    reason:{
        type: String,
        required:false
    }

},{
    timestamps:true
}
);

const ordermodel = model('Order',orderSchema)

export default ordermodel