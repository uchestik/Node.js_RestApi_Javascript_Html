var mongoose = require("mongoose");

var emailSchema = new mongoose.Schema({
    email:String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('email', emailSchema);