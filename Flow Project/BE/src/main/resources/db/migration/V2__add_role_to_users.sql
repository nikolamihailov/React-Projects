ALTER TABLE users ADD COLUMN role ENUM('ADMIN', 'STAFF_MEMBER', 'USER') NOT NULL DEFAULT 'USER';

INSERT INTO users (first_name, last_name, email, password, role, phone, age)
VALUES
    ('Alex', 'Johnson', 'alex.johnson@example.com', '$2a$10$0XmmrNoQKUBEjKpPALToc.aStcIbGVm8rpRQICeVnY8H/0T8XAgyK', 'ADMIN', '03040506', 40),
    ('Taylor', 'Smith', 'taylor.smith@example.com', '$2a$10$0XmmrNoQKUBEjKpPALToc.aStcIbGVm8rpRQICeVnY8H/0T8XAgyK', 'STAFF_MEMBER', '03040507', 30),
    ('Jordan', 'Lee', 'jordan.lee@example.com', '$2a$10$0XmmrNoQKUBEjKpPALToc.aStcIbGVm8rpRQICeVnY8H/0T8XAgyK', 'USER', '03040508', 25);
