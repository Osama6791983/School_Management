const express = require("express")
const db= require("../config/db");

const router = express.Router();


router.get('/count-student', (req,res)=>{
    const query= 'SELECT COUNT(*) AS total FROM students_data';

    db.query(query, (err, result)=>{
        if(err){
            return res.status(500).send(err);
        }

        res.json(result[0]);
    });
});

router.get('/count-dept', (req,res)=>{
    const query ='SELECT COUNT(*) AS t_classes FROM programs';

    db.query(query, (err, result)=>{
        if(err){
            return res.status(500).send(err);
        }
        res.json(result[0]);
    });
});


module.exports =router;