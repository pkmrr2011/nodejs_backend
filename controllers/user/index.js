import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../../models/index'
import { logger } from '../../shared/logger'

const userController = {
  createUser: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.create({ email, password })
      logger.info(`User created: ${user.id}`)
      return res.status(201).send({ success: true, user })
    } catch (e) {
      logger.error(e)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' })
      }

      return res.status(200).send({ success: true, user })
    } catch (e) {
      logger.error(e)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },

  getUsers: async (_req, res) => {
    try {
      const users = await User.findAll()
      return res.status(200).send({ success: true, users })
    } catch (e) {
      logger.error(e)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },

  updateUser: async (req, res) => {
    try {
      const { email, password, forgot_password_otp } = req.body
      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' })
      }

      await user.update({ email, password, forgot_password_otp })
      logger.info(`User updated: ${user.id}`)
      return res.status(200).send({ success: true, user })
    } catch (e) {
      logger.error(e)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' })
      }

      await user.destroy()
      logger.info(`User deleted: ${user.id}`)
      return res.status(200).send({ success: true, message: 'User deleted' })
    } catch (e) {
      logger.error(e)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(401).send({ success: false, message: 'Invalid password' })
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'SECRET_KEY', {
        expiresIn: '1h',
      })

      logger.info(`User logged in: ${user.id}`)
      return res.status(200).send({ success: true, token })
    } catch (e) {
      logger.error(e)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },
}

export default userController
