'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password: 'confirmed'
    }
  }
}

module.exports = User
