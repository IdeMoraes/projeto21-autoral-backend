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
  responsible TEXT NOT NULL,
  phoneNumber TEXT NOT NULL,
  email TEXT NOT NULL,
  created_by TEXT NOT NULL REFERENCES "user"(name),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patient(id), 
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  street TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  created_by TEXT NOT NULL REFERENCES "user"(name),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE appointment_type (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
INSERT INTO appointment_type (name)
VALUES ('first'), ('standard'), ('return');
CREATE TABLE appointment (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patient(id),
  type_id INTEGER NOT NULL REFERENCES appointment_type(id),
  health_insurance BOOLEAN NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  created_by TEXT NOT NULL REFERENCES "user"(name),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
