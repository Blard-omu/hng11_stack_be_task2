import pool from "../helpers/db.config";

const createOrganisationTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS organisations (
      orgId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      userId UUID REFERENCES users(userId) ON DELETE CASCADE
    )
  `;
  await pool.query(queryText);
};

const createUserOrganisationTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS user_organisations (
      userId UUID REFERENCES users(userId) ON DELETE CASCADE,
      orgId UUID REFERENCES organisations(orgId) ON DELETE CASCADE,
      PRIMARY KEY (userId, orgId)
    )
  `;
  await pool.query(queryText);
};

const createOrganisation = async (organisation) => {
  const queryText = `
    INSERT INTO organisations (name, description, userId)
    VALUES ($1, $2, $3)
    RETURNING orgId, name, description
  `;
  const values = [organisation.name, organisation.description, organisation.userId];
  const res = await pool.query(queryText, values);
  return res.rows[0];
};

const findOrganisationById = async (orgId) => {
  const queryText = 'SELECT * FROM organisations WHERE orgId = $1';
  const res = await pool.query(queryText, [orgId]);
  return res.rows[0];
};

const findOrganisationsByUserId = async (userId) => {
  const queryText = 'SELECT * FROM organisations WHERE userId = $1';
  const res = await pool.query(queryText, [userId]);
  return res.rows;
};

const addUserToOrganisation = async (userId, orgId) => {
  const queryText = `
    INSERT INTO user_organisations (userId, orgId)
    VALUES ($1, $2)
  `;
  const values = [userId, orgId];
  await pool.query(queryText, values);
};

export { createOrganisationTable, createUserOrganisationTable, createOrganisation, findOrganisationById, findOrganisationsByUserId, addUserToOrganisation };
