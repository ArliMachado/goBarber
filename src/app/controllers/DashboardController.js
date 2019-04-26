const moment = require('moment')
const { User, Appointment } = require('../models')
class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }
  async indexProvider (req, res) {
    const user = req.session.user
    const providers = await Appointment.findAll({
      where: { provider_id: user.id }
    })

    const clients = await Promise.all(
      providers.map(async provider => {
        const client = await User.findByPk(provider.user_id)
        console.log(`client: ${client.name}`)

        return {
          date: moment(provider.date).format('D/M/YYYY'),
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
