const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const userSchema= new Schema({

   
    username:{
        type: String,
        unique:[true],
        required:[true, 'Please Enter your username']
    },

    password:{
        type: String,
        required:[true, 'Please Enter the password']
    }
    
});

userSchema.statics.login= async function(username,password){
    const user=  await this.findOne({ username });

    if( user ){
        const auth= (user.password==password);
        if( auth ){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error("Incorrect email");
}

const User= mongoose.model('User', userSchema);
module.exports= User;