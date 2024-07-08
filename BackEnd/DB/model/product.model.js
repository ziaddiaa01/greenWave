import  { model , Schema, Types } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true, unique: true, lowercase: false },
    slug: { type: String, required: true ,unique:true,lowercase:false},
    description: { type: String, required: true, lowercase: false },
    stock: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    paymentPrice: { type: Number, default: 0 },
    image: { type: Object ,required:true },
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
