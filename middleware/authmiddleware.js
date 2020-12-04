const jwt= require('jsonwebtoken');


const authenticate= function(req,res,next){
    const token= req.headers.authorisation;

    if( token ){
        jwt.verify(token, 'my token secret', (err, decodedToken)=>{
            if( err ){
                console.log(err);
                res.status(401).send('Please login!');
            }
            else{
                //console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.status(401).send('Please login!');
    }
}

module.exports= {authenticate};