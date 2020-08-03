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
    name varchar(100) NOT NULL
);

-- INSERT INTO boards (name, user_id) VALUES ('Board 1', 20);
ALTER TABLE boards ADD CONSTRAINT boards_user_id_fkey FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE;


--- LISTS ######################

CREATE TABLE lists
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

ALTER TABLE lists ADD CONSTRAINT lists_board_id_fkey FOREIGN KEY(board_id) REFERENCES boards(id) ON DELETE CASCADE;

ALTER TABLE lists ADD COLUMN card_ids integer[];

ALTER TABLE lists ALTER COLUMN card_ids SET DEFAULT array[]::integer[];



--- CARDS ######################

CREATE TABLE cards
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);

