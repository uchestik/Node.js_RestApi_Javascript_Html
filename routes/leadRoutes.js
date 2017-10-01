var express= require('express');
var router = express.Router({mergeParams:true});
var Lead = require('../models/leads');
var request = require('request');
var expressSanitizer = require ('express-sanitizer');

router.use(expressSanitizer());


// the leadhub portal starts here 
router.get('/leadportal', isLoggedIn, function(req,res){
    Lead.find({}).sort({date:-1}).exec(function(err, lead){
        if(err){
            res.redirect('/');
            console.log(err);
        } else {
            res.render('homePortal', {lead:lead});
        }
    });
});
// the leadhub portal ends here


// the sort routes start here
router.get('/leadportal/view/opencontracts', isLoggedIn, function(req,res){
    Lead.find({openOrClose:'open'}).sort({date:-1}).exec(function(err, lead){
        if(err){
            res.redirect('/');
            console.log(err);
        } else {
            res.render('leads/homePortalopencontracts', {lead:lead});
        }
    });
});

router.get('/leadportal/view/webdevelopment', isLoggedIn, function(req,res){
    Lead.find({interests: {$in: ['web development']}}).sort({date:-1}).exec(function(err, lead){
        if(err){
            res.redirect('/');
            console.log(err);
        } else {
            res.render('leads/homePortalwebdevelopment', {lead:lead});
        }
    });
});

router.get('/leadportal/view/digitalmarketing', isLoggedIn, function(req,res){
    Lead.find({interests: {$in: ['digital marketing']}}).sort({date:-1}).exec(function(err, lead){
        if(err){
            res.redirect('/');
            console.log(err);
        } else {
            res.render('leads/homePortaldigitalmarketing', {lead:lead});
        }
    });
});

router.get('/leadportal/view/socialmedia', isLoggedIn, function(req,res){
    Lead.find({interests: {$in: ['social media']}}).sort({date:-1}).exec(function(err, lead){
        if(err){
            res.redirect('/');
            console.log(err);
        } else {
            res.render('leads/homePortalsocialmedia', {lead:lead});
        }
    });
});

router.get('/leadportal/view/closedcontracts', isLoggedIn, function(req,res){
    Lead.find({openOrClose:'close'}).sort({date:-1}).exec(function(err, lead){
        if(err){
            res.redirect('/');
            console.log(err);
        } else {
            res.render('leads/homePortalclosedcontracts', {lead:lead});
        }
    });
});

// the sort routes ends here



// the lead profile page route starts here
router.get('/leadportal/:leadId', isLoggedIn, function(req,res){
    Lead.findById(req.params.leadId, function(err, foundLead){
        if(err){
            req.flash('error', 'Something went wrong, please try again');
            res.redirect('back');
        } else{
            res.render('leads/homePortal-leadprofile', {lead:foundLead});
        }
    });
});
// the lead profile page route ends here

// the home page form post collection route starts here

router.post('/homePageLead', function(req,res){
    var interest = req.body.sanitized = req.sanitize(req.body.interest);
    var email = req.body.sanitized = req.sanitize(req.body.email);
    var phone = req.body.sanitized = req.sanitize(req.body.phone);
    var interestOne = req.body.sanitized = req.sanitize(req.body.interestOne);
    var interestTwo = req.body.sanitized = req.sanitize(req.body.interestTwo);
    var interestThree = req.body.sanitized = req.sanitize(req.body.interestThree);
    var interestFour = req.body.sanitized = req.sanitize(req.body.interestFour);
    var interestFive = req.body.sanitized = req.sanitize(req.body.interestFive);
    var comment = req.body.sanitized = req.sanitize(req.body.comment);
    var firstName = req.body.sanitized = req.sanitize(req.body.lead.firstName);
    var lastName = req.body.sanitized = req.sanitize(req.body.lead.lastName);
    
    addToList(email,firstName,lastName);
    
    Lead.create(req.body.lead, function(err,newLead){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong, please try again');
            res.redirect('back');
            
        } else{
            newLead.interests.push(interest);
            newLead.interests.push(interestOne);
            newLead.interests.push(interestTwo);
            newLead.interests.push(interestThree);
            newLead.interests.push(interestFour);
            newLead.interests.push(interestFive);
            newLead.comments.push(comment);
            newLead.emails.push(email);
            newLead.phone.push(phone);
            newLead.save();
            req.flash('success', 'Thanks for showing Interest, We will contact you within 24 Hours');
            res.redirect('back');
        }
    });
});
// the home page form post collection route starts here


// the lead update from portal starts here

router.put('/leadupdate/:leadId', isLoggedIn, function(req,res){
    var interest = req.body.interest;
    var email = req.body.email;
    var comment = req.body.comment;
    var businessGoals = req.body.businessGoal;
    var serviceHistory = req.body.serviceHistory;
    var paymentHistory = req.body.paymentHistory;
    var marketingBudget = req.body.marketingBudget;
    var futureMarketingCampaigns = req.body.futureMarketingCampaign;
    var concern = req.body.concern;
    var issue = req.body.issue;
    var ongoingProject = req.body.ongoingProject;
    var paymentCollected = req.body.paymentCollected;
    var cancellationDate = req.body.cancellationDate;
    var cancellationReason = req.body.cancellationReason;
    var serviceAndCompletionDate = req.body.serviceAndCompletionDate;
    var calendar = req.body.calendar;
    var phone = req.body.phone;
    
    Lead.findByIdAndUpdate(req.params.leadId, req.body.lead, function(err, foundLead){
        if (err){
            console.log(err);
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            foundLead.interests.push(interest);
            foundLead.emails.push(email);
            foundLead.comments.push(comment);
            foundLead.businessGoals.push(businessGoals);
            foundLead.serviceHistory.push(serviceHistory);
            foundLead.paymentHistory.push(paymentHistory);
            foundLead.marketingBudget.push(marketingBudget);
            foundLead.futureMarketingCampaigns.push(futureMarketingCampaigns);
            foundLead.concerns.push(concern);
            foundLead.issues.push(issue);
            foundLead.ongoingProjects.push(ongoingProject);
            foundLead.cancellationDate.push(cancellationDate);
            foundLead.cancellationReason.push(cancellationReason);
            foundLead.serviceAndCompletionDate.push(serviceAndCompletionDate);
            foundLead.calendar.push(calendar);
            foundLead.phone.push(phone);
            foundLead.save();
            
            req.flash('success', 'Thanks for showing Interest, We will contact you within 24 Hours');
            res.redirect('back');
            
        }
    });
    
});


function addToList(email,fName,lName){
    var options = { method: 'POST',
  url: 'https://us16.api.mailchimp.com/3.0/lists/c381a4b684',
  headers: 
   { 'postman-token': 'bf413d9f-be53-98aa-7be0-b3f1bd06ce13',
     'cache-control': 'no-cache',
     authorization: 'Basic YW55c3RyaW5nOjFhMzUyZGU5ZGJiNTU0NGI4MWQ3YWQ4NjdlNjU1N2QwLXVzMTY=',
     'content-type': 'application/json' },
  body: 
   { members: 
      [ { email_address: email,
          status: 'subscribed',
          merge_fields: { FNAME: fName, LNAME: lName } } ] },
  json: true };

request(options, function (error, response, body) {
  if (error){
      console.log(error);
  }

//   console.log(body);
});
};

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/africanhero');
}

// the lead update from portal ends here






module.exports = router;