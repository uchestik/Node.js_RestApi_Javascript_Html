var mongoose = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate');

var blogSchema = new mongoose.Schema ({
    author: String,
    title: String,
    image: String,
    imagePhotographer: String,
    imageCaption: String,
    dateDay: Number,
    dateYear: Number,
    dateMonth:String,
    timeHours: Number,
    timeMinutes: Number,
    timeAmPm: String,
    edited: String,
    paragraphOne: String,
    paragraphTwo : String,
    paragraphThree : String,
    paragraphFour : String,
    paragraphFive : String,
    paragraphSix : String,
    paragraphSeven : String,
    paragraphEight : String,
    paragraphNine : String,
    paragraphTen : String,
    created : {type : Date, default : Date.now},
    
});

// blogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('blog', blogSchema);

// blog.create({
//     title: 'Dabbing folk blog',
//     image: 'http://cbssports.com/images/blogs/Cam_Newton_Dabbing_History_Why_Do_The_Panthers_Dab.jpg',
//     body: 'Dabbing and dripping that sauce, you know what time it is boiiii!!',
// });