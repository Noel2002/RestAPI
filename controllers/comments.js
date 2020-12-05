const  express= require('express');
const Comment= require('../models/comments');


const getComments= function(req,res,next){
    Comment.find({blog_id:req.params.id}).then(function(comments){
        res.send(comments);
    });
}

const postComment= function(req,res, next){
    Comment.create({
        sender: req.body.sender,
        content: req.body.content,
        blog_id: req.body.blogId
    }).then(function(comment){
        res.send(comment);
    }).catch(next);

    
}


module.exports= {
   getComments,
   postComment
}