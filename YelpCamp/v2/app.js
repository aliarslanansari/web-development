var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    app         = express();
const config = {
    autoIndex:          false,
    useUnifiedTopology: true,
    useNewUrlParser:    true,
};
mongoose.connect("mongodb://localhost:27017/yelp_camp",config);

var bodyParser = require("body-parser");
app.set('view engine', 'ejs');  
app.use(bodyParser.urlencoded({extended:true}));

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var Campground = mongoose.model('Campground',campgroundSchema);

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

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    });
});

app.post('/campgrounds', (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name,image:image,description:desc};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render("new");
});

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render('show',{campground:foundCampground});
        }
    });
});

app.listen(3000, () => {
    console.log('YelpCamp server started on port 3000');
});