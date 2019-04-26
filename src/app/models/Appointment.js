module.exports = (sequelize, Datatypes) => {
  const Appointment = sequelize.define('Apointment', {
    date: Datatypes.Date
  })

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { foreignKey: 'user_id' })
    Appointment.belongsTo(models.User, { foreignKey: 'provider_id' })
  }
  return Appointment
}
