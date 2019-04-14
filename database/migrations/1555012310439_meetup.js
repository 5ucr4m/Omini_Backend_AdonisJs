'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupSchema extends Schema {
  up () {
    this.create('meetups', table => {
      table.increments()
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.string('image_url').notNullable()
      table.string('place').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('meetups')
  }
}

module.exports = MeetupSchema
