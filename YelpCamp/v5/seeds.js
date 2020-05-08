var mongoose = require("mongoose");
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name:"Nigh Camping",
        image:"https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e5074417d267ddd9745cd_340.png",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam neque harum iure, sit unde corrupti, sunt aperiam nam omnis tempore consequatur repellat eius. Repellendus unde quam minima officiis rem magnam facilis reiciendis nam magni, accusantium, ratione odit est tenetur ipsum nisi ab, numquam eum quod sapiente provident illo? Ut facilis, expedita ipsa repellendus, hic commodi natus voluptas labore obcaecati suscipit culpa quasi. Doloribus at amet incidunt hic provident iure veniam vero eligendi tempora iste adipisci laudantium, necessitatibus aspernatur distinctio aliquam quos sed. Suscipit architecto rerum fuga incidunt hic voluptate provident. Quo assumenda sit distinctio omnis quas dolorem quidem libero!"
    },
    {
        name:"Hills Station",
        image:"https://pixabay.com/get/57e8d1464d53a514f1dc84609620367d1c3ed9e04e5074417d267ddd9745cd_340.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam neque harum iure, sit unde corrupti, sunt aperiam nam omnis tempore consequatur repellat eius. Repellendus unde quam minima officiis rem magnam facilis reiciendis nam magni, accusantium, ratione odit est tenetur ipsum nisi ab, numquam eum quod sapiente provident illo? Ut facilis, expedita ipsa repellendus, hic commodi natus voluptas labore obcaecati suscipit culpa quasi. Doloribus at amet incidunt hic provident iure veniam vero eligendi tempora iste adipisci laudantium, necessitatibus aspernatur distinctio aliquam quos sed. Suscipit architecto rerum fuga incidunt hic voluptate provident. Quo assumenda sit distinctio omnis quas dolorem quidem libero!"
    },
    {
        name:"Cloudy Weather",
        image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e5074417d267ddd9745cd_340.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam neque harum iure, sit unde corrupti, sunt aperiam nam omnis tempore consequatur repellat eius. Repellendus unde quam minima officiis rem magnam facilis reiciendis nam magni, accusantium, ratione odit est tenetur ipsum nisi ab, numquam eum quod sapiente provident illo? Ut facilis, expedita ipsa repellendus, hic commodi natus voluptas labore obcaecati suscipit culpa quasi. Doloribus at amet incidunt hic provident iure veniam vero eligendi tempora iste adipisci laudantium, necessitatibus aspernatur distinctio aliquam quos sed. Suscipit architecto rerum fuga incidunt hic voluptate provident. Quo assumenda sit distinctio omnis quas dolorem quidem libero!"
    }
];

function seedDB(){
//Remove all campgrounds
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log('Campground Removed');
//Remove all comments
        Comment.deleteMany({},function(err){
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

