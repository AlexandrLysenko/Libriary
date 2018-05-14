// Gettign the Newly created Mongoose Model we just created
var User = require('../models/user.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getUser = async function(id){

    // Delete the Todo
    try{
        var user = await User.findById({_id: id})
        return user;
    }catch(e){
        throw Error("Error Occured while finding the User")
    }
}

exports.getUsers = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var users = await User.paginate(query, options)

        // Return the todod list that was retured by the mongoose promise
        return users;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Entries')
    }
}

exports.updateUser = async function(user){
    var id = user.id

    try{
        //Find the old Todo Object by the Id

        var oldUser = await User.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the User")
    }

    // If no old Todo Object exists return false
    if(!oldUser){
        return false;
    }

    console.log(oldUser)

    //Edit the Todo Object
    oldUser.FirstName = user.FirstName
    oldUser.SurName = user.SurName
    oldUser.Patronimic = user.Patronimic
    oldUser.Street = user.Street
    oldUser.House = user.House
    oldUser.Apartment = user.Apartment
    oldUser.Grade = user.Grade



    console.log(oldUser)

    try{
        var savedUser = await oldUser.save()
        return savedUser;
    }catch(e){
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function(id){

    // Delete the Todo
    try{
        var deleted = await User.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Entry Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the User")
    }
}

exports.reserveBook = async function(user, bookId) {
  var id = user.id;
  try{
      var oldUser = await User.findById(id);
  }catch(e){
      throw Error("Error occured while Finding the User")
  }
  if(!oldUser){
      return false;
  }

  console.log(oldUser)

  oldUser.Books.push(bookId)

  console.log(oldUser)

  try{
      var savedUser = await oldUser.save()
      return savedUser;
  }catch(e){
      throw Error("And Error occured while updating the User");
  }
}

exports.cancelReservation = async function(user, bookId) {
  var id = user.id;
  try{
      var oldUser = await User.findById(id);
  }catch(e){
      throw Error("Error occured while Finding the User")
  }
  if(!oldUser){
      return false;
  }

  console.log(oldUser)
  var bookIndex = oldUser.Books.indexOf(bookId)
  if(bookIndex != -1) {
    oldUser.Books.splice(bookIndex, 1)
  } else {
    throw Error("There is no such book");
  }

  console.log(oldUser)

  try{
      var savedUser = await oldUser.save()
      return savedUser;
  }catch(e){
      throw Error("And Error occured while updating the User");
  }
}
