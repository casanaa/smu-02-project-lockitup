const { Model, DataTypes } = require('sequelize');
//import the built in data types
const sequelize = require('../config/connection');
//create our Project model
class Project extends Model {}

//create fields/columns for Project model
Project.init(
  //extending model and calling 
  {
    //manually define the primary key
    id: {
      //define what the ID would be 
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
  //link to database connection
  {
    sequelize,
    timestamps: false,
    //prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Project;
