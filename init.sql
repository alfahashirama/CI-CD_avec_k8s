-- Création de la base de données
CREATE DATABASE IF NOT EXISTS crud_db;
USE crud_db;

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion de données de test
INSERT INTO users (name, email, age) VALUES
('Jean Dupont', 'jean.dupont@example.com', 30),
('Marie Martin', 'marie.martin@example.com', 25),
('Pierre Durant', 'pierre.durant@example.com', 35);