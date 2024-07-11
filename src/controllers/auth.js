// import { createUser, findUserByEmail, getAllUsers, findUserById } from '../../models/user.js';
// import { createOrganisation} from '../../models/organisation.js';
// import { hashPassword, comparePassword } from '../helpers/auth.js';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// export const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone, password } = req.body;

//     // Check if user already exists
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({
//       status: "Bad Request",
//       message: "User already exists",
//       statusCode: 400
//       });
//     }

//     // Hash the password
//     const hashedPassword = await hashPassword(password);

//     // Create new user
//     const user = await createUser({
//       firstName,
//       lastName,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     // console.log(user);

//     const organisation = await createOrganisation({
//       name: `${firstName}'s Organisation`,
//       description: `This organisation is created by "${firstName} ${lastName}"`,
//       userId: user.userid,
//     });

//     // Create JWT token
//     const accessToken = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     // Return success response
//     res.status(201).json({
//       status: 'success',
//       message: 'Registration successful',
//       data: {
//         accessToken,
//         user: {
//           userId: user.userid,
//           firstName: user.firstname,
//           lastName: user.lastname,
//           email: user.email,
//           phone: user.phone,
//         },
//         // organisation: {
//         //   orgId: organisation.orgid,
//         //   name: organisation.name,
//         //   description: organisation.description,
//         // }
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }

//     const user = await findUserByEmail(email);

//     if (!user) {
//       return res.status(404).json({
//       status: "Failed",
//       message: "User not found",
//       statusCode: 404
//       });
//     }

//     const match = await comparePassword(password, user.password);
//     if (!match) {
//       return res.status(400).json({
//       status: "Failed",
//       message: "Wrong password",
//       statusCode: 400
//       });
//     }

//     const token = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({
//       status: "success",
//       message: "Login successful",
//       data: {
//         accessToken: token,
//         user: {
//           userId: user.userid,
//           firstName: user.firstname,
//           lastName: user.lastname,
//           email: user.email,
//           phone: user.phone,
//         },
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "Internal Server Error",
//       message: err.message,
//       statusCode: 500
//     });
//   }
// };



// export const getUsers = async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.status(200).json({
//       status: 'success',
//       data: users,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await findUserById(id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import { createUser, findUserByEmail, getAllUsers, findUserById } from '../../models/user.js';
import { createOrganisation } from '../../models/organisation.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      return next(error);
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
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await findUserByEmail(email);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      const error = new Error("Wrong password");
      error.statusCode = 400;
      return next(error);
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
  } catch (error) {
    next(error);
  }
};



