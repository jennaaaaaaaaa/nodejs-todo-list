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

export default mongoose.model('Product', ProductSchema)