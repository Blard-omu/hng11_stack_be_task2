import User from './user.js';
import Organisation from './organisation.js';

User.hasMany(Organisation, { foreignKey: 'userId', as: 'organisations' });
Organisation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Organisation };
