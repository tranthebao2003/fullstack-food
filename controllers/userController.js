import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from 'validator'
import 'dotenv/config'

// login user
const loginUser = async (req, res) => {
    
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body

    try {
        // checking is uer already exists
        const exists = await userModel.findOne({email: email})
        if(exists){
            return res.json({success: false, message: "User alredy exists"})
        }

        // validating email format & strong password
        // validator.isEmail('foo@bar.com'); //=> true
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success: false, message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token: token})

    } catch (err) {
        console.error(err)
        res.json({success: false, message: `${err}`})
    }
}

export{loginUser, registerUser}