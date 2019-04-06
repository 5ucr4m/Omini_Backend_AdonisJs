'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.store')
Route.post('/sessions', 'SessionController.store')
Route.get('/preferences', 'PreferenceController.index')

Route.group(() => {
  Route.get('/users', 'UserController.index')
  Route.put('/users', 'UserController.update')
}).middleware('auth')
