import { DataTypes } from 'sequelize';
import { sequelize } from '../helpers/db.config.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  lastName: {
    type: DataTypes.STRING,
    unique: true,
    sparse: true,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    sparse: true,
    trim: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
}, {
  timestamps: true,
});

export default User;
