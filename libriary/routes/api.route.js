var express = require('express')

var router = express.Router()
var entries = require('./api/entry.route')


router.use('/entries', entries);


module.exports = router;