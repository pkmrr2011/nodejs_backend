/* eslint-disable prettier/prettier */
import { Op, Sequelize } from 'sequelize'
import { User } from '../models/user.js'
import { logger } from '../shared/logger.js'

const dashboardController = {
  getDashboardInfo: async (req, res) => {
    try {
      const { startDate, endDate } = req.query

      const registrationDateCondition =
        startDate && endDate
          ? {
              registration_date: {
                [Op.between]: [new Date(startDate), new Date(endDate)],
              },
            }
          : {}

      const [aggregatedData, last7DaysLogin, userCountByCountry] = await Promise.all([
        User.findAll({
          attributes: [
            [Sequelize.literal(`SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END)`), 'total_active_users'],
            [Sequelize.literal(`SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END)`), 'total_inactive_users'],
            [Sequelize.literal(`SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END)`), 'expired_users'],
            [Sequelize.literal(`SUM(CASE WHEN gender = 'male' THEN 1 ELSE 0 END)`), 'male_count'],
            [Sequelize.literal(`SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END)`), 'female_count'],
            [Sequelize.literal(`SUM(CASE WHEN age < 18 THEN 1 ELSE 0 END)`), 'under_18'],
            [Sequelize.literal(`SUM(CASE WHEN age >= 18 AND age <= 40 THEN 1 ELSE 0 END)`), '18_to_40'],
            [Sequelize.literal(`SUM(CASE WHEN age > 40 AND age <= 60 THEN 1 ELSE 0 END)`), '40_to_60'],
            [Sequelize.literal(`SUM(CASE WHEN age > 60 THEN 1 ELSE 0 END)`), 'above_60'],
          ],
          where: registrationDateCondition,
          raw: true,
        }),

        User.findAll({
          where: {
            last_login: {
              [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
            ...registrationDateCondition,
          },
          attributes: ['email'],
        }),

        User.findAll({
          attributes: ['country', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
          where: registrationDateCondition,
          group: ['country'],
          raw: true,
        }),
      ])

      const statusAndGenderData = aggregatedData[0] || {}
      const formattedUserCountByCountry = userCountByCountry.reduce((acc, curr) => {
        acc[curr.country] = parseInt(curr.count, 10) || 0
        return acc
      }, {})

      const dashboardData = {
        status_info: {
          total_active_users: parseInt(statusAndGenderData.total_active_users, 10) || 0,
          total_inactive_users: parseInt(statusAndGenderData.total_inactive_users, 10) || 0,
          expired_users: parseInt(statusAndGenderData.expired_users, 10) || 0,
        },
        last_7_days_login: last7DaysLogin.map((user) => user.email),
        gender_info: {
          male_count: parseInt(statusAndGenderData.male_count, 10) || 0,
          female_count: parseInt(statusAndGenderData.female_count, 10) || 0,
        },
        user_count_by_country: formattedUserCountByCountry,
        age_distribution: {
          under_18: parseInt(statusAndGenderData.under_18, 10) || 0,
          '18_to_40': parseInt(statusAndGenderData['18_to_40'], 10) || 0,
          '40_to_60': parseInt(statusAndGenderData['40_to_60'], 10) || 0,
          above_60: parseInt(statusAndGenderData.above_60, 10) || 0,
        },
      }

      res.status(200).json({ success: true, data: dashboardData })
    } catch (e) {
      logger.error(e.message)
      res.status(400).send({ success: false, message: e.message || 'Something went wrong' })
    }
  },
}

export default dashboardController
