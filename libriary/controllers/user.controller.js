// Accessing the Service that we just created

var UserService = require('../services/user.service');
var User = require('../models/user.model')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getUser = async function (req, res, next) {
  var id = req.params.id
  try{

      // Calling the Service function with the new object from the Request Body

      var user = await UserService.getUser(id)
      return res.status(201).json({status: 201, data: user, message: "Succesfully finded User"})
  }catch(e){

      //Return an Error Response Message with Code and the Error Message.

      return res.status(400).json({status: 400, message: "Couldn`t find user"})
  }
}

exports.getUsers = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 500;

    try{

        var users = await UserService.getUsers({}, page, limit)

        // Return the todos list with the appropriate HTTP status Code and Message.

        return res.status(200).json({status: 200, data: users, message: "Succesfully Entries Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createUser = async function(req, res, next){

    // Req.Body contains the form submit values.

    var user = {
        Title: req.body.Title,
        Author: req.body.Author,
        Genre: req.body.Genre,
        Grade: req.body.Grade,
        Subject: req.body.Subject,
        Img: req.body.Img,
        Status: req.body.Status,
        Discriminator: req.body.Discriminator

    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdUser = await UserService.createUser(user)
        return res.status(201).json({status: 201, data: createdUser, message: "Succesfully Created User"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var user = {
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
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated Entry"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeUser = async function(req, res, next){

    var id = req.params.id;
User.findByIdAndRemove(req.params.id, (err, user) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.

    return res.status(200).json({status:200, message: "Succesfully User Deleted"});
});

}

exports.reserveBook = async function(req, res, next) {
  if(!req.body.id){
      return res.status(400).json({status: 400., message: "Id must be present"})
  }

  var id = req.body.id;
  // var userBooks = UserService.getUser(id).Books;
  // userBooks.push(req.body.bookId);
  var user = {
      id
    }
  console.log(req.body)

  try{
      var updatedUser = await UserService.reserveBook(user, req.body.bookId)
      return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
  }catch(e){
      return res.status(400).json({status: 400, message: e.message})
  }
}

exports.cancelReservation = async function(req, res, next) {
  if(!req.body.id){
      return res.status(400).json({status: 400., message: "Id must be present"})
  }

  var id = req.body.id;
  // var userBooks = UserService.getUser(id).Books;
  // userBooks.push(req.body.bookId);
  var user = {
      id
    }
  console.log(req.body)

  try{
      var updatedUser = await UserService.cancelReservation(user, req.body.bookId)
      return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
  }catch(e){
      return res.status(400).json({status: 400, message: e.message})
  }
}
