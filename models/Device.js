module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define(
        'Device',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            short_name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
                // allowNull: false,
            },
            dimensions: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            weight: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            voltage: {
                type: DataTypes.STRING,
            },
            supply: {
                type: DataTypes.STRING,
            },
            additionalInfo: {
                type: DataTypes.TEXT,
            },
            amountInSupply: {
                type: DataTypes.INTEGER,
            },
            organization: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            comments: {
                type: DataTypes.TEXT,
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
