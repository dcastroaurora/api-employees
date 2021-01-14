import { config } from "dotenv";

config();

export default {
  mongodbUrl:
    process.env.MONGODB_URI || "mongodb://localhost/crud_employee_local",
};
