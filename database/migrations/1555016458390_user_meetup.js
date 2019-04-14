'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserMeetupSchema extends Schema {
  up () {
    this.create('user_meetups', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('meetup_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_meetups')
  }
}

module.exports = UserMeetupSchema
