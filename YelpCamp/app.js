var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.set('view engine', 'ejs');  
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.render('landing');
});

var campgrounds = [
    {name: "salman creek", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e5074417d2d7fdd964fc7_340.jpg"},
    {name: "salman creek1", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417d2d7fdd964fc7_340.jpg"},
    {name: "salman creek2", image: "https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e5074417d2d7fdd964fc7_340.png"}
]

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds',{campgrounds:campgrounds});
});

app.post('/campgrounds', (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
    campgrounds.push(newCampground)
     res.redirect('campgrounds');

});

app.get('/campgrounds/new', (req, res) => {
    res.render("new");
});

app.listen(3000, () => {
    console.log('YelpCamp server started on port 3000');
});