var express     = require('express'),
    methodOverride = require('method-override'),
    app         = express(),
    bodyParser  = require('body-parser'),
    expressSanitizer = require("express-sanitizer");
    mongoose    = require("mongoose");

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now}
});
var Blog = mongoose.model('Blog',blogSchema);

app.get('/', (req, res) => {
     res.redirect('/blogs');
});
//INDEX
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
       if(err){
           console.log(`Error: ` + err)
       } else{
            res.render("index",{blogs:blogs});        
         }
    });
});

//NEW
app.get('/blogs/new', (req, res) => {
    res.render('new');
});

//CREATE
app.post('/blogs', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render('new');
        }else{
             res.redirect('/blogs');
        }
    });
});

//SHOW
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id,
    (err, foundBlog) => {
       if(err){
           console.log(`Error: ` + err)
       } else{
         if(foundBlog.length === 0){
             console.log("message")
         } else{
             res.render('show',{blog:foundBlog});
         }
       }
    });
});

// EDIT
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
       if(err){
           console.log(`Error: ` + err)
       } else{
         if(!foundBlog){
             console.log("message")
         } else{
            res.render('edit',{blog:foundBlog});
         }
       }
    });
});

//UPDATE
app.put('/blogs/:id', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            console.log(`Error: ` + err)
        } else {
             res.redirect("/blogs/"+req.params.id); 
        }
    });
});

//DELETE
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id, (err, doc) => {
       if(err){
           console.log(`Error: ` + err)
       } else{
         if(!doc){
             console.log("message")
         } else{
              res.redirect('/blogs');
         }
       }
    });
});

app.listen(3000, () => {
    console.log(`RESTfull Blog App Server started on port 3000`);
});

