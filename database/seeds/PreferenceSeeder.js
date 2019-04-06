'use strict'

const Preference = use('App/Models/Preference')

const InitialValues = [
  {
    description: 'Front-end'
  },
  {
    description: 'Back-end'
  },
  {
    description: 'Mobile'
  },
  {
    description: 'DevOps'
  },
  {
    description: 'Gestão'
  },
  {
    description: 'Marketing'
  }
]

class PreferenceSeeder {
  async run () {
    await Preference.createMany(InitialValues)
  }
}

module.exports = PreferenceSeeder
