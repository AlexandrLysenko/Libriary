var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var UsefullLinkSchema = new mongoose.Schema({
		img: String,
    title: String,
    description: String,
    link: String
})

UsefullLinkSchema.plugin(mongoosePaginate)
const UsefullLink = mongoose.model('UsefullLink', UsefullLinkSchema)

module.exports = UsefullLink;
