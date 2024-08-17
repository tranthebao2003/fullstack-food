import foodModel from "../models/foodModel.js";
import fs from 'node:fs'

// add food item
const addFood = async (req, res) => {
    // do sử dụng middleware 
    // upload.single("image") ở foodRoute
    // nên giờ có thể truy cập file đó qua request
    let image_filename = `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try{
        await food.save()
        res.json({success: true, message: "Food Added"})
    } catch(err){
        console.error(err)
        res.json({success: false, message: `${err}`})
    }
}

export{addFood}