var mongoose = require('mongoose');

var leadSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    emails : [String],
    image:String,
    businessName:String,
    phone: [String],
    location: String,
    dob: String,
    interests: {type: [String], lowercase: true},
    comments: [String],
    businessGoals:[String],
    serviceHistory:[String],
    paymentHistory:[String],
    marketingBudget:[String],
    futureMarketingCampaigns:[String],
    concerns:[String],
    issues:[String],
    success: {type: String, lowercase: true},  //yes or no
    calendar:[String],
    openOrClose: {type: String, lowercase: true}, //open or close
    pastOrCurrent: {type: String, lowercase: true}, //past or current
    ongoingProjects: [String],
    paymentCollected: Boolean,
    cancellationDate: [String],
    cancellationReason: [String],
    serviceAndCompletionDate:[String],
    date : {type : Date, default : Date.now},
    
    
});

module.exports = mongoose.model('lead', leadSchema);