var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/my_database2';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true });


var Post = require("./models/post");
var User = require("./models/user");



// User.create({
//     email:'bob@gmail.com',
//     name:'Bob Belcher'
// });

// Post.create({
//     title:"How to cook the best burger",
//     content:"blah blah blah"
// },function(err,post){
//     User.findOne({email:"bob@gmail.com"}, function(err,foundUser){
//         if(err){
//             console.log(err);
//         }else{
//             foundUser.posts.push(post);
//             foundUser.save(function(err,data){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

// User.findOne({email:'bob@gmail.com'}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });