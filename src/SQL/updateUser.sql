UPDATE Users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *;
