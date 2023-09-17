const sequelize = require('../config/connection');
const { User,Lock } = require('../models');

const userData = require('./userData.json');

const lockData = require('./lockData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

 
  for (const lock of lockData) {
    await Lock.create({
      ...lock,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
