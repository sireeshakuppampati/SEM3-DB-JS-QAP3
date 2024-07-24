// Import the PostgreSQL client library
const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Keyin2021',
  port: 5432, // Default PostgreSQL port
});

// SQL statement to create the users table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

// Function to create the table
async function createTable() {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Execute the SQL query to create the table
    await client.query(createTableQuery);

    // Release the client back to the pool
    client.release();

    console.log('Users table created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    // Close the pool when exiting the script
    pool.end();
  }
}

// Call the function to create the table
createTable();
