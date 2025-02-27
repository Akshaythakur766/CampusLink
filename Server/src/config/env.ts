import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  mongoURI: process.env.MONGO_URI ?? "",
  jwtSecret: process.env.JWT_SECRET_KEY ?? "",
};
