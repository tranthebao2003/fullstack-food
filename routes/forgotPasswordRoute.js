import express from 'express'
import {getEmail} from '../controllers/forgotPasswordController.js'

const forgotPasswordRoute = express.Router()

forgotPasswordRoute.post('/', getEmail)

export default forgotPasswordRoute