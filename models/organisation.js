// import pool from '../src/helpers/db.config.js';

// const createOrganisationTable = async () => {
//   const queryText = `
//     CREATE TABLE IF NOT EXISTS organisations (
//       orgId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//       name VARCHAR(255) NOT NULL,
//       description TEXT,
//       userId UUID NOT NULL,
//       FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
//     )
//   `;
//   await pool.query(queryText);
// };


// const createOrganisation = async (organisation) => {
//   const queryText = `
//     INSERT INTO organisations (name, description, userId)
//     VALUES ($1, $2, $3)
//     RETURNING orgId, name, description, userId
//   `;
//   const values = [organisation.name, organisation.description, organisation.userId];
//   const res = await pool.query(queryText, values);
//   return res.rows[0];
// };

// const getOrganisationsByUserId = async (userId) => {
//   const queryText = `
//     SELECT * FROM organisations WHERE userId = $1
//   `;
//   const res = await pool.query(queryText, [userId]);
//   return res.rows;
// };

// export { createOrganisationTable, createOrganisation, getOrganisationsByUserId };


// models/organisation.js
import pool from '../src/helpers/db.config.js';

const createOrganisationTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS organisations (
      orgId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      userId UUID NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
    )
  `;
  await pool.query(queryText);
};

const createOrganisation = async (organisation) => {
  const queryText = `
    INSERT INTO organisations (name, description, userId)
    VALUES ($1, $2, $3)
    RETURNING orgId, name, description, userId
  `;
  const values = [organisation.name, organisation.description, organisation.userId];
  const res = await pool.query(queryText, values);
  return res.rows[0];
};

const getOrganisationsByUserId = async (userId) => {
  const queryText = `
    SELECT * FROM organisations WHERE userId = $1
  `;
  const res = await pool.query(queryText, [userId]);
  return res.rows;
};

export { createOrganisationTable, createOrganisation, getOrganisationsByUserId };


