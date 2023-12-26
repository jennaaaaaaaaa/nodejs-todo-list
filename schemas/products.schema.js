import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
})

ProductSchema.set('timestamps', { createdAt: true, updatedAt: false });

//프론트엔드 서빙을 위한 코드
ProductSchema.virtual('productId').get(function () {
    return this._id.toHexString()
})
ProductSchema.set('toJSON', {
    virtuals: true,
})

export default mongoose.model('Product', ProductSchema)