import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from 'validator'
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// verify password
const verifyPassword = (password) => {
    // regexPassword: Minimum eight characters, at least one uppercase letter,
    // one lowercase letter and one number:
    let regexPassword = new RegExp(
      /((?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$)/
    );
    if (regexPassword.test(password)) {
      return true;
    }
    return false;
};

const createToken = (email) => {
    // chỉnh lại 10m sau khi test
    return jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '10m'})
}

const createRefreshToken = (email) => {
    // sau 20d thì user phải đăng nhập lại
    return jwt.sign({email: email}, process.env.JWT_SECRET_REFERSH, {expiresIn: '20d'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
      const user = await userModel.findOne({ email: email });
      // console.log('user in login', user._id)

      if (!user) {
        return res.json({ success: false, message: "User doesn't exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
      }

      const token = createToken(user.email);

      // nếu 
      let refreshToken
      if (!user.refreshToken) {
         refreshToken = createRefreshToken(user.email);
      } else{
        const refreshToken_decode = jwtDecode(user.refreshToken, process.env.JWT_SECRET_REFERSH)
        const isExpired = dayjs.unix(refreshToken_decode.exp).diff(dayjs()) < 1;
        if(!isExpired) {
            refreshToken = user.refreshToken
        } else{
            refreshToken = createRefreshToken(user.email);
        }
      }

      user.refreshToken = refreshToken;
      // console.log('user.refreshToken', user.refreshToken)

      await user.save();

      // maxAge 20 ngày
      // sameSite: "None",secure: để xài cross-origin mà khác cả domain, tức
      // là backend deploy 1 nơi, frontend deploy 1 nẻo, nhưng mà
      // secure chỉ xài được https thôi còn http ko đc,
      // thêm 1 cái partitioned nữa
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        partitioned: true,
        maxAge: 20 * 24 * 60 * 60 * 1000,
      });

      res.json({ success: true, token: token });
    } catch (err) {
        console.error(err)
        res.json({success: false, message: `${err}`})
    }
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

        if(!verifyPassword(password)){
            return res.json({success: false, message: "Password phải tối thiểu 8 kí tự trong đó phải có số, chữ hoa, chữ thường"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword,
        })

        await newUser.save()
        res.json({success: true, message: "Đăng kí thành công bạn vui lòng đăng nhập"})

    } catch (err) {
        console.error(err)
        res.json({success: false, message: `${err}`})
    }
}

export{loginUser, registerUser}