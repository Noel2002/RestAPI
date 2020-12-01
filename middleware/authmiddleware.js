const jwt= require('jsonwebtoken');


const authenticate= function(req,res,next){
    const token= req.cookies.jwt;

    if( token ){
        jwt.verify(token, 'my token secret', (err, decodedToken)=>{
            if( err ){
                console.log(err);
                res.send('Please login!');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.send('Please login!');
    }
}

module.exports= {authenticate};