var express = require ('express');
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var expressSanitizer = require ('express-sanitizer');
var methodOverride = require ('method-override');
var flash = require('connect-flash');
var Faq = require('./models/faq');
var Lead = require('./models/leads');
var Blog = require('./models/blog');
var passport = require('passport');
var localStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');
var app = express();
var Email = require('./models/email');

// mongoose.connect('mongodb://localhost/obyco');
mongoose.connect(process.env.DATABASEURL);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
app.use(flash());

var authroutes = require('./routes/authentication');
var serviceRoutes = require('./routes/serviceRoutes');
var leadRoutes = require('./routes/leadRoutes');
var faqRoutes = require('./routes/faqRoutes');



app.use(require('express-session')({
    secret:'dab',
    resave:false,
    saveUninitialized:false
}));

// the next two lines enanles passport to function inside of the app
app.use(passport.initialize());
app.use(passport.session());


//user.authenticate, user.serializeuser, user.deserializeuser
// are methods that are derived from passportlocalMongoose
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//creating our middleware that passes req.user to every page
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});



//ROUTES
app.use(authroutes);
app.use(serviceRoutes);
app.use(leadRoutes);
app.use(faqRoutes);


function paginate(req, res, next){
    var perPage = 6;
    var page = req.params.page;
    Blog.find({}).sort({created:'desc'})
    .skip(perPage * page)
    .limit(perPage)
    .exec(function(err, foundBlog){
        if (err) return next(err.message);
        Blog.count().exec(function(err, count){
            if(err) return next(err.message);
            res.render('blog', {blog: foundBlog , pages: count / perPage});
        });
    });
}

/* At the top, with other redirect methods before other routes */
app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect('https://www.obycodigitalmarketing.com'+req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
})

//this is the route section
app.get('/', function(req,res){
    res.render('home');
});

// // the new and improved home page route starts here
app.get('/icons', function(req,res){
    res.render('flaticon');
});

app.get('/websitepolicy', function(req,res){
    res.render('websitePolicy');
});

//the blog route section
app.get('/blog', function(req,res, next){
    // Blog.find({}, function(err, foundBlog){
    //     if (err){
    //         console.log(err);
    //         res.redirect('/');
    //     } else{
    //         res.render('blog', {blog: foundBlog});
    //     }
    // });
       paginate(req, res, next);
});

app.get('/blog/page/:page', function(req,res, next){
    paginate(req, res, next);
});

// the new blog post page
app.get('/blog/new', isLoggedIn, function(req,res){
    res.render('blogNew');
});

//the new blog post route
app.post('/blog/new', isLoggedIn, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newblog){
        if (err){
            console.log(err);
            res.redirect('/blog/new');
        } else {
            res.redirect('/blog');
        }
    });
});

// the blog show page route
app.get('/blog/:blogId', function(req,res){
    Blog.findById(req.params.blogId, function(err, foundBlog){
        if (err){
            console.log(err);
            res.redirect('/blog');
        } else{
            res.render('blogShow', {blog: foundBlog});
        }
    });
});

//the blog edit page route
app.get('/blog/:blogId/edit', isLoggedIn, function(req,res){
    Blog.findById(req.params.blogId, function(err, foundBlog){
        if (err){
            console.log(err);
            res.redirect('/blog');
        } else{
            res.render('blogEdit', {blog: foundBlog});
        }
    });
});
//the blog edit post route
app.put('/blog/:blogId', isLoggedIn, function(req,res){
    // req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.blogId, req.body.blog, function(err,editedBlog){
        if(err){
            console.log(err);
            res.redirect('/blog');
        } else{
            res.redirect("/blog/" + req.params.blogId);
        }
    });
});
//  the blog delete route
app.delete('/blog/delete/:blogId', isLoggedIn, function(req,res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.blogId, function(err){
        if (err){
            res.redirect('/blog');
        } else {
            res.redirect('/blog');
        }
    });
});

app.post('/blog/subscription', function(req, res){
    var email = req.sanitize(req.body.email);
    subscribe(req.body.email);
   
    Email.create({email:email}, function(err,createdEmail){
        if(err){
            console.log(err);
        }
    });
    req.flash('success', 'Thanks for Subscribing, You will get special discounts on your first Marketing Campaign');
    res.redirect('back');
});


function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/africanhero');
}

// Email.create({
//     name: 'subscription',
//     email:'sam@yahoo.com'
// });



function addToList(email,fName,lName){
    var options = { method: 'POST',
  url: '<MAILCHIMP_URL>',
  headers: 
   { 'postman-token': '<TOKEN>',
     'cache-control': 'no-cache',
     authorization: 'Basic <api key>',
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

function subscribe(email){
    var options = { method: 'POST',
  url: '<mailchimp_URL',
  headers: 
   { 'postman-token': '<TOKEN>',
     'cache-control': 'no-cache',
     authorization: 'Basic <api key>',
     'content-type': 'application/json' },
  body: 
   { members: 
      [ { email_address: email,
          status: 'subscribed'
           } ] },
  json: true };

request(options, function (error, response, body) {
  if (error){
      console.log(error);
  }

//   console.log(body);
//   res.redirect('back');
});
};
















app.listen(process.env.PORT, process.env.IP);
