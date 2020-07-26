-- USERS #######################

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- INSERT INTO users
--     (name, email, password)
-- VALUES
--     ('vikas', 'vikas@gmail.com', '123456')

ALTER TABLE users ADD CONSTRAINT email_unique UNIQUE (email);



-- BOARDS ######################

CREATE TABLE boards
(
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

-- INSERT INTO boards (name, user_id) VALUES ('Board 1', 20);
