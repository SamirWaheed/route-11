import dotenv from "dotenv"

dotenv.config({path  :`.${process.env.NODE_ENV}.env`});

const appConfig ={
    app: {
    Port : process.env.PORT ?? 3000,
    Node_Env : process.env.NODE_ENV ?? "dev",
},
    database: {
        // DB_Host : process.env.DB_HOST?? "localhost",
        // DB_User : process.env.DB_USER ?? "root",
        // DB_Password : process.env.DB_PASSWORD ?? "",
        // DB_Name : process.env.DB_NAME ?? "social_app",
        // DB_Port : process.env.DB_PORT ?? "3306"
        MONGO_URL : process.env.MONGO_URL
    }
}
export default appConfig ;