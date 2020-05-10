var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get('/new', isLoggedIn,(req, res) => {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: campground});
        }
    });
});

router.post('/', isLoggedIn,(req, res) => {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
             res.redirect('/campgrounds');
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log (err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                     res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    });
});


router.get('/:comment_id/edit', (req, res) => {
    Comment.findById(req.params.comment_id,function(err, foundComment){
        if(err){
             res.redirect('back');
        }else{
            res.render('comments/edit',{campgroundid:req.params.id,comment:foundComment});     
        }
    });
});
router.put('/:comment_id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
             res.redirect('back');
        }else{
             res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//Destroy
router.delete('/:comment_id', (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err){
             res.redirect('back');
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
     res.redirect('/login');
}
module.exports = router;