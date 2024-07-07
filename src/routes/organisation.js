import express from "express";
import { createOrg, getOrganisationById, getOrganisationsByUser, addUserToOrganisationController } from "../controllers/organisation.js";
import { isLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isLoggedIn, createOrg);
router.get("/:orgId", isLoggedIn, getOrganisationById);
router.get("/", isLoggedIn, getOrganisationsByUser);
router.post("/:orgId/users", isLoggedIn, addUserToOrganisationController);

export default router;
