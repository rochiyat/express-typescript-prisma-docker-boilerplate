import dotenv from 'dotenv';
dotenv.config();

const production = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.PROD_DATABASE_URL,
};

const development = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DEV_DATABASE_URL,
};

const env = process.env.NODE_ENV === 'production' ? production : development;

export default env;
