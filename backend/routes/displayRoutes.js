const express = require("express");

const db= require("../config/db");

const router = express.Router();


//fetches all batches
router.get("/batches", (req,res)=>{
    const SQL = `SELECT batch_year FROM batch_years
    UNION
    SELECT year_assign AS batch_year FROM programs`;

    db.query(SQL, (err, results)=>{
        if(err){
            console.error("Error fetching batches: ",err);
            return res.status(500).send({
                message:"Failed to fetch batches"
            });
        }
        res.json(results);
    });
})


// Fetch all programs
router.get('/programs', (req, res) => {
    const SQL = 'SELECT program_shortkey FROM programs';

    db.query(SQL, (err, results) => {
        if (err) {
            console.error('Error fetching programs:', err);
            return res.status(500).send({
                message: 'Failed to fetch programs'
            });
        }
        res.json(results);
    });
});


//fetch program description

router.get('/program-name', (req,res)=>{
    const SQL = 'SELECT program_name fROM programs';

    db.query(SQL, (err, results)=>{
        if(err){
            console.error('Error fetching programs:', err);
            return res.status(500).send({
                message: 'Failed to fetch programs'
            });
        }
        res.json(results);
    })
}

)

module.exports = router;