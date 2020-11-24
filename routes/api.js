const  express= require('express');
const router= express.Router();

const Blog= require('../models/blogs');

const {getBlogs,postBlog,updateBlog,deleteBlog}= require('../controllers/blogs');

router.get('/blogs', getBlogs);

router.post('/blogs', postBlog);

router.put('/blogs/:id', updateBlog);

router.delete('/blogs/:id', deleteBlog);

module.exports= router;