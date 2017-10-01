var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//this line of code adds passport methods to the User 
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);