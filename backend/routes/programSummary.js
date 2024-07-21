const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Route to search for students by program
router.get(`/search-program/:selectedProgram`, (req, res) => {
  const { selectedProgram } = req.params;

  if (!selectedProgram) {
    return res.status(400).send('Program Name is required');
  }

  const sql = `SELECT * FROM students_data WHERE selectedProgram = ?`;
  db.query(sql, [selectedProgram], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log error
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Program Not Found');
    }
    res.json({
      students: result,
      count: result.length
    });
  });
});

module.exports = router;
