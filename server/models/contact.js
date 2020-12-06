const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const messageSchema= new Schema({

   
    sender:{
        type: String,
        required:[true, 'Please Enter your name']
    },

    content:{
        type: String,
        required:[true, 'Please Enter the message']
    },

    message_date:{
        type: Date,
        default: Date.now
    }

    
});


const Message= mongoose.model('message', messageSchema);
module.exports= Message;