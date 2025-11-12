import { v2 as cloudinary } from "cloudinary";
import { env } from "./dotenv.js";

const requireEnv = (key: string): string => {
  const value = env[key as keyof typeof env];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

cloudinary.config({
  cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
  api_key: requireEnv("CLOUDINARY_API_KEY"),
  api_secret: requireEnv("CLOUDINARY_API_SECRET"),
  secure: true, 
});
export default cloudinary;
