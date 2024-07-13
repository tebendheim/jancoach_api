
-- \set POSTGRES_USER `echo $POSTGRES_USER`
-- \set POSTGRES_PASSWORD `echo $POSTGRES_PASSWORD`
-- \set POSTGRES_DB `echo $POSTGRES_DB`




-- DO $$ BEGIN
--     RAISE NOTICE 'Initializing database... ';
    
-- END $$;

-- DO
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname IS :POSTGRES_USER) THEN
--         CREATE ROLE :POSTGRES_DB WITH LOGIN PASSWORD :POSTGRES_PASSWORD;
--     END IF;
-- END;

-- -- CREATE DATABASE :POSTGRES_DB;
-- -- CREATE USER :POSTGRES_USER WITH ENCRYPTED PASSWORD :POSTGRES_PASSWORD;
-- -- ALTER DATABASE :POSTGRES_DB OWNER TO :POSTGRES_USER;
-- GRANT ALL PRIVILEGES ON DATABASE :POSTGRES_DB TO :POSTGRES_USER;

-- SHOW :POSTGRES_USER;

-- -- CREATE ROLE janCoachAdmin WITH LOGIN PASSWORD '${POSTGRES_PASSWORD}';
-- -- ALTER DATABASE '${POSTGRES_DB}' OWNER TO janCoachAdmin;

-- -- Create table if not exists
-- CREATE TABLE IF NOT EXISTS users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100),
--     email VARCHAR(100) UNIQUE NOT NULL
-- );



-- For local development (docker images)
-- docker run -d -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=postgr3s postgis/postgis:15-3.3
-- docker exec -it postgres psql -U postgres




--                         NOTICE
-- _______________________________________________________

--                      INITIAL SETUP
--                 THIS MUST BE DONE FIRST

-- _______________________________________________________

-- CREATE DATABASE :POSTGRES_DB;

-- ALTER SYSTEM SET password_encryption = 'scram-sha-256';

-- SELECT pg_reload_conf();

-- TO UPDATE PASSWORD (SCRAM)
-- docker run --rm -it --name postgres-dummy -d -e POSTGRES_HOST_AUTH_METHOD=trust postgres:14-alpine
-- docker exec -it postgres-dummy psql -U postgres
-- \password  # enter your password
-- select rolpassword from pg_authid where rolname = 'postgres';
-- prints password-SCRAM (not plain text)

-- guss_api will have CRUD access to all schemas except adm
-- guss_api will not have DROP table access to these schema or superuser priv.
-- CREATE ROLE :'POSTGRES_USER' WITH PASSWORD :'POSTGRES_PASSWORD' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT LOGIN;



--                         NOTICE
-- _______________________________________________________

--         THIS CREATES DATABASE SCHEMA AND TABLES
--  THIS MUST BE DONE AFTER RELOAD CONF AND ADDING ROLES

-- _______________________________________________________




-- Connect to database guss

-- \c :POSTGRES_DB


-- adm SCHEMA consist of a user table with INTERNAL admins only


-- CREATE SCHEMA IF NOT EXISTS adm;

-- CREATE ROLE janCoachAdmin WITH LOGIN PASSWORD :POSTGRES_PASSWORD;
-- ALTER DATABASE :POSTGRES_DB OWNER TO janCoachAdmin;


-- Create table if not exists
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL
);


INSERT INTO users (name, email) VALUES ('Tom-elbin', 'tomelbin94@gmail.com');



-- \set PGUSER :PGUSER
-- \set PGPASSWORD :PGPASSWORD
-- \set PGDATABASE :PGDATABASE

-- DO $$ 
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = :'PGUSER') THEN
--         EXECUTE format('CREATE ROLE %I WITH LOGIN PASSWORD %L NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT', :'PGUSER', :'PGPASSWORD');
--     END IF;
-- END $$;

-- DO $$ 
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_database WHERE datname = :'PGDATABASE') THEN
--         EXECUTE format('CREATE DATABASE %I', :'PGDATABASE');
--     END IF;
-- END $$;

-- ALTER DATABASE :'PGDATABASE' OWNER TO :'PGUSER';

-- \c :'PGDATABASE'

-- CREATE TABLE IF NOT EXISTS users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100),
--     email VARCHAR(100) UNIQUE NOT NULL
-- );