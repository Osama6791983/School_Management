const mysql= require("mysql2");
const session = require("express-session");
const MySQLStore= require("express-mysql-session")(session);
const express= require("express");

const app = express();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Asad@123',
    database: process.env.DB_NAME || 'Comsatsdatabase'
});


connection.connect(err =>{
    if(err){
        console.error('Error connecting to the database: ', err);
        return process.exit(1);
    }
    console.log('Connected to database successfully');
});

const sessionStore= new MySQLStore ({}, connection);

app.use(session({
    secret:'A$ad_ADK',
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 900000 //15 minutes
    }
}));






module.exports = connection;