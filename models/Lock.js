const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { encrypt } = require('../utils/crypto');

//create our Lock model
class Lock extends Model {}

Lock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    site: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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
    hooks: {
      beforeCreate: async (newLockData) => {
        newLockData.password = await encrypt(newLockData.password);
        return newLockData;
      },
      beforeUpdate: async (updatedLockData) => {
        updatedLockData.password = await encrypt(updatedLockData.password);
        return updatedLockData;
      },
    },
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'lock',
  }
);

module.exports = Lock;
