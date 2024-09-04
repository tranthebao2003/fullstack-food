import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{type: String, required: true},
    password: {type: String, required: true},
    refreshToken: {type: String, default: ''}
})

const adminModel = mongoose.models.Admin || mongoose.model('Admin', adminSchema)

export default adminModel