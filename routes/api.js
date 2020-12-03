const  express= require('express');
const router= express.Router();
const upload= require('../services/multer');

const Blog= require('../models/blogs');

const {getBlogs, /*getSingleBlog ,*/postBlog,updateBlog,deleteBlog}= require('../controllers/blogs');
const {getComments,postComment}= require('../controllers/comments');
const {getMessages,postMessages}= require('../controllers/contact');
const {signupPost, loginPost, logoutGet}= require("../controllers/authcontroller");
const { authenticate }= require('../middleware/authmiddleware');



//Routing codes for blogs
router.get('/blogs', getBlogs);

// router.get('/blogs/:id', getSingleBlog);

router.post('/blogs', authenticate , upload.single('BlogImg'),postBlog);

router.put('/blogs/:id', authenticate, upload.single('BlogImg'), updateBlog);

router.delete('/blogs/:id', authenticate, deleteBlog);

//routing codes for comments

router.get('/comments/:id', getComments);

router.post('/comments', postComment);

//routing for messages

router.get('/messages', authenticate, getMessages);

router.post('/messages', postMessages);

// signup routes

router.post('/signup', signupPost);
router.post('/login', loginPost);
router.get('/logout', logoutGet);


module.exports= router;