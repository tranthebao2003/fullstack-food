import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default:{}},

    // mặc đi nếu object trống thì nó xóa luôn
    // nhưng nếu mình để minimize là false thì 
    // nó vẫn sẽ tạo object đó (vc này phục vụ cho carData)
}, {minimize: false})

const userModel = mongoose.models.users || mongoose.model("User", userSchema)

export default userModel