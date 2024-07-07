import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./src/routes/auth.js";
import organisationRouter from "./src/routes/organisation.js";
import bodyParser from "body-parser";
import { createUserTable } from "./models/user.js";
import { createOrganisationTable } from "./models/organisation.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({
    status: "success",
    message: "Welcome to Blard's hng11 task 2 server",
  });
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/organisations", organisationRouter);

//
const syncDb = async () => {
  try {
    await createUserTable();
    await createOrganisationTable();
    console.log('Database tables created successfully.');
  } catch (error) {
    console.error('Error creating database tables:', error);
  }
};

syncDb();


app.listen(port, () => {
  console.log(`HNG task 2 server listening on port ${port}`);
});
