const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const commentSchema= new Schema({

   
    sender:{
        type: String,
        required:[true, 'Please Enter your name']
    },

    content:{
        type: String,
        required:[true, 'Please Enter the comment']
    },

    blog_id:{
        type: String,
        required:[true, 'Please Enter the blog id']
    },

    comment_date:{
        type: Date,
        default: Date.now
    }

    
});


const Comment= mongoose.model('comment', commentSchema);
module.exports= Comment;