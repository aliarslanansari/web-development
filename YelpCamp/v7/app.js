var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    app         = express(),
    Campground = require('./models/campground'),
    seedDB = require('./seeds'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Comment = require('./models/comment'),
    methodOverride = require("method-override");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");


const config = {
    autoIndex:          false,
    useUnifiedTopology: true,
    useNewUrlParser:    true,
};
mongoose.connect("mongodb://localhost:27017/yelp_camp_v3",config);
var bodyParser = require("body-parser");
app.set('view engine', 'ejs');  
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride('_method'))
//seedDB(); // Seed the database

//passport configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(commentRoutes);
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);

// Campground.create({
//     name: "SALMAN", 
//     image: "https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e5074417d2b79d6904bc5_340.png"
// }, function(err,campground){
//     if(err){
//         console.log("Oops! there's an ERROR");
//         console.log(err);
//     }else{
//         console.log("Newly Created Campground!")
//         console.log(campground);
//     }
// });







app.listen(3000, () => {
    console.log('YelpCamp server started on port 3000');
});