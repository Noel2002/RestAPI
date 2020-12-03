const  express= require('express');
const User= require('../models/users');
const router = require('../routes/api');
const jwt= require('jsonwebtoken');

const maxAge= 3 * 24 * 60 * 60;
const createToken= function(id){
    return jwt.sign({ id }, 'my token secret', { 
        expiresIn: maxAge
    });
}

const signupPost= async function(req,res){

    const {username, password}= req.body;
    try {

       const user= await User.create({username,password});
       const token= createToken(user._id);
       res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
       res.status(201).json(user);
        
    } catch (error) {
        res.status(400).send("Error occured");
        console.log(error)
    }

}

const loginPost= async function(req,res){

    const {username, password}= req.body;
    try {

       const user= await User.login(username,password);
       const token= createToken(user._id);
       res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
       res.status(200).json(user._id);
        
    } catch (error) {
        res.status(400).send("Incorrect username or password");
        console.log(error)
    }

}

const logoutGet= async function(req,res){
    res.cookie('jwt', '' , {maxAge: 1});
    res.send('logged out');
}

module.exports={signupPost, loginPost, logoutGet, createToken};
