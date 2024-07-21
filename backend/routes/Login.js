const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
// require('dotenv').config();

const router = express.Router();






// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const sql = 'SELECT * FROM admin WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) {
        console.log('user not found', results)
        return res.status(400).send('User not found');
    }

    const user = results[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.header('auth-token', token).send({ token });
  });
});

// Logout route
router.post('/logout', (req, res) => {
  res.header('auth-token', '').send('Logged out');
});

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
