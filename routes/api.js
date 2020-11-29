const  express= require('express');
const router= express.Router();
const upload= require('../services/multer');

const Blog= require('../models/blogs');

const {getBlogs,postBlog,updateBlog,deleteBlog}= require('../controllers/blogs');
const {getComments,postComment}= require('../controllers/comments');
const {getMessages,postMessages}= require('../controllers/contact');



//Routing codes for blogs
router.get('/blogs', getBlogs);

router.post('/blogs',upload.single('BlogImg'),postBlog);

router.put('/blogs/:id', updateBlog);

router.delete('/blogs/:id', deleteBlog);

//routing codes for comments

router.get('/comments/:id', getComments);

router.post('/comments', postComment);

//routing for messages

router.get('/messages', getMessages);

router.post('/messages', postMessages);


module.exports= router;