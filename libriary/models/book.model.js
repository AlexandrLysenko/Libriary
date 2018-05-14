var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var BookSchema = new mongoose.Schema({
	Name: String,
	Author: String,
	Genre: String,
	Grade: String,
	Subject: String,
	Language: String,
	Img: String,
	Published: String,
	Status: Number,
	Discriminator: String
})

BookSchema.plugin(mongoosePaginate)
const Book = mongoose.model('Book', BookSchema)

module.exports = Book;
