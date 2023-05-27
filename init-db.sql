CREATE DATABASE nrp;

CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  registration_date DATE,
  age INTEGER,
  country VARCHAR(50)
);

CREATE TABLE Orders (
  order_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
  order_date DATE,
  total_amount NUMERIC(10, 2),
  status VARCHAR(20)
);

INSERT INTO Users (username, email, registration_date, age, country)
VALUES
  ('John Doe', 'john.doe@example.com', '2022-01-05', 25, 'USA'),
  ('Jane Smith', 'jane.smith@example.com', '2022-02-10', 32, 'Canada'),
  ('Mike Johnson', 'mike.johnson@example.com', '2022-03-15', 40, 'UK'),
  ('Emily Brown', 'emily.brown@example.com', '2022-04-20', 28, 'Australia'),
  ('David Wilson', 'david.wilson@example.com', '2022-05-25', 37, 'Germany'),
  ('Sarah Taylor', 'sarah.taylor@example.com', '2022-06-30', 29, 'France'),
  ('Michael Clark', 'michael.clark@example.com', '2022-07-05', 45, 'USA'),
  ('Olivia Walker', 'olivia.walker@example.com', '2022-08-10', 31, 'Canada'),
  ('James Roberts', 'james.roberts@example.com', '2022-09-15', 42, 'UK'),
  ('Sophia Harris', 'sophia.harris@example.com', '2022-10-20', 27, 'Australia');


INSERT INTO Orders (user_id, order_date, total_amount, status)
VALUES
  (1, '2022-01-15', 100.50, 'Shipped'),
  (1, '2022-02-20', 250.20, 'Delivered'),
  (2, '2022-03-25', 50.80, 'Pending'),
  (2, '2022-04-30', 180.75, 'Shipped'),
  (3, '2022-05-05', 300.00, 'Delivered'),
  (3, '2022-06-10', 75.90, 'Pending'),
  (4, '2022-07-15', 150.25, 'Shipped'),
  (4, '2022-08-20', 200.50, 'Delivered'),
  (5, '2022-09-25', 80.00, 'Pending'),
  (5, '2022-10-30', 350.75, 'Shipped');
