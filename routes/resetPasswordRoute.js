import express from 'express'
import {getNewPasswordToken} from '../controllers/resetPasswordController.js'

const resetPasswordRoute = express.Router()

resetPasswordRoute.post('/', getNewPasswordToken)

export default resetPasswordRoute