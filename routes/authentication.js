var express= require('express');
var router = express.Router({mergeParams:true});
var passport = require("passport");
var User = require("../models/user");
// var flash = require('connect-flash');


router.get('/signup', function(req,res){
    res.render('signup');
});

router.post('/signup', function(req,res){
    User.register(new User({username:req.body.username}), req.body.password, function(err,user){
        if (err){
            console.log(err);
            return res.redirect('/signup');
        } 
        passport.authenticate('local') (req, res, function(){
            res.redirect('/');
        });
    });
});

router.get('/africanhero', function(req,res){
    res.render('login');
});

router.post('/africanhero', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/africanhero',
}), function(req,res){});

router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/africanhero');
}


module.exports = router;
    


