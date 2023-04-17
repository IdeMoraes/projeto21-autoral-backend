CREATE TABLE user_type (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
INSERT INTO user_type (name)
VALUES ('admin'), ('moderator'), ('guest');
CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  type_id INTEGER NOT NULL REFERENCES user_type(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE session (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES user(id),
  token TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE patient (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  birthdate DATE NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  street TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  responsible TEXT NOT NULL,
  phoneNumber TEXT NOT NULL,
  email TEXT NOT NULL,
  created_by TEXT NOT NULL REFERENCES "user"(name),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
