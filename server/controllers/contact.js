const  express= require('express');
const Message= require('../models/contact');


const getMessages= function(req,res,next){
    Message.find({}).then(function(messages){
        res.status(200).json(messages);
    });
}

const postMessages= function(req,res, next){
    Message.create({
        sender: req.body.sender,
        content: req.body.content
    }).then(function(message){
        res.send(message);
    }).catch(next);

    
}


module.exports= {
   getMessages,
   postMessages
}