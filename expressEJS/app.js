var express = require('express');
var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/:name', (req, res) => {
    var things = req.params.name;
    res.render('home',{thingsVar:things});  
});
app.get('/post', (req, res) => {
    res.render('post');  
});

app.listen(3000, () => {
    console.log(`Server started on port: 3000`);
});     