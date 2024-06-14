const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    },
    comment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2]
        },
    },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
}
);

module.exports = Comment;
