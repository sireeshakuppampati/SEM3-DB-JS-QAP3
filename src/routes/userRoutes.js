// Import necessary modules
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Import your database configuration

// Route for searching users
router.get('/search', async (req, res) => {
  const { username, email } = req.query;
  let query = 'SELECT * FROM users WHERE 1=1';
  let values = [];

  if (username) {
    query += ' AND username ILIKE $1';
    values.push(`%${username}%`);
  }

  if (email) {
    query += ' AND email ILIKE $2';
    values.push(`%${email}%`);
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
