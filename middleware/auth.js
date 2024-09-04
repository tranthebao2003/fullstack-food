import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.json({success: false, message: "Not authroized login again"})
    }

    try {
        // nếu xác thực thành công thì nó sẽ trả về payload
        // console.log('token in auth',token)
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.email = token_decode.email
        next()
    } catch (error) {
        console.error('error: ', error)
        res.json({success: false, message: error})
    }
}

export default authMiddleware