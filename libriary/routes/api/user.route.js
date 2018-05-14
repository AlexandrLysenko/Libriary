var express = require('express')
var cors = require('cors')

var router = express.Router()

// Getting the Todo Controller that we just created

var UserController = require('../../controllers/user.controller');


// Map each API to the Controller FUnctions

router.get('/', cors(), UserController.getUsers)

router.get('/details/:id', cors(), UserController.getUser)

router.post('/', cors(), UserController.createUser)

router.put('/', cors(), UserController.updateUser)

router.put('/reserveBook', cors(), UserController.reserveBook)

router.put('/cancelReservation', cors(), UserController.cancelReservation)

router.delete('/:id', cors(), UserController.removeUser)


// Export the Router

module.exports = router;
