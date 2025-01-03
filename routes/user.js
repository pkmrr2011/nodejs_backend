import express from 'express'
import userController from '../controllers/user.js'
import { requestValidator } from '../middlewares/validator.js'
import { userSchema } from '../schema/createUser.js'
import { updateUserSchema } from '../schema/updateUser.js'
import { statusSchema } from '../schema/status.js'

const router = express.Router()

router.post('/', requestValidator(userSchema), userController.createUser)
router.get('/:id', userController.getUserById)
router.get('/', userController.getUsers)
router.patch('/:id', requestValidator(updateUserSchema), userController.updateUser)
router.patch('/:id/status', requestValidator(statusSchema), userController.updateUserStatus)
router.delete('/:id', userController.deleteUser)
router.post('/login', userController.loginUser)

export default router
