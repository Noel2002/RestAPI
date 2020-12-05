const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

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

userSchema.pre('save', async function(next){
    const salt= await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password, salt);
})


userSchema.statics.login= async function(username,password){
    const user=  await this.findOne({ username });

    if( user ){
        // const auth= (user.password==password);
        const auth= bcrypt.compare(password, user.password);
        if( auth ){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error("Incorrect email");
}

const User= mongoose.model('User', userSchema);
module.exports= User;