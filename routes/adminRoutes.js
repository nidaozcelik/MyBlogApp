const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');
const passportLocalMongoose =require('passport-local-mongoose');


const adminActions =[
    {
        actionId:1,
        actionName:"changeHomeImage",
        displayName:"Change Home Image"
    },
    {
        actionId:2,
        actionName:"changeAboutImage",
        displayName:"Change About Image"
    },
    {
        actionId:3,
        actionName:"changeAboutText",
        displayName:"Change About Text"
    },
    {
        actionId:4,
        actionName:"addNewBlog",
        displayName:"Add New Blog"
    },
    {
        actionId:5,
        actionName:"listAllBlogs",
        displayName:"List All Blogs"
    }
];


router.get('/admin', isLoggedIn, (req,res)=>{
    res.render('admin/admin',{adminActions:adminActions});
});

router.get('/signin',(req,res)=>{
    res.render('admin/signin');
});


router.post('/signin', passport.authenticate("local",
{
    successRedirect:"/",
    failureRedirect:"/signin"
}),(req,res)=>{
});

router.get('/signup',isLoggedIn,(req,res)=>{
    res.render('admin/signup');
});

router.post("/signup", isLoggedIn, (req,res)=>{

    const newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            res.redirect("/signup");
        
        }
        password.authenticate("local")(req, res, ()=>{
        res.redirect("/");
        });
    });
});


router.get("/signout", (req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

module.exports= router;