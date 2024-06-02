import express from 'express'
import userController from '../../controllers/user' // Adjust the path as needed

const router = express.Router()

router.post('/', userController.createUser)
router.get('/:id', userController.getUser)
router.get('/', userController.getUsers)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.post('/login', userController.loginUser)

export default router
