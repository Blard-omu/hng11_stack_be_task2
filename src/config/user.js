import pool from '../helpers/db.config.js';


const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      userId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(255)
    )
  `;
  await pool.query(queryText);
};

const createUser = async (user) => {
  const queryText = `
    INSERT INTO users (firstName, lastName, email, password, phone)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING userId, firstName, lastName, email, phone
  `;
  const values = [user.firstName, user.lastName, user.email, user.password, user.phone];
  const res = await pool.query(queryText, values);
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const queryText = 'SELECT * FROM users WHERE email = $1';
  const res = await pool.query(queryText, [email]);
  return res.rows[0];
};

const findUserById = async (userId) => {
  const queryText = 'SELECT * FROM users WHERE userId = $1';
  const res = await pool.query(queryText, [userId]);
  return res.rows[0];
};

const getAllUsers = async () => {
  const queryText = 'SELECT * FROM users';
  const res = await pool.query(queryText);
  return res.rows;
};





export { createUserTable, createUser, findUserByEmail, findUserById, getAllUsers };
