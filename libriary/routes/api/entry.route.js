var express = require('express')
var cors = require('cors')

var router = express.Router()

// Getting the Todo Controller that we just created

var EntryController = require('../../controllers/entry.controller');


// Map each API to the Controller FUnctions

router.get('/', cors(), EntryController.getEntries)

router.post('/', cors(), EntryController.createEntry)

router.put('/', cors(), EntryController.updateEntry)

router.delete('/:id', cors(), EntryController.removeEntry)


// Export the Router

module.exports = router;