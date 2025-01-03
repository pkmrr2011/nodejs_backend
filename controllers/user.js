import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
import { logger } from '../shared/logger.js'

const userController = {
  createUser: async (req, res) => {
    try {
      const { first_name, last_name, email, password, gender, age, country } = req.body

      const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        gender,
        age,
        country,
      })

      delete user.dataValues.password

      logger.info(`User created: ${user.id}`)

      return res.status(201).send({ success: true, user })
    } catch (e) {
      logger.error(e.message)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params
      const user = await User.findByPk(id)

      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' })
      }

      return res.status(200).send({ success: true, user })
    } catch (e) {
      logger.error(e.message)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },

  getUsers: async (req, res) => {
    try {
      const { offset = 0, limit = 10 } = req.query

      const users = await User.findAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      })

      return res.status(200).send({ success: true, users })
    } catch (e) {
      logger.error(e.message)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },

  updateUser: async (req, res) => {
    try {
      const { first_name, last_name, email, password, gender, age, country } = req.body
      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' })
      }

      await user.update({ first_name, last_name, email, password, gender, age, country })
      logger.info(`User updated: ${user.id}`)
      return res.status(200).send({ success: true, user })
    } catch (e) {
      logger.error(e)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },

  updateUserStatus: async (req, res) => {
    try {
      const { status } = req.body

      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' })
      }

      await user.update({ status })

      logger.info(`User status updated: ${user.id} to ${status}`)

      return res.status(200).send({ success: true, message: `User status updated to ${status}` })
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

      const user = await User.findOne({
        where: { email },
        attributes: { include: ['password'] },
      })
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' })
      }

      if (user.status !== 'active') {
        return res.status(403).send({ success: false, message: 'User account is inactive or expired' })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(401).send({ success: false, message: 'Invalid password' })
      }

      logger.info(`User logged in: ${user.id}`)

      await user.update({ last_login: new Date() })

      delete user.dataValues.password

      return res.status(200).send({ success: true, message: 'Login successful', user })
    } catch (e) {
      logger.error(e.message)
      return res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },
}

export default userController
