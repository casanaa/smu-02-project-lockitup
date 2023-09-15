const User = require('./User');
const Lock = require('./Lock');

User.hasMany(Lock, {
  //define the third table needed to store the foreign keys
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Lock.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Lock };
