import adminModel from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {jwtDecode} from 'jwt-decode'
import dayjs from 'dayjs'

const createToken = (email) => {
    // chỉnh lại 10m sau khi test
    return jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '10m'})
}

const createRefreshToken = (email) => {
    // sau 20d thì admin phải đăng nhập lại
    return jwt.sign({email: email}, process.env.JWT_SECRET_REFERSH, {expiresIn: '20d'})
}

const loginAdmin = async (req, res) => {
    const {email, password} = req.body;

    try {
      const admin = await adminModel.findOne({ email: email });
      // console.log('admin in login', admin._id)

      if (!admin) {
        return res.json({ success: false, message: "Admin doesn't exist" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
      }

      const token = createToken(admin.email);

      let refreshToken
      if (!admin.refreshToken) {
         refreshToken = createRefreshToken(admin.email);
      } else{
        const refreshToken_decode = jwtDecode(admin.refreshToken, process.env.JWT_SECRET_REFERSH)
        const isExpired = dayjs.unix(refreshToken_decode.exp).diff(dayjs()) < 1;
        if(!isExpired) {
            refreshToken = admin.refreshToken
        } else{
            refreshToken = createRefreshToken(admin.email);
        }
      }

      admin.refreshToken = refreshToken;
      // console.log('admin.refreshToken', admin.refreshToken)

      await admin.save();

      res.cookie("refreshToken", admin.refreshToken, {
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

export {loginAdmin}