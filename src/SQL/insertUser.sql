INSERT INTO Users (name, email, age) VALUES ($1, $2, $3) RETURNING *;
