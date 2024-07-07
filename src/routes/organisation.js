import express from "express";
import { createOrg, getOrganisationById, getOrganisationsByUser } from "../controllers/organisation.js";
import { isLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isLoggedIn, createOrg);
router.get("/:orgId", isLoggedIn, getOrganisationById);
router.get("/", isLoggedIn, getOrganisationsByUser);

export default router;
