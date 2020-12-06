const  express= require('express');
const routes= require('./routes/api');

const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');
const multer= require('multer');
const {REALDB}= require('./config/env');

const upload= multer();

const mongoose= require('mongoose');

// mongoose.connect('mongodb://localhost/blogPosts');

mongoose.connect(REALDB, {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false});

mongoose.Promise= global.Promise;



const app= express();

//Body-parser middleware
// app.use(bodyParser.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(upload.array());
//Route handler middleware
app.use('/api',routes);     

//Error handler middleware
app.use(function(err, req, res, next){
    res.status(422).send({Error: err});
    console.log(err);
});



app.listen(process.env.PORT || 1000, function(){
    console.log('Listening to the port now...');
});

module.exports= app;