const express = require('express');
const Blog = require('../models/blogModel');
const router = express.Router();

router.get('/addNewBlog', isLoggedIn, (req,res)=>{
    res.render('blog/newBlog');
});

router.post('/addNewBlog', isLoggedIn, (req,res)=>{
    const title = req.body.data.blogTitle;
    const comSentence = req.body.data.comSentence;
    const comImage = req.body.data.comImage;
    const blog = req.body.data.blog;

    const newBlog = {title:title, comSentence:comSentence, comImage=comImage, blog:blog}

    Blog.create(newBlog)
    .then((newBlog)=>{
        console.log(newBlog);
        res.status(201).json(newBlog);
    })
    .catch((err)=>{
        console.log("**************ERROR ERROR ERROR************");
        console.log(err);
        res.send(err);
    });

});

router.get('/blogs/:blogId', (req,res)=>{
    Blog.findById(req.params.blogId)
    .then((foundBlog)=>{
        res.render("blog/showBlog", {foundBlog:foundBlog});
    })
    .catch((err)=>{
        console.log("**************ERROR ERROR ERROR************");
        console.log(err);
        res.send(err);
    });
});

router.get('/testing', (req,res)=>{
    Blog.find()
    .then((foundBlogs)=>{
        res.json(foundBlogs);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

module.exports= router;