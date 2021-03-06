var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
      username: String,
      password: String,
      first: String,
      last: String,
      mobile: Number,
      email: String,
      expertise: String,
      interests: String,
      genres: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
