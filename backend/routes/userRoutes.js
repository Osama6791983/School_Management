const express = require('express');
const bcrypt = require('bcrypt');

const db= require('../config/db');
const router = express.Router();
const session = require("express-session");
const MySQLStore = require("express-mysql-session");





//Register user

router.post('/register', async(req, res)=>{
   
    const {email, username, password}= req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const SQL = 'INSERT INTO admin (email, username, password) VALUES (?,?,?)';
    

    db.query(SQL,[email, username, hashedPassword], (err, results)=>{
        if(err){
            console.log('Failed to insert user: ', err);
            return res.status(500).send({
                message: "Failed to register user"
            });
        }
        res.send({
            message:"User added Successfully"
        });
    } )
});


//Introduce the new Programs
router.post('/newprogram', async(req,res)=>{
    const {program_key, program_name, hod_name, year}= req.body;

    //validate inputs
    if(!program_name || !hod_name){
        return res.status(400).send({
            message: "Program name and HOD name is required"
        });
    }

    const SQL= 'INSERT INTO programs (program_shortkey,program_name, hod,year_assign) VALUES(?,?,?,?)';

    db.query(SQL, [program_key, program_name, hod_name, year], (err, results)=>{

        if(err){
            console.log("Failed to insert program", err);
            return res.status(500).send({
                message:"Failed to register new program"
            });
        }
        res.send({
            message: "New program introduce successfully"
        });
    })
});


//post endpoint to assign a batch/year to a program

router.post("/assignBatchYear", async(req,res)=>{
    const {program_key, batch_year} = req.body;


    //input validate

    if(!program_key || !batch_year){
        return res.status(400).send({
            message: "Program key and Batch year are required"
        });
    }



    //query the programs table to find the program_id based on program key

    const programQuery = 'SELECT id FROM programs WHERE program_shortkey=?';

    db.query(programQuery, [program_key], (err, results)=>{
        if(err){
            console.log("Error finding program: ", err);

            return res.status(500).send({
                message: "Failed to find program"
            });
        }

        if(results.length ==0){
            return res.status(404).send({
                message: "Program not found"
            });
        }


        const program_id = results[0].id;


        //insert the batch/year information into the batch_year table

        const insertQuery = 'INSERT INTO batch_years (program_id, batch_year) VALUES(?,?)';

        db.query(insertQuery, [program_id, batch_year], (err, results)=>{
            if(err){
                console.log("Error assigning batch/year", err);
                
                return res.status(500).send({
                    message: "Failed to assign batch/ year"
                });
            }

            res.send({
                message: "Batch/ year assigned successfully"
            });
        });
    })

})









module.exports = router;