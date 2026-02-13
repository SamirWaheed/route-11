import {sequelize} from "../connection.js";

import {Model,DataTypes} from "sequelize";
import user from "./user.model.js";
import post from "./post.model.js";

class comment extends Model {};
comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
                len: [1, 500],

        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: "user",
            key: "id"
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: "post",
            key: "id"
        }
    }
}, {

    sequelize,
    modelName: "comment",
    timestamps: true,
    paranoid: true
});
post.hasMany(comment, {
    foreignKey: "postId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
user.hasMany(comment, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
comment.belongsTo(post);
comment.belongsTo(user);

export default comment;