const chai= require('chai');
const fs= require('fs');
const server= require('../index');
const chaiHttp= require('chai-http');
const { response } = require('express');
const testdata={
    title: 'blog1',
    description: 'description 1',
    img_url: 'https://res.cloudinary.com/nowo-ltd/image/upload/v1607030620/MY-BRAND/image_tjdrrz.jpg'
};


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

    describe('test POST /api/blogs', ()=>{
       
        it("It should create a new blog", (done)=>{
            chai.request(server)
            .post('/api/blogs')
            .send(testdata)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();    
            });

        });           
        
        
    });
});

