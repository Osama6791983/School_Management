const express= require("express");


const db= require("../config/db");

const router = express.Router();

router.delete('/delete-student/:studentID', (req, res)=>{
    const {studentID} = req.params;

    const sql = 'DELETE FROM students_data WHERE studentID = ?';
    db.query(sql, [studentID], (err, result)=>{
        if(err) return res.status(500).json({message: "Database Error", error: err});
        if(result.affectedRows ===0) return res.status(404).json({message: "Student Not found"});
        res.json({message: "Student deleted Successfully"});
    });
});


module.exports = router;

