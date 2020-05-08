var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    User                    = require("./models/user"),
    passportLocalMongoose   = require("passport-local-mongoose");


var mongoose_config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
};

mongoose.connect("mongodb://localhost:27017/auto_demo_app",mongoose_config);



var app = express();
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(require("express-session")({
    secret: "Rusty is the best Dog",
    resave: false,
    saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//================== ROUTES ========================
app.get('/', (req, res) => {
    res.render("home");
});

app.get('/secret',isLoggedIn,(req, res) => {
   res.render("secret"); 
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.post('/register', (req, res) => {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}),req.body.password,function(err, user) {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
             res.redirect('/secret');
        });
    });
});

// Login Routes
app.get('/login', (req, res) => {
    res.render('login');
});
//login logic
//middleware
app.post('/login', passport.authenticate("local", {
    successRedirect :"/secret",
    failureRedirect: "/login",
}),(req, res) => {
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(3000, () => {
    console.log(`Server started on 3000`);
});