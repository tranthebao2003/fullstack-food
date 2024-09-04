import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
  // req.cookie: đây chính là cookie-parser lưu
  // cookie sau khi đã phân tích cú pháp
  const cookies = await req.cookies;
  // console.log('cookies in refresh token controller', req.cookies)

  if (!cookies?.refreshToken) {
    return res.status(401).json({ success: false, message: "unauthenticated" });
  }

  const refreshToken = cookies.refreshToken;
  const user = await userModel.findOne({ refreshToken: refreshToken });

  if (!user) {
    return res
      .status(403)
      .json({ success: false, message: "Không tìm thấy user" });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET_REFERSH, (err, decode) => {
    if (err || decode.email !== user.email) {
      console.log('Không thể xác thực')
      return res
        .status(401)
        .json({ success: false, message: "Không thể xác thực" });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    res.json({ success: true, token: token});
  });
};

export default handleRefreshToken;
