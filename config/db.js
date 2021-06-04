const Sequelize = require('sequelize');
const config = require('config');

const DeviceModel = require('../models/Device');
const db = config.get('postgresURI');
const sequelize = new Sequelize(db);
const queryInterface = sequelize.getQueryInterface();
const Device = DeviceModel(sequelize, Sequelize);

Device.hasMany(Device, { foreignKey: 'originalDeviceId', as: 'modifications' });
Device.belongsTo(Device, { foreignKey: 'originalDeviceId', as: 'originalDevice' });

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Postgres Connected');

        await sequelize.sync({ alter: true });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize, Sequelize, queryInterface, Device };
