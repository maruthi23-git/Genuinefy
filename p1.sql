CREATE DATABASE IF NOT EXISTS productDB;
USE productDB;

CREATE TABLE IF NOT EXISTS products (
  barcode VARCHAR(20) PRIMARY KEY,
  name VARCHAR(255),
  brand VARCHAR(100),
  manufactureDate DATE,
  expiryDate DATE,
  original BOOLEAN
);

-- Insert sample data
INSERT INTO products (barcode, name, brand, manufactureDate, expiryDate, original) VALUES
('23456789101', 'Head & Shoulders Anti-Dandruff Shampoo', 'Head & Shoulders', '2024-01-15', '2026-01-15', TRUE),
('34567891012', 'Colgate Total Toothpaste', 'Colgate', '2023-11-10', '2025-11-10', TRUE),
('6666666666666', 'Dettol Handwash Refill', 'Dettol', '2024-03-01', '2025-03-01', TRUE),
('12345678910', 'Parachute Coconut Oil 100ml', 'Parachute', '2023-09-05', '2025-09-05', TRUE);
