const chai= require('chai');
const jwt= require('jsonwebtoken');
const Message= require('../models/contact');
const server= require('../index');
const chaiHttp= require('chai-http');
let messageID='';
let token='';
const agent = chai.request.agent(server);

const testmessage= {
    sender: 'Mucyo',
    content: 'heloo'
};

const validuser={
    _id: '5fc564aabf894527387cb1b0',
    username: 'aime',
    password: 'test123'
};


chai.should();

chai.use(chaiHttp);

console.log(token);

describe('test messages routes', ()=>{
    //test GET request

    describe('test GET /api/messages', ()=>{
        // beforeEach(function(done){
            
        // })
        it('it should login', (done)=>{
            chai.request(server)
               .post('/api/login')
               .send({
                   username: 'aime',
                   password: 'test123'
               })
               .end((err,response)=>{
                   response.should.have.status(200);
                   response.should.have.be.a('object');
                   token= response.body.token;
                  //  response.body.should.have.property('username').eql('Kaberi');
                  //  response.body.should.have.property("password").eql('noel123');
                  //  userID=response.body._id;
                  //  console.log(messageID);
                //    User.findByIdAndDelete(userID, function (err, docs) { 
                //        if (err){ 
                //            console.log(err) 
                //        } 
                //        else{ 
                //            console.log("Deleted!"); 
                //        } 
                //    }); 
   
                   done();
               });
         });

               
        it("It should return all messages", (done)=>{
            chai.request(server)
            .get('/api/messages')
            .set('authorisation', token)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
               // response.body.should.have.property('sender');
            done();    
            });

        });

        it("It should not allow user to return all messages", (done)=>{
            chai.request(server)
            .get('/api/messages')
            .end((err,response)=>{
                response.should.have.status(401);
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

