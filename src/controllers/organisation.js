import { createOrganisation, findOrganisationById, findOrganisationsByUserId, addUserToOrganisation } from "../../models/organisation.js";
import { findUserById } from "../../models/user.js";


export const createOrg = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { userId } = req.user;

    console.log(req.user);

    if (!name) {
      return res.status(400).json({ status: "error", message: "Name is required" });
    }

    const organisation = await createOrganisation({ name, description, userId });

    res.status(201).json({
      status: "success",
      message: "Organisation created successfully",
      data: organisation,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getOrganisationById = async (req, res) => {
  try {
    const { orgId } = req.params;
    const organisation = await findOrganisationById(orgId);

    if (!organisation) {
      return res.status(404).json({ status: "error", message: "Organisation not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Organisation fetched successfully",
      data: organisation,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getOrganisationsByUser = async (req, res) => {
    try {
      const { userId } = req.user;
      const organisations = await findOrganisationsByUserId(userId);
  
      res.status(200).json({
        status: "success",
        message: "Organisations fetched successfully",
        data: { organisations },
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };


export const addUserToOrganisationController = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { userId: newUserId } = req.body;
    const { userId } = req.user;

    const organisation = await findOrganisationById(orgId);

    if (!organisation) {
      return res.status(404).json({ status: "error", message: "Organisation not found" });
    }

    if (organisation.userId !== userId) {
      return res.status(403).json({ status: "error", message: "You do not have permission to add users to this organisation" });
    }

    const user = await findUserById(newUserId);

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    await addUserToOrganisation(newUserId, orgId);

    res.status(200).json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
