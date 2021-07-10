module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define(
        'Device',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            shortName: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
                // allowNull: false,
            },
            additionalInfo: {
                type: DataTypes.TEXT,
            },
            organization: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isModification: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            imagePath: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            // options
        },
    );

    return Device;
};
