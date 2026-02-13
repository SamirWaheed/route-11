import {
    DataTypes,
    Model
} from "sequelize";
import {
    sequelize
} from "../connection.js";
import user from "./user.model.js";


class post extends Model {};
post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: "user",
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "post",
    timestamps: true,
    paranoid: true

});
user.hasMany(post, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
post.belongsTo(user);
export default post;