import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const getNewPasswordToken = async (req, res) => {

  const {token, password, confirmPassword} = req.body
  // console.log('token in reset password', token)
  // console.log('newpassword', password)
  
  //check if this email exist in database
  try {
    const {email} = jwt.verify(token, process.env.JWT_RESET_PASSWORD)
    const user = await userModel.findOne({email: email})
    if(!user){
      return res.json({success: false, message: "Token không hợp lệ"})
    }

    if(password !== confirmPassword){
      return res.json({success: false, message: "Password và confirm password khác nhau"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user.password = hashedPassword

    await user.save()

    res.json({success: true, message: "Đã đổi mật khẩu thành công vui lòng đăng nhập lại"})

  } catch (error) {
    console.log(error)
    res.json({success: false, message: error})
  }
}

// const 

export {getNewPasswordToken}
