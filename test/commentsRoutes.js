const chai= require('chai');
const server= require('../index');
const chaiHttp= require('chai-http');
const { response } = require('express');
const Comment= require('../models/comments');

const testcomment= {
    sender: 'Dudu',
    content: 'great content man!',
    blogId: '5fb623ddd798311dcc87afe5'
};

chai.should();

chai.use(chaiHttp);

describe('test comments routes', ()=>{
    //test GET request

    describe('test GET /api/comments', ()=>{
        
        it("It should return all comments", (done)=>{
            const blogId='5fb623ddd798311dcc87afe5';
            chai.request(server)
            .get('/api/comments/' + blogId)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();    
            });

        });

        it('it should display an error', (done)=>{
            const blogId='5fb623ddd798311dcc87afe5';
            chai.request(server)
            .get('/api/comment')
            .end((err,response)=>{
                response.should.have.status(404);
            done();    
            });
        });
            
            
        
        
    });


    describe('# test POST /api/comments', ()=>{
        it(' It should create a new comment',(done)=>{
            chai.request(server)
            .post('/api/comments')
            .send(testcomment)
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

