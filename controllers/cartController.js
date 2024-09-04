import userModel from "../models/userModel.js"

// sở dĩ mình có userId là vì trước đó mình
// có dùng 1 middleware là authMiddleware

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({email: req.body.email})
        let cartData = await userData?.cartData

        if(!cartData[req.body.itemId]){
            // đây là th ta sẽ tạo sản phẩm
            // đầu tiên được add vào
            cartData[req.body.itemId] = 1
        } else{
            cartData[req.body.itemId] += 1
        }

        await userModel.findOneAndUpdate({email: req.body.email}, {cartData:cartData})
        res.json({success: true, message: "Added To Cart"})
    } catch (error) {
        console.error(error)
        res.json({success: false, error: error})
    }
}

// remove items form user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({email: req.body.email})
        let cartData = await userData.cartData

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1
        }

        await userModel.findOneAndUpdate({email: req.body.email}, {cartData: cartData})
        res.json({success: true, message: "Removed From Cart"})
    } catch (err) {
        console.error(err)
        res.json({success: false, error: err})
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({email: req.body.email})
        // console.log(userData)
        let cartData = await userData?.cartData
        res.json({success: true, cartData: cartData})
    } catch (err) {
        console.error(err)
        res.json({success: false, error: err})
    }
}

export {addToCart, removeFromCart, getCart}