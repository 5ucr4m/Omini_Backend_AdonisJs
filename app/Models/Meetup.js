'use strict'

const Model = use('Model')
// const Subscription = use('App/Models/UserMeetups')

class Meetup extends Model {
  // static get computed () {
  //   return ['subscriptions']
  // }

  // async getSubscriptions () {
  //   const sub = await this.user().fetch()
  //   return sub
  // }

  preferences () {
    return this.belongsToMany('App/Models/Preference').pivotModel(
      'App/Models/MeetupPreference'
    )
  }

  user () {
    return this.belongsToMany('App/Models/User').pivotModel(
      'App/Models/UserMeetup'
    )
  }
}

module.exports = Meetup
