import { createOrganisation, findOrganisationById, findOrganisationsByUserId } from "../../models/organisation.js";

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