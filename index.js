import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./src/helpers/db.config.js";
import authRouter from "./src/routes/auth.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());


app.use(cors());
app.use(morgan("dev"));

// Connect to DB
// connectDB();

app.get('/', (req, res) =>{
    return res.json({status: "success", message: "Welcome to Blard's hng11 task 2 server"});
})

// Routes
app.use("/api/v1/auth", authRouter);


app.listen(port, () => {
  console.log(`HNG task 2 server listening on port ${port}`);
});
