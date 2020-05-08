var mongoose = require("mongoose");
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name:"capground1",
        image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254794173267ed59e4d_340.jpg",
        description:"dj jhsd fjshd fjsdhf sjdf jsdf"
    },
    {
        name:"capground2",
        image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074417d2972d19644c5_340.jpg",
        description:"dj jhsd fjshd fjsdhf sjdf jsdf"
    },
    {
        name:"capground3",
        image:"https://pixabay.com/get/57e8d34b4c50a814f1dc84609620367d1c3ed9e04e5074417d2972d19644c5_340.jpg",
        description:"dj jhsd fjshd fjsdhf sjdf jsdf"
    }
];

function seedDB(){
//Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log('Campground Removed');
//Remove all comments
        Comment.remove({},function(err){
            if(err){
                console.log(err);
            }
        });
            console.log('All Comments Removed');
         //add a few campground
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    Comment.create({
                        text:"This place is hell",
                        author:"homer"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log('Comment Created');
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;

