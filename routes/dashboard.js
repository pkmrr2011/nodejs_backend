/* eslint-disable prettier/prettier */
import express from 'express'
import dashboardController from '../controllers/dashboard.js'

const router = express.Router()

router.get('/info', dashboardController.getDashboardInfo)

export default router
