var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
var friends = ['TONY', 'Miranda', 'Justin', 'Pierre', 'Lily']

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/addFriend', (req, res) => {
    newfriend = req.body.newfriend;
    friends.push(newfriend);
    //res.send("You HAVE reached the post route");
    res.redirect('friends');

});

app.get('/friends', (req, res) => {
    res.render('friends', {friends : friends});
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});