const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy =require('passport-local');
const expressSession =require('express-session');
const User = require("./models/userModel");
const app = express();
const bodyParser = require('body-parser');

const indexRoutes = require("./routes/indexRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");

mongoose.connect('mongodb://localhost/BlogApp',{ useUnifiedTopology: true, useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true})); 
const passportLocalMongoose =require('passport-local-mongoose');
  
app.use(require("express-session")({
    secret:"bu bizim güvenlik cümlemizdir",
    resave: false,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser=req.user;
    next();
});


app.use(indexRoutes);
app.use(adminRoutes);
app.use(blogRoutes);


app.listen(3000, ()=>{
console.log("3000 portundan server çalışıyor");
});