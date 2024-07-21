const express = require('express');

const db= require('../config/db');
const router = express.Router();
const {upload, cloudinary} = require("../config/cloud");
const { resolve } = require('path');
const streamifier = require("streamifier");


// Function to upload file to Cloudinary, defined outside the route handler
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({
      folder: "Student_profiles",
      allowed_formats: ['jpg', 'png'],
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};



//add new student
router.post('/add-student', upload.single('profilePic'), async (req, res) => {
  const { studentID, selectedBatch, selectedProgram, registrationNo, studentName, fatherName, contactNumber, program_name, studentEmail, dob, gender, address } = req.body;
  let profilePicUrl = '';  // Correct initialization

  if (req.file) {
    try {
      const uploadResponse = await uploadToCloudinary(req.file);
      profilePicUrl = uploadResponse.secure_url;  // Using 'secure_url' from the response
      await insertStudentData();  // Await the insertion to properly handle asynchronous operations
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ message: "Uploading error on image", error: error.toString() });
    }
  }

  // Asynchronously insert student data into the database
  async function insertStudentData() {
    const SQL = `INSERT INTO students_data(studentID, selectedBatch, selectedProgram, registrationNo, program_name, studentName, fatherName, contactNumber, studentEmail, dob, gender, address, profilePic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(SQL, [studentID, selectedBatch, selectedProgram, registrationNo, program_name, studentName, fatherName, contactNumber, studentEmail, dob, gender, address, profilePicUrl], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Student Added Successfully", profilePicUrl });
    });
  }

  if (!req.file) {
    res.status(400).json({ message: "No profile picture uploaded" });
  }
});

module.exports = router;