CREATE DATABASE otp-database

-- psql into database

-- table containing all user infromation
CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_favorites TEXT
);

