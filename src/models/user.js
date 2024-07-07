import { DataTypes } from 'sequelize';
import sequelize from '../helpers/sequelize.js';

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: "userId is required" },
      isUUID: { args: 4, msg: "userId must be a valid UUID" },
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "First name is required" },
      notEmpty: { msg: "First name cannot be empty" },
      is: {
        args: /^[a-zA-Z\s]*$/,
        msg: "First name must contain only letters and spaces",
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Last name is required" },
      notEmpty: { msg: "Last name cannot be empty" },
      is: {
        args: /^[a-zA-Z\s]*$/,
        msg: "Last name must contain only letters and spaces",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: "Email is required" },
      notEmpty: { msg: "Email cannot be empty" },
      isEmail: { msg: "Email must be a valid email address" },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Password is required" },
      notEmpty: { msg: "Password cannot be empty" },
      len: {
        args: [6, 100],
        msg: "Password must be at least 6 characters long",
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9+\-\s]*$/,
        msg: "Phone number must contain only numbers, spaces, plus signs, and hyphens",
      },
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default User;
