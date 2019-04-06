'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const data = request.only(['email', 'password'])
    const token = await auth.attempt(data.email, data.password)

    !!token &&
      (await User.query()
        .where('email', data.email)
        .update({ last_login: new Date() }))

    return token
  }
}

module.exports = SessionController
