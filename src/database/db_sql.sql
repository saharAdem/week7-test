BEGIN;

  DROP TABLE IF EXISTS city , users CASCADE;


CREATE TABLE city
(
    id SERIAL PRIMARY KEY,
    name VARCHAR (150) NOT NULL,
    country VARCHAR (150) NOT NULL
);

INSERT INTO city
    (name,country)
VALUES
    ('Jerusalem', 'Palestine'),
    ('Haifa','Palestine'),
    ('Gaza', 'Palestine');


create table users
(
  id serial primary key,
  email varchar(100) not null unique,
  password varchar(100) not null
  
);

COMMIT;
