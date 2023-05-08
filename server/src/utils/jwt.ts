require("dotenv").config();
import jwt from "jsonwebtoken";


const secret = process.env.JWT_SECRET as string;

const createToken = (username: string) => {
  const token = jwt.sign({ username }, secret, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
  return token;
};

const validateToken = (token: string) => {
  try {
    const data = jwt.verify(token, secret);
    return { type: null, result: data };
  } catch (error) {
    const err = new Error("Expired or invalid token");
    return { type: err, result: null };
  }
};

const decodeToken = (token: string) => {
  const decode = jwt.decode(token);
  return {decode};
};

export default { createToken, validateToken, decodeToken };
