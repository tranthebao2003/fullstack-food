import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://thebao123:123456zZ@cluster0.qhdom.mongodb.net/FullStack_Food?')
    .then(console.log("DB connected"))
    .catch((err) => console.error(err))
}