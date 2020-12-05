require('dotenv').config();



const REALDB = process.env.REALDB;
const NODE_ENV= process.env.NODE_ENV;
const JWT_KEY= process.env.JWT_KEY;

console.log(REALDB);

module.exports= {REALDB, NODE_ENV, JWT_KEY};
