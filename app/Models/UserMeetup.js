'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserMeetup extends Model {
  subscription () {
    return this.belongsToMany('App/Models/Meetup').pivotModel(
      'App/Models/UserMeetup'
    )
  }
}

module.exports = UserMeetup
