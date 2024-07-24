// src/dal.js
require('dotenv').config(); // Load environment variables

const { Pool } = require('pg');

// Create a new Pool instance using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Get all users
async function getUsers() {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
}

// Get user by ID
async function getUserById(id) {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0];
}

// Add a new user
async function addUser(name, email, age) {
  const res = await pool.query(
    'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
    [name, email, age]
  );
  return res.rows[0];
}

// Update a user
async function updateUser(id, name, email, age) {
  const res = await pool.query(
    'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
    [name, email, age, id]
  );
  return res.rows[0];
}

// Delete a user
async function deleteUser(id) {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
