const express = require("express");

const db= require("../config/db");

const router = express.Router();



router.get('/search-student/:registrationNo', (req,res)=>{
    const registrationNo = req.params.registrationNo;
  


    if(!registrationNo){
        return res.status(400).send('Registration no is requireed');
    }
    
    
        const query = 'SELECT * FROM students_data WHERE studentID = ? ';

        db.query(query, [registrationNo], (err, result)=>{
            if(err){
                return res.status(500).send(err);
            }
            if(result.length === 0){

                return res.status(404).send("Student not found");
            }
            res.json(result[0]);
        });
   
});


router.put('/update-student/:studentID', (req, res) => {
    const { studentID } = req.params;
    const {studentName, fatherName, contactNumber, studentEmail, dob, gender, address } = req.body;

    if (!studentID) {
        return res.status(400).json({ message: "Missing student ID" });
    }

    const sql = 'UPDATE students_data SET studentName = ?, fatherName = ?, contactNumber = ?, studentEmail = ?, dob = ?, gender = ?, address = ? WHERE studentID = ?';
    db.query(sql, [ studentName, fatherName, contactNumber, studentEmail, dob, gender, address, studentID], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database Error", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student updated successfully" });
    });
});


module.exports = router;