import {
    Sequelize
} from "sequelize";
const sequelize = new Sequelize({
    database: 'social_app_db',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    dialect: "mysql",
    logging : (msg) =>{ console.log( `sql Query ::: ${msg}` )}

});
async function dbConnection() {
    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

};
export  {dbConnection ,sequelize};