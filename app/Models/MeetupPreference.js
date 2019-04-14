'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MeetupPreference extends Model {
  preference () {
    return this.belongsTo('App/Models/Preference')
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }
}

module.exports = MeetupPreference
