// Accessing the Service that we just created

var BookService = require('../services/book.service');
var Book = require('../models/book.model')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getBook = async function (req, res, next) {
  var id = req.params.id
  try{

      // Calling the Service function with the new object from the Request Body

      var book = await BookService.getBook(id)
      return res.status(201).json({status: 201, data: book, message: "Succesfully finded Book"})
  }catch(e){

      //Return an Error Response Message with Code and the Error Message.

      return res.status(400).json({status: 400, message: "Couldn`t find book"})
  }
}

exports.getBooks = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 500;

    try{

        var books = await BookService.getBooks({}, page, limit)

        // Return the todos list with the appropriate HTTP status Code and Message.

        return res.status(200).json({status: 200, data: books, message: "Succesfully Entries Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createBook = async function(req, res, next){

    // Req.Body contains the form submit values.

    var book = {
        Title: req.body.Title,
        Author: req.body.Author,
        Genre: req.body.Genre,
        Grade: req.body.Grade,
        Subject: req.body.Subject,
        Img: req.body.Img,
        Language: req.body.Language,
        Published: req.body.Published,
        Discriminator: req.body.Discriminator
    }

    try{
        var createdBook = await BookService.createBook(book)
        return res.status(201).json({status: 201, data: createdBook, message: "Succesfully Created Book"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Book Creation was Unsuccesfull"})
    }
}

exports.updateBook = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var book = {
        id,
        Title: req.body.Title ? req.body.Title : null,
        Author: req.body.Author ? req.body.Author : null,
        Genre: req.body.Genre ? req.body.Genre : null,
        Grade: req.body.Grade ? req.body.Grade : null,
        Img: req.body.Img ? req.body.Img : null,
        Subject: req.body.Subject ? req.body.Subject : null,
        Status: req.body.Status ? req.body.Status : 1
    }

    try{
        var updatedBook = await BookService.updateBook(book)
        return res.status(200).json({status: 200, data: updatedBook, message: "Succesfully Updated Entry"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeBook = async function(req, res, next){

    var id = req.params.id;
Book.findByIdAndRemove(req.params.id, (err, book) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.

    return res.status(200).json({status:200, message: "Succesfully Book Deleted"});
});

}

exports.changeBookStatus = async function(req, res, next) {
  if(!req.body._id){
      return res.status(400).json({status: 400., message: "Id must be present"})
  }

  var id = req.body._id;
  var book = {
      id,
      Status: req.body.Status
    }
  console.log(req.body)

  try{
      var updatedBook = await BookService.changeBookStatus(book)
      return res.status(200).json({status: 200, data: updatedBook, message: "Succesfully Updated Book"})
  }catch(e){
      return res.status(400).json({status: 400, message: e.message})
  }
}

function genarateBooks() {
  Book.find({}, function(err, books){
    books.forEach(book => {
      book.Img
      console.log(book.Author);
    })
  })
}
// genarateBooks();
