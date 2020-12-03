const chai= require('chai');
const jwt= require('jsonwebtoken');
const Message= require('../models/contact');
const server= require('../index');
const chaiHttp= require('chai-http');
const { response } = require('express');
const {createToken}= require('../controllers/authcontroller');
let messageID='';

const testmessage= {
    sender: 'Mucyo',
    content: 'heloo'
};

const validuser={
    _id: '5fc564aabf894527387cb1b0',
    username: 'aime',
    password: 'test123'
};

const token= createToken(validuser._id);

chai.should();

chai.use(chaiHttp);

console.log(token);

describe('test messages routes', ()=>{
    //test GET request

    describe('test GET /api/messages', ()=>{
        
        it("It should return all messages", (done)=>{
            chai.request(server)
            .get('/api/messages')
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
               // response.body.should.have.property('sender');
            done();    
            });

        });

        it('it should display an error', (done)=>{
            chai.request(server)
            .get('/api/message')
            .end((err,response)=>{
                response.should.have.status(404);
            done();    
            });
        });
            
            
        
        
    });

    describe('# Test POST /api/messages', ()=>{
        it("It should send a new message", (done)=>{
            
            chai.request(server)
            .post('/api/messages')
            .send(testmessage)
            .end((err,response)=>{
                response.should.have.status(200);
                response.should.have.be.a('object');
                response.body.should.have.property('sender').eql('Mucyo');
                response.body.should.have.property("content").eql('heloo');
                messageID=response.body._id;
                //console.log(messageID);
                Message.findByIdAndDelete(messageID, function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        console.log("Deleted!"); 
                    } 
                }); 


                done();

            });

        });
    });

    
});

