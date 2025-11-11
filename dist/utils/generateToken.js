import { env } from "../config/dotenv.js";
import jwt, {} from "jsonwebtoken";
const generateToken = (data, exp = "1h") => jwt.sign(data, env.JWT_SECRET, { expiresIn: exp });
export default generateToken;
//# sourceMappingURL=generateToken.js.map