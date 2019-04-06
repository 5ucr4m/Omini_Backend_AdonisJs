'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserPreference extends Model {
  preference () {
    return this.belongsTo('App/Models/Preference')
  }
}

module.exports = UserPreference
