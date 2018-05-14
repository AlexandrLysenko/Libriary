// Gettign the Newly created Mongoose Model we just created
var Book = require('../models/book.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getBook = async function(id){

    // Delete the Todo
    try{
        var book = await Book.findById({_id: id})
        return book;
    }catch(e){
        throw Error("Error Occured while finding the Book")
    }
}

exports.getBooks = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var books = await Book.paginate(query, options)

        // Return the todod list that was retured by the mongoose promise
        return books;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Entries')
    }
}

exports.createBook = async function(book){

    // Creating a new Mongoose Object by using the new keyword
    var newBook = new Book({
        Name: book.Name,
        Author: book.Author,
        Genre: book.Genre,
        Grade: book.Grade,
        Subject: book.Subject,
        Img: book.Img,
        Language: book.Language,
        Published: book.Published,
        Discriminator: book.Discriminator,
        Status: 1
    })

    try{

        // Saving the Todo
        var savedBook = await newBook.save()

        return savedBook;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Entry")
    }
}

exports.updateBook = async function(book){
    var id = book.id

    try{
        //Find the old Todo Object by the Id

        var oldBook = await Book.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Book")
    }

    // If no old Todo Object exists return false
    if(!oldBook){
        return false;
    }

    console.log(oldBook)

    //Edit the Todo Object
    oldBook.Name = book.Name
    oldBook.Author = book.Author
    oldBook.Genre = book.Genre
    oldBook.Grade = book.Grade
    oldBook.Img = book.Img
    oldBook.Subject = book.Subject


    console.log(oldBook)

    try{
        var savedBook = await oldBook.save()
        return savedBook;
    }catch(e){
        throw Error("And Error occured while updating the Book");
    }
}

exports.deleteBook = async function(id){

    // Delete the Todo
    try{
        var deleted = await Book.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Entry Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Book")
    }
}

exports.changeBookStatus = async function(book) {
  var id = book.id

  try{
      var oldBook = await Book.findById(id);
  }catch(e){
      throw Error("Error occured while Finding the Book")
  }

  oldBook.Status = book.Status

  try{
      var savedBook = await oldBook.save()
      return savedBook;
  }catch(e){
      throw Error("And Error occured while updating the Book");
  }
}
