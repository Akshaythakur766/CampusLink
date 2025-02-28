import jwt from "jsonwebtoken";
import {config} from  "@CampusLink/Server/Config"
// Generate JWT Token
 const generateToken = (userId: string) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "1d" });
};

// Verify JWT Token
 const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};


export {verifyToken , generateToken}