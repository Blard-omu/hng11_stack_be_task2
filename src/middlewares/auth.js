import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;
import { findUserInOrganisationById } from "../../models/organisation.js";

export function isLoggedIn(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Authentication failed, token is required");
    error.statusCode = 401;
    return next(error);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Invalid token");
      error.statusCode = 403;
      return next(error);
    }
    req.user = user;
    next();
  });
}


export const checkMembership = async (req, res, next) => {
  const { orgId } = req.params;
  const { userId } = req.user;

  try {
    const userInOrg = await findUserInOrganisationById(userId, orgId);

    // if (!userInOrg) {
    //   return res.status(403).json({
    //     status: "error",
    //     message: "You're not a member of this organization",
    //     statusCode: 403
    //   });
    // }

    if (!userInOrg) {
      const error = new Error("You must be a member of this organization to view records");
      error.statusCode = 403;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};
