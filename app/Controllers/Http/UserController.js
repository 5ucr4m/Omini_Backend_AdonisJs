'use strict'

const User = use('App/Models/User')
const Preferences = use('App/Models/UserPreference')

class UserController {
  async index ({ response, auth }) {
    const user = auth.user

    const preferences = await auth.user.preferences().fetch()

    return response.status(200).send({
      user: {
        ...user.$attributes,
        preferences
      }
    })
  }

  async store ({ request, auth }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    const token = await auth.attempt(data.email, data.password)

    return {
      user,
      token
    }
  }

  async update ({ request, response, auth }) {
    const user = auth.user
    const { name, password } = request.all()

    !!name && user.merge({ name })
    !!password && user.merge({ password })

    await user.save()

    const data = request.input(['preferences']).map(preference => ({
      preference_id: preference,
      user_id: auth.user.id
    }))

    await Preferences.query()
      .where('user_id', auth.user.id)
      .delete()

    await Preferences.createMany(data)
    const preferences = await auth.user.preferences().fetch()

    return response.status(200).send({
      user: {
        ...user.$attributes,
        preferences
      }
    })
  }
}

module.exports = UserController
