import express from 'express'
import testController from '../../controllers/test'

const router = express.Router()
router.post('/test-feature', testController.testFeature)

export default router
