import appConfig from "./config/env.config.js";
import express from "express";

import { dbConnection } from "./database/db.connection.js";
import { bookRouter, authorRouter,logRouter} from "./modules/index.js";
import { errorHandler } from "./middleware/index.js";




const port = appConfig.app.Port ?? 3000;
console.log(port)
export default function bootStrap(app) {
    dbConnection();
    
    app.use(express.json());

    app.use('/collection/book',bookRouter);
    app.use('/collection/author',authorRouter);
    app.use('/collection/log',logRouter);

    app.use("{/*dummy}", (req, res) => {
        res.status(404).json({
            status: 'error',
            message: 'Route not found'
        });
    });
    
    app.use(errorHandler);

    app.listen(port,()=>{
        console.log("Success")
    })
}