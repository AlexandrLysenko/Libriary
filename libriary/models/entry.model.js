var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EntrySchema = new mongoose.Schema({
		img: String,
    title: String,
    description: String,
    date: Date
})

EntrySchema.plugin(mongoosePaginate)
const Entry = mongoose.model('Entry', EntrySchema)

module.exports = Entry;
