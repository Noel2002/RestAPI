const chai= require('chai');
const User= require('../models/users');
const server= require('../index');
const chaiHttp= require('chai-http');
const { response } = require('express');

let userID='';

const validUser= {
   username: 'Kaberi',
   password: 'test123'
};

const invalidUser= {
   username: 'test1',
   password: 'gft'
};
const nonexistingUser={
   username: 'Kabebe',
   password: 'ssds'
}

chai.should();

chai.use(chaiHttp);

describe('# Testing authentication routes', ()=>{
   describe('# Testing POST api/signup', ()=>{
      it('it should create a new user', (done)=>{
         chai.request(server)
            .post('/api/signup')
            .send(validUser)
            .end((err,response)=>{
                response.should.have.status(201);
                response.should.have.be.a('object');
                response.body.should.have.property('username').eql('Kaberi');
                response.body.should.have.property("password");
                userID=response.body._id;
                //console.log(messageID);
               //  User.findByIdAndDelete(userID, function (err, docs) { 
               //      if (err){ 
               //          console.log(err) 
               //      } 
               //      else{ 
               //          console.log("Deleted!"); 
               //      } 
               //  }); 

                done();
            });
      });
   });

   describe('# Testing POST api/login', ()=>{
      it('it should login', (done)=>{
         chai.request(server)
            .post('/api/login')
            .send(validUser)
            .end((err,response)=>{
                response.should.have.status(200);
                response.should.have.be.a('object');
               //  response.body.should.have.property('username').eql('Kaberi');
               //  response.body.should.have.property("password").eql('noel123');
               //  userID=response.body._id;
               //  console.log(messageID);
                User.findByIdAndDelete(userID, function (err, docs) { 
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

      it('it return a login error for incorect password', (done)=>{
         chai.request(server)
            .post('/api/login')
            .send(invalidUser)
            .end((err,response)=>{
                response.should.have.status(400);
                response.should.have.be.a('object');
               //  response.body.should.have.property('username').eql('Kaberi');
               //  response.body.should.have.property("password").eql('noel123');
               //  userID=response.body._id;
                //console.log(messageID);
                

                done();
            });
      });

      it('it return a login error for non-existing username', (done)=>{
         chai.request(server)
            .post('/api/login')
            .send(nonexistingUser)
            .end((err,response)=>{
                response.should.have.status(400);
                response.should.have.be.a('object');
               //  response.body.should.have.property('username').eql('Kaberi');
               //  response.body.should.have.property("password").eql('noel123');
               //  userID=response.body._id;
                //console.log(messageID);
                

                done();
            });
      });

   });

});