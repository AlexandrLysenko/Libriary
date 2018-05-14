var express = require('express')
var cors = require('cors')

var router = express.Router()

// Getting the Todo Controller that we just created

var UsefullLinkController = require('../../controllers/usefull-link.controller');


// Map each API to the Controller FUnctions

router.get('/', cors(), UsefullLinkController.getUsefullLinks)

router.post('/', cors(), UsefullLinkController.createUsefullLink)

router.put('/', cors(), UsefullLinkController.updateUsefullLink)

router.delete('/:id', cors(), UsefullLinkController.removeUsefullLink)


// Export the Router

module.exports = router;
