var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");

router.get('/',(req, res) => {
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

router.post('/', middleware.isLoggedIn,(req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username : req.user.username,
    };
    var newCampground = {name:name,image:image,description:desc,author:author,price:price};
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

router.get('/new', middleware.isLoggedIn,(req, res) => {
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
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});
    });
});
//update--------------------
router.put('/:id',middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
        if(err){
             res.redirect('/campgrounds');
        }else{
             res.redirect('/campgrounds/'+ req.params.id);
        }
    });
});


//delete-----------------------------
router.delete('/:id',middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds');
        }
    })
});


module.exports = router;