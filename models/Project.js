const { Model, DataTypes } = require('sequelize');
//import the built in data types
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
  //extending model and calling 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      //allowNull defaults to true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    needed_funding: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    //don't fotrget to enable tiemstamps
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Project;
