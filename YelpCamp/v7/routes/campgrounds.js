var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");



router.get('/',(req, res) => {
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

router.post('/', isLoggedIn,(req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username : req.user.username,
    };
    var newCampground = {name:name,image:image,description:desc,author:author};
    console.log(req.user);
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', isLoggedIn,(req, res) => {
    res.render("campgrounds/new",{currentUser:req.user});
});

//SHOW 
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //console.log(foundCampground);
            res.render('campgrounds/show',{campground:foundCampground});
        }
    });
});

//edit--------------------------
router.get('/:id/edit', (req, res) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                 res.redirect('/campgrounds');
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit",{campground:foundCampground});

                }else{
                    res.send("You dont have permission to do that")
                }
            }
        });
    }else{
        console.log("You need to be logged in to do that");
        res.send("You need to be logged in to do that");
    }
});
router.put('/:id', (req, res) => {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
        if(err){
             res.redirect('/campgrounds');
        }else{
             res.redirect('/campgrounds/'+ req.params.id);
        }
    });
});


//delete-----------------------------
router.delete('/:id', (req, res) => {
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds');
        }
    })
});


//middelware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
     res.redirect('/login');
}
module.exports = router;