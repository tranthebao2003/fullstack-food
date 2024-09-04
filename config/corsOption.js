// domain của frontend khi dev and deploy
export const allowedOrigin = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://fullstack-food-frontend.onrender.com'
]

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

export default corsOptions