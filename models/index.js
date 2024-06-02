import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

import { sequelize } from '../config/db'

export const User = sequelize.define(
  'users',
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: { msg: 'Email Not Valid!' },
      },
    },
    password: {
      type: Sequelize.STRING,
      set(value) {
        const saltRounds = 10
        const hashedPassword = bcrypt.hashSync(value, saltRounds)
        this.setDataValue('password', hashedPassword)
      },
    },
    forgot_password_otp: { type: Sequelize.STRING },
  },
  {
    timestamps: true,
    underscored: true,
  },
)
