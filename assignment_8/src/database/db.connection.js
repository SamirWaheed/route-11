import {MongoClient} from 'mongodb';
import appConfig from '../config/env.config.js';
const database = appConfig.database;


const client =  new MongoClient(database.MONGO_URL);
export const Db = client.db("library_db")

export  async  function dbConnection(){
    try {
        await client.connect();
        console.log("connect with Database Successfully")
    } catch (error) {
        console.error("Unable to connect with database",error)
    }
}

