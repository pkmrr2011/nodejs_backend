/* eslint-disable prettier/prettier */
import express from 'express'
import dashboardController from '../controllers/dashboard.js'
import { requestValidator } from '../middlewares/validator.js'
import { dateSchema } from '../schema/date.js'

const router = express.Router()

router.get('/info', requestValidator(dateSchema, 'query'), dashboardController.getDashboardInfo)

export default router
