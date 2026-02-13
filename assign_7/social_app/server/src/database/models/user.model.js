import {
    DataTypes
} from "sequelize";
import {
    sequelize
} from "../connection.js";
const user = sequelize.define(
    "user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*&^]).{6,}$/,
                notNull: true,
                checkPasswordLength(value) {
                    if (value.length < 6) {
                        throw new Error("Password must be longer than 6 characters");
                    }
                }
            }

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,

            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ["user", "admin"],
            defaultValue: "user",
            allowNull: false

        },

    }, {

        indexes: [{
            fields: ["email"]
        }],
        freezeTableName: true,
        timestamps: true,
        hooks: {beforeCreate: (user) => {if (user.name.length < 3)
                {throw new Error("Name must be longer than 3 characters"); }
        }}    

    }
)
export default user;