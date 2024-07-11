import {  getAllUsers, findUserById } from '../../models/user.js';




export const getUsers = async (req, res, next) => {
    try {
      const users = await getAllUsers();

      if (!users) {
        const error = new Error("Users not found");
        error.statusCode = 404;
        return next(error);
      }

      res.status(200).json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await findUserById(id);
  
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        return next(error);
      }
  
      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
  