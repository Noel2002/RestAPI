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
        type: String,
        required:[true, 'Please Enter the date']
    }

    
});


const Blog= mongoose.model('blog', blogSchema);
module.exports= Blog;