'use strict'

const Meetup = use('App/Models/Meetup')
const Subject = use('App/Models/MeetupPreference')

class MeetupController {
  async index ({ response, auth }) {
    const meetupsFetch = await Meetup.query()
      .with('preferences')
      .withCount('user as subscriptions')
      .fetch()

    const meetups = meetupsFetch.toJSON().map(ele => {
      const { __meta__, ...rest } = ele
      return {
        ...rest,
        ...__meta__
      }
    })

    const subscriptionFetch = await auth.user
      .subscription()
      .withCount('user as subscriptions')
      .fetch()

    const subscription = subscriptionFetch.toJSON().map(ele => {
      const { __meta__, pivot, ...rest } = ele
      return {
        ...rest,
        ...__meta__
      }
    })

    const preferencesFetch = await auth.user.preferences().fetch()
    const pref = preferencesFetch.rows.map(ele => ele.$attributes.id)

    const recommendation = meetups.filter(({ preferences }) => {
      let validation = false

      preferences.map(ele => {
        if (pref.includes(ele.id)) validation = true
      })

      return validation
    })

    return response.status(200).send({
      meetups,
      subscription,
      recommendation
    })
  }

  async store ({ request }) {
    const { subjects, ...data } = request.all()

    data.image_url = !data.image_url
      ? 'http://fajrpolymers.com/wp-content/uploads/2018/02/dummy.png'
      : data.image_url

    const meetup = await Meetup.create(data)

    const meetupSubjects = []
    subjects.map(ele => {
      meetupSubjects.push({ meetup_id: meetup.id, preference_id: ele })
    })

    await Subject.createMany(meetupSubjects)

    return meetup
  }
}

module.exports = MeetupController
