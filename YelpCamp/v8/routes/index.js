var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get('/', (req, res) => {
    res.render('landing');
});

//Auth Routes
// 1. register

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', (req, res) => {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message)
            console.log(err);
            req.session.save();
              res.redirect('/register');
        }else{
            passport.authenticate('local')(req,res,function(){
                req.flash("success","Welcome to YelpCamp "+ user.username)
                res.redirect('/campgrounds');
            });
        }
    });
});


//show login form
router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/login', passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),(req, res) => {
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "Logged you out")
    res.redirect('/campgrounds');
});


module.exports = router;