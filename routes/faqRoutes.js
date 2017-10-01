var express= require('express');
var router = express.Router({mergeParams:true});
var Faq = require('../models/faq');
var expressSanitizer = require ('express-sanitizer');

router.use(expressSanitizer());




// Faq.create({
//     question: 'where is your office located?',
//     // response:{
//     //     answer:'The Starter pack Web development package',
//     // } ,
//     author: 'Mark Cuban',
// });










router.get('/faq', function(req,res){
    Faq.find({}).sort({date:-1}).exec(function(err, foundQuestions){
        if(err){
            console.log(err);
        } else{
            res.render('faq', {faq: foundQuestions});
        }
    });
});

router.post('/faq', function(req,res){
    var question = req.body.sanitized = req.sanitize(req.body.faq);
    Faq.create(question, function(err, newQuestion){
        if (err){
            console.log(err);
            res.redirect('back');
        } else{
            req.flash('success', 'Thanks for Asking, Your question will be answered within 24 Hours');
            res.redirect('back');
        }
    });
});

router.post('/faq/:faqId', function(req, res){
    var response = req.body.response;
    Faq.findById(req.params.faqId, function(err, foundQuestion){
        if (err){
            console.log(err);
            res.redirect('back');
        } else{
            foundQuestion.response.push(response);
            foundQuestion.save();
            res.redirect('back');
        }
    });
});






module.exports = router;