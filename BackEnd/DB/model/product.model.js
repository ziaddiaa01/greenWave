import  { model , Schema, Types } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: false, unique: true, lowercase: false },
    slug: { type: String, required: false ,unique:true,lowercase:false},
    description: { type: String, required: false, lowercase: false },
    stock: { type: Number, required: false, default: 1 },
    price: { type: Number, required: false, default: 0 },
    discount: { type: Number, default: 0 },
    paymentPrice: { type: Number, default: 0 },
    image: { type: Object ,required:false },
    categoryId: { type: Types.ObjectId, ref: 'Category', required: false },
    brandId: { type: Types.ObjectId, ref: 'Brand', required: false },
    avgRate: { type: Number, default: 0 },
    soldItems: { type: Number, default: 0 },
    createdBy: { type: Types.ObjectId, ref: 'User', required: false },
    wishlist:[{
        type:Types.ObjectId,
        ref:'User'
    }]
}, 
{
    timestamps: true
});

const productModel = model('Product', productSchema);

export default productModel;
