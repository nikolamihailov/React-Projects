CREATE TABLE services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200) NOT NULL,
    duration_minutes SMALLINT NOT NULL CHECK (duration_minutes >= 0 AND duration_minutes <= 300),
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0)
);

CREATE TABLE user_service (
    user_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, service_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
