'use strict'

const Preferences = use('App/Models/Preference')

class PreferenceController {
  async index ({ request, response }) {
    const preferences = await Preferences.all()
    return preferences
  }
}

module.exports = PreferenceController
