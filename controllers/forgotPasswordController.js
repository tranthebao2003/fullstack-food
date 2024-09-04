import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const sendEmail = async (email, resetLink) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
  });

//   console.log('process.env.EMAIL_USER', process.env.EMAIL_USER)
//   console.log('process.env.EMAIL_PASSWORD', process.env.EMAIL_PASSWORD)
//   console.log('email', email)

  const mailOptions = {
    from: "Trần Thế Bảo <baoxadoi202@gmail.com>",
    to: email,
    subject: "Reset Password",
    html: `<p>Click the link below to reset your password:</p>
               <a href="${resetLink}">${resetLink}</a>`,
  }

  try {
    await transport.sendMail(mailOptions)
    console.log('Đã gửi mail thành công')
    return true
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getEmail = async (req, res, next) => {
    const frontend_url = 'https://fullstack-food-frontend.onrender.com/'
    // const frontend_url = 'http://localhost:5173'
    const {email} = req.body

    // make suare user exist databae
    const user = await userModel.findOne({email : email})
    if(!user){
        return res.json({success: false, message: "User not exist"})
    }

    // user exist and now create one time link valid for 10 minutes
    const token = jwt.sign({email: user.email}, process.env.JWT_RESET_PASSWORD, {expiresIn: '10m'})
    const link = `${frontend_url}/reset-password/${token}`
    console.log('link in forgot password: ', link)

    const response = sendEmail(email, link)
    if(response){
        res.json({success: true, message: `Password reset link has been sent ${user.email}`})
    } else{
        res.json({success: false, message: `Password reset link hasn't been sent ${user.email}`})
    }
}

export {getEmail}

