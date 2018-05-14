var express = require('express')
var cors = require('cors')

var router = express.Router()

// Getting the Todo Controller that we just created

var BookController = require('../../controllers/book.controller');


// Map each API to the Controller FUnctions

router.get('/', cors(), BookController.getBooks)

router.get('/details/:id', cors(), BookController.getBook)

router.post('/', cors(), BookController.createBook)

router.put('/', cors(), BookController.updateBook)

router.put('/changeStatus', cors(), BookController.changeBookStatus)

router.delete('/:id', cors(), BookController.removeBook)


// Export the Router

module.exports = router;
