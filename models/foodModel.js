import { model, Schema, models} from "mongoose";

const foodSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true}
})

// Câu lệnh này kiểm tra xem mô hình food đã tồn tại trong 
// models hay chưa.
// Nếu mô hình food đã tồn tại (models.food có giá trị), 
// foodModel sẽ được gán giá trị đó.
// Nếu mô hình food chưa tồn tại thì nó sẽ tại mới bằng: model("food", foodSchema)
// và gán nó cho foodModel
const foodModel = models.food || model("food", foodSchema)

export default foodModel