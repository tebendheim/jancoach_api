-- Create table if not exists
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Insert a user
INSERT INTO users (name, email) VALUES ('Tom-BEN', 'tomelbin94@gmail.com');