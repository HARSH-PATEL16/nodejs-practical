const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user_token extends Model {
        static associate(models) {
            user_token.belongsTo(models.user, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
        }
    }

    user_token.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'user', key: 'id', as: 'user_id' },
            onDelete: 'CASCADE'
        },
        access_token: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'user_token',
    })
    return user_token
};