const chai= require('chai');
const Message= require('../models/contact');
const server= require('../index');
const chaiHttp= require('chai-http');
const { response } = require('express');
const messageID='';

const testmessage= {
    sender: 'Mucyo',
    content: 'holla holla nigga'
};


chai.should();

chai.use(chaiHttp);

describe('test messages routes', ()=>{
    //test GET request

    describe('test GET /api/messages', ()=>{
        
        it("It should return all messages", (done)=>{
            chai.request(server)
            .get('/api/messages')
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
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
                // response.should.have.property('sender');
                // response.should.have.property("sender");


                done();

            });

        });
    });

    
});

