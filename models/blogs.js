const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const blogSchema= new Schema({

   
    title:{
        type: String,
        required:[true, 'Please Enter the title']
    },

    description:{
        type: String,
        required:[true, 'Please Enter the description']
    },

    blog_date:{
        type: Date,
        default: Date.now
    },
    img_url:{
        type: String,
        //default:"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
    }

    
});


const Blog= mongoose.model('blog', blogSchema);
module.exports= Blog;