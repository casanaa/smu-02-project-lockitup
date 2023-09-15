const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

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
    // hooks: {
    //   beforeCreate: async (newLockData) => {
    //     newLockData.password = await bcrypt.hash(newLockData.password, 10);
    //     return newLockData;
    //   },
    //   beforeUpdate: async (updatedLockData) => {
    //     updatedLockData.password = await bcrypt.hash(updatedLockData.password, 10);
    //     return updatedLockData;
    //   },
    // },
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'lock',
  }
);

module.exports = Lock;
