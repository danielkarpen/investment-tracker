import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongodbURI: process.env.MONGODB_URI,
  admin: process.env.ADMIN,
};
