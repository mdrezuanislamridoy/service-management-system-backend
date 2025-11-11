import { configDotenv } from "dotenv";
configDotenv();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  SSLCOMMERZ_STORE_ID: process.env.SSLCOMMERZ_STORE_ID,
  SSLCOMMERZ_STORE_PASSWORD: process.env.SSLCOMMERZ_STORE_PASSWORD,
  IS_LIVE: process.env.IS_LIVE,
};
