const chai= require('chai');
const fs= require('fs');
const server= require('../index');
const chaiHttp= require('chai-http');
let blogID='';

let token= '';

chai.should();

chai.use(chaiHttp);

describe('test blog routes', ()=>{
    //test GET request

    describe('test GET /api/blogs', ()=>{

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
            .set('authorisation', token)
            .field('title', 'html')
			.field('description', 'html is awesomee')
			.attach('BlogImg', 
			  fs.readFileSync('./test/file/image.jpg'), 'image.jpg')
            .end((err,response)=>{
                console.log('####################'+ token);
                response.should.have.status(201);
                response.body.should.be.a('object');
                blogID= response.body._id;
            done();    
            });

        });      
        
        it("It should create a specific blog", (done)=>{
            chai.request(server)
            .get('/api/blogs/' + blogID)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();    
            });

        });     
        
        
    });

    describe('test PUT /api/blogs/:id', ()=>{
       
        it("It should update a  blog", (done)=>{
            chai.request(server)
            .put('/api/blogs/' + blogID)
            .set('authorisation', token)
            .field('title', 'html')
			.field('description', 'html is awesomee')
			.attach('BlogImg', 
			  fs.readFileSync('./test/file/image.jpg'), 'image.jpg')
            .end((err,response)=>{
                console.log('####################'+ token);
                response.should.have.status(200);
                response.body.should.be.a('object');

            done();    
            });

        });           
        
        
    });

    describe('test DELETE /api/blogs/:id', ()=>{
       
        it("It should delete a  blog", (done)=>{
            chai.request(server)
            .delete('/api/blogs/' + blogID)
            .set('authorisation', token)
            .end((err,response)=>{
                console.log('####################'+ token);
                response.should.have.status(200);
                response.body.should.be.a('object');
                
            done();    
            });

        });           
        
        
    });
});

