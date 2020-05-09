var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get('/', (req, res) => {
    res.render('landing',{currentUser:req.user});
});

//Auth Routes
// 1. register

router.get('/register', (req, res) => {
    res.render("register",{currentUser:req.user});
});

router.post('/register', (req, res) => {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register',{currentUser:req.user});
        }
        passport.authenticate('local')(req,res,function(){
             res.redirect('/campgrounds');
        });
    });
});


//show login form
router.get('/login', (req, res) => {
    res.render("login",{currentUser:req.user});
});

router.post('/login', passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),(req, res) => {
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
     res.redirect('/login');
}

module.exports = router;
