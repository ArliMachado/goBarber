const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')
class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }
  async indexProvider (req, res) {
    const user = req.session.user
    const providers = await Appointment.findAll({
      where: {
        provider_id: user.id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const clients = await Promise.all(
      providers.map(async provider => {
        const client = await User.findByPk(provider.user_id)
        console.log(`client: ${client.name}`)

        return {
          hour: moment(provider.date).format('HH:mm'),
          avatar: client.avatar,
          name: client.name,
          email: client.email
        }
      })
    )
    console.log(clients)

    return res.render('dashboardProvider', { clients })
  }
}

module.exports = new DashboardController()
