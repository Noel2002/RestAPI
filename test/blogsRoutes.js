const chai= require('chai');
const server= require('../index');
const chaiHttp= require('chai-http');
const { response } = require('express');


chai.should();

chai.use(chaiHttp);

describe('test blog routes', ()=>{
    //test GET request

    describe('test GET /api/blogs', ()=>{
        it("It should return all blogs", (done)=>{

            chai.request(server)
            .get('/api/blogs')
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();    
            });

        });

        it('it should display an error', (done)=>{
            chai.request(server)
            .get('/api/blog')
            .end((err,response)=>{
                response.should.have.status(404);
            done();    
            });
        });
            
            
        
        
    });

    // describe('test GET /api/blogs/:id', ()=>{
       
    //     it("It should return specific blog", (done)=>{
    //         const blogId='5fb62444d798311dcc87afe6';
    //         chai.request(server)
    //         .get('/api/blogs/' + blogId)
    //         .end((err,response)=>{
    //             response.should.have.status(200);
    //             response.body.should.be.a('object');
    //         done();    
    //         });

    //     });           
        
        
    // });
});

