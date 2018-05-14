var express = require('express')

var router = express.Router()
var entries = require('./api/entry.route')
var books = require('./api/book.route');
var users = require('./api/user.route');
var usefullLink = require('./api/usefull-link.route');



router.use('/entries', entries);
router.use('/books', books);
router.use('/users', users);
router.use('/usefull-links', usefullLink);

module.exports = router;
