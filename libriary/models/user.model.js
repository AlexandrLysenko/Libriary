var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoosePaginate = require('mongoose-paginate')


var userSchema = new mongoose.Schema({
  ticket: {
    type: String,
    unique: true,
    required: true
  },
  FirstName: String,
  Apartment: String,
  House: String,
  Patronimic: String,
  Street: String,
  SurName: String,
  Discriminator: String,
  Books: Array,
  Grade: String,
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    ticket: this.ticket,
    FirstName: this.FirstName,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
userSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', userSchema);
module.exports = User;
