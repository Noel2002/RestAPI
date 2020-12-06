// const multer= require('multer');
// const storage = multer.diskStorage({});

// const path= require('path');
// const fileFilter = (req, file, cb)=> {    
//    const filetypes = /jpeg|jpg|png|gif/;
//   const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
//  const mimetype = filetypes.test(file.mimetype);

//  if(mimetype && extname){
//      return cb(null,true);
//  } else {
//      cb('Error: Images Only!',null);
//  }
// }
// const upload= multer({
//     dest:'uploads/',
//     storage: storage ,
//     // limits : {fileSize : 1000000},
//     // fileFilter: fileFilter
// })
// // const upload = multer({ 
// //     storage: storage ,
// //     limits : {fileSize : 1000000},
// //     fileFilter: fileFilter
// // });
// //import multer from "multer";


// module.exports= upload;

const multer= require('multer');
const path= require('path');

const storage= multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({
    storage:storage
})

module.exports=upload;