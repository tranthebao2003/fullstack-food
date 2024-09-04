import express from 'express'
import handleRefreshToken from '../controllers/refreshTokenController.js'

const refreshRoute = express.Router()

refreshRoute.get('/', handleRefreshToken)

export default refreshRoute