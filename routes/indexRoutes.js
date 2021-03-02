const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');

// const data = [
//     {
//         postTitle: "Blog Denemesi",
//         postSubTitle: "Bu ilk blog denemesi bakalım ne olacak",
//         image:"https://images.unsplash.com/photo-1612831457732-0f6b2156b92d?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
//     },
//     {
//         postTitle: "Testing a Blog",
//         postSubTitle: "This is a blog tesitng",
//         image:"https://images.unsplash.com/photo-1614595579437-c43574854ecf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
//     },
//     {
//         postTitle: "Montaisns a for",
//         postSubTitle: "Everything is aanote",
//         image:"https://images.unsplash.com/photo-1614543917159-fa54ac2511fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80"
//     }
// ]



router.get('/',(req,res)=>{
    Blog.find({},(err, foundBlogs)=>{
        if(err){
            console.log("**************ERROR ERROR ERROR************");
            console.log(err);
        }else{
            console.log("**************All BLOGS************");
            console.log(foundBlogs);
            res.render('home',{foundBlogs:foundBlogs})
        };
    });
});

router.get('/about',(req,res)=>{
    res.render('about');
});

router.get('/contact',(req,res)=>{
    res.render('contact');
});

router.get('/resume',(req,res)=>{
    res.render('resume');
});

module.exports= router;