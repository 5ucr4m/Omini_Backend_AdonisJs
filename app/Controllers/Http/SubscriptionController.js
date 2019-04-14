'use strict'

const Meetup = use('App/Models/Meetup')
const Subscription = use('App/Models/UserMeetup')

class SubscriptionController {
  async store ({ params, auth, response }) {
    const user = await auth.user
    const meetup = await Meetup.findOrFail(params.id_meetup)

    const subscription = await user
      .subscription()
      .wherePivot('meetup_id', params.id_meetup)
      .first()

    if (!subscription) {
      await Subscription.create({ user_id: user.id, meetup_id: meetup.id })

      const subscription = await auth.user.subscription().fetch()

      return subscription
    } else {
      response.status(401).send({
        message: 'Você já foi inscrito nesse evento'
      })
    }
    //

    return subscription
  }
}

module.exports = SubscriptionController
