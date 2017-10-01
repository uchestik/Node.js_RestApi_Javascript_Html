var mongoose = require('mongoose');

var faqSchema= new mongoose.Schema({
    question: String,
   response: [{
        answer: {type: String},
        author:{type: String},
        time:{ type : Date, default: Date.now }
    }],
    author: String,
    date : {type : Date, default : Date.now},
});

module.exports = mongoose.model('faq', faqSchema);