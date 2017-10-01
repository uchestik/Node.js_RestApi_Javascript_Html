var express= require('express');
var router = express.Router({mergeParams:true});
// var flash = require('connect-flash');

// function isLoggedIn(req, res, next){
//     if (req.isAuthenticated()){
//         return next();
//     }
//     req.flash ('error', 'You need to be logged in to do that');
//     res.redirect('/admin');
// }

 

router.get('/servicepackage/webdesign', function(req, res){
    res.render('webdesign');
});
router.get('/servicepackage/webapp', function(req, res){
    res.render('webapp');
});
router.get('/servicepackage/emailmarketing', function(req, res){
    res.render('email');
});
router.get('/servicepackage/clickmarketing', function(req, res){
    res.render('clickmarketing');
});








module.exports = router;