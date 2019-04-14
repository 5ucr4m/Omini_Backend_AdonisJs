'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.store')
Route.post('/sessions', 'SessionController.store')
Route.get('/preferences', 'PreferenceController.index')

Route.get('/files/:id', 'FileController.show')
Route.post('/files', 'FileController.store')

Route.group(() => {
  Route.get('/users', 'UserController.index')
  Route.put('/users', 'UserController.update').validator('User')

  Route.get('/meetups', 'MeetupController.index')
  Route.post('/meetups', 'MeetupController.store')

  Route.post('/users/subscription/:id_meetup', 'SubscriptionController.store')
}).middleware('auth')
