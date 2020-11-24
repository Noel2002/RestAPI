const  express= require('express');
const router= express.Router();

const Blog= require('../models/blogs');

const {getBlogs,postBlog,updateBlog,deleteBlog}= require('../controllers/blogs');
const {getComments,postComment}= require('../controllers/comments');



//Routing codes for blogs
router.get('/blogs', getBlogs);

router.post('/blogs', postBlog);

router.put('/blogs/:id', updateBlog);

router.delete('/blogs/:id', deleteBlog);

//routing codes for comments

router.get('/comments/:id', getComments);

router.post('/comments', postComment);


module.exports= router;