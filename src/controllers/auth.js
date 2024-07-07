import { createUser, findUserByEmail, getAllUsers, findUserById } from '../../models/user.js';
import { createOrganisation} from '../../models/organisation.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await createUser({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    // console.log(user);

    const organisation = await createOrganisation({
      name: `${firstName}'s Organisation`,
      description: `This organisation is created by "${firstName} ${lastName}"`,
      userId: user.userid,
    });

    // Create JWT token
    const accessToken = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken,
        user: {
          userId: user.userid,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          phone: user.phone,
        },
        organisation: {
          orgId: organisation.orgid,
          name: organisation.name,
          description: organisation.description,
        }
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: token,
        user: {
          userId: user.userid,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


