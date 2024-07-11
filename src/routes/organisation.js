import express from "express";
import { createOrg, getOrganisationById, getOrganisationsByUser, addUserToOrganisationController } from "../controllers/organisation.js";
import { isLoggedIn, checkMembership } from "../middlewares/auth.js";
import { validateOrganisation, validateAddUserToOrganisation } from '../middlewares/validation.js';


const router = express.Router();

router.post("/", isLoggedIn, validateOrganisation, createOrg);
router.get("/:orgId", isLoggedIn, checkMembership, getOrganisationById);
router.get("/", isLoggedIn, getOrganisationsByUser);
router.post("/:orgId/users", isLoggedIn, validateAddUserToOrganisation, addUserToOrganisationController);

export default router;
