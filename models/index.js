const User = require('./User');
const Project = require('./Project');

User.hasMany(Project, {
  //define the third table needed to store the foreign keys
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Project };
