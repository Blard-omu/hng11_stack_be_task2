import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./src/routes/auth.js";
import userRouter from "./src/routes/user.js";
import organisationRouter from "./src/routes/organisation.js";
import bodyParser from "body-parser";
import { createUserTable } from "./models/user.js";
import { createOrganisationTable, createUserOrganisationTable } from "./models/organisation.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { welcomeMsg } from "./src/helpers/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());


app.use(cors());
app.use(morgan("dev"));

app.get("/", welcomeMsg);


// Routes
app.use("/api/auth", authRouter);
app.use("/api/organisations", organisationRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);


const syncDb = async () => {
  try {
    await createUserTable();
    await createOrganisationTable();
    await createUserOrganisationTable();
    console.log('Database tables created successfully.');
  } catch (error) {
    console.error('Error creating database tables:', error);
  }
};

syncDb();


app.listen(port, () => {
  console.log(`HNG task 2 server listening on port ${port}`);
});

export default app;
