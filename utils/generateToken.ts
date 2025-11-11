import { env } from "../config/dotenv.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

const generateToken = (data: JwtPayload, exp: any = "1h") =>
  jwt.sign(data, env.JWT_SECRET as string, { expiresIn: exp });

export default generateToken;
