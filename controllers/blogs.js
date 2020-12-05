const  express= require('express');
const Blog= require('../models/blogs');
const uploadToCloud= require('../services/cloudinary');


const getBlogs= function(req,res,next){
    Blog.find({}).then(function(blogs){
        res.send(blogs);
    });
}



const getSingleBlog= function(req,res, next){
    Blog.findOne({_id:req.params.id}).then(function(blog){
        res.status(200).json(blog);
    }).catch(next);
   
}
const postBlog= async function(req,res, next){
    const image = await uploadToCloud(req.file, res);
    console.log(image);
    await Blog.create({
        title: req.body.title,
        description: req.body.description,
       img_url: image.url
    }).then(function(blog){
        res.status(201).json(blog);
    }).catch(next);
    console.log(req.file);
    res.send('Image Uploades succesfully');

    
}

const updateBlog= async function(req,res,next){
    const image = await uploadToCloud(req.file, res);
    await Blog.findByIdAndUpdate({_id:req.params.id}, {
        title: req.body.title,
        description: req.body.description,
        img_url: image.url
    }).then(function(blog){
        Blog.findOne({_id:req.params.id}).then(function(blog){
            res.send(blog);
        });
    }).catch(next);
}

const deleteBlog= function(req,res,next){
    
    Blog.findByIdAndRemove({_id:req.params.id}).then(function(blog){
        res.send(blog);
    }).catch(next);

}

module.exports= {
    getBlogs,
    postBlog,
    updateBlog,
    deleteBlog,
    getSingleBlog
}