import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

import { sequelize } from '../config/db.js'

export const User = sequelize.define(
  'users',
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: true },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Email Not Valid!' },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        const saltRounds = 10
        const hashedPassword = bcrypt.hashSync(value, saltRounds)
        this.setDataValue('password', hashedPassword)
      },
    },
    gender: {
      type: Sequelize.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    age: { type: Sequelize.INTEGER, allowNull: false },
    country: { type: Sequelize.STRING, allowNull: false },
    status: {
      type: Sequelize.ENUM('active', 'inactive', 'expired'),
      defaultValue: 'active',
    },
    registration_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    last_login: { type: Sequelize.DATE, allowNull: true },
  },
  {
    timestamps: true,
    underscored: true,
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  },
)
