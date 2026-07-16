CREATE DATABASE IF NOT EXISTS himqueenking;
USE himqueenking;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','staff','user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  destination VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  image VARCHAR(500),
  duration VARCHAR(100),
  group_size VARCHAR(100),
  difficulty ENUM('Easy','Moderate','Challenging','Hard'),
  includes JSON,
  highlights JSON,
  badge VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS treks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image VARCHAR(500),
  difficulty ENUM('Easy','Moderate','Challenging'),
  duration VARCHAR(100),
  altitude VARCHAR(100),
  best_time VARCHAR(100),
  region VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  image VARCHAR(500),
  amenities JSON,
  badge VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  destination VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  image VARCHAR(500),
  duration VARCHAR(100),
  group_size VARCHAR(100),
  difficulty ENUM('Easy','Moderate','Challenging','Hard'),
  includes JSON,
  highlights JSON,
  badge VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  status ENUM('pending','contacted','completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dream_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  dream_destination TEXT,
  travel_dates VARCHAR(100),
  budget VARCHAR(100),
  travelers VARCHAR(50),
  special_requests TEXT,
  status ENUM('pending','planning','completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
