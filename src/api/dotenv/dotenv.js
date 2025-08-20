import dotenv from 'dotenv';
dotenv.config();

const {
  Postgres_host,
  Postgres_user,
  Postgres_password,
  Postgres_database,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  PEPPER,
  port,
} = process.env;

export {
  Postgres_host,
  Postgres_user,
  Postgres_password,
  Postgres_database,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  PEPPER,
  port,
};
