var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true });

//POST
var postSchema = new mongoose.Schema({
    title: String,
    content:String,
});
var Post = mongoose.model('Post',postSchema)


//USER
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[postSchema]
});
var User = mongoose.model("User",userSchema);





// var newUser = new User({
//     email: "ANSARI@afdfs.edu",
//     name:"ARSALAN ANSARI",
// });

// newUser.posts.push({
//     title:'hello post 1',
//     content:'skjbsbad bad bad bad',
// })

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });



// var newPost = new Post({
//     title: "hello post",
//     content:"Ajh ajh  ajhs  jahs s jhas s GOOD"
// });
// newPost.save(function(err,post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });


User.findOne({name:'ARSALAN ANSARI'},function(err,user){
    if(err){
        console.log(err);
    }else{
        user.posts.push({
            title:'333 3 fddfg ewsddg',
            content:"Voldemort, hello js",
        });
        user.save(function(err,user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
});