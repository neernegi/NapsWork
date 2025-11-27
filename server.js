import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./src/config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
console.log(PORT)

// Connect MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
