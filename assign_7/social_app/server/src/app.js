import { dbConnection } from "./database/connection.js";
import express from "express";
import { userRouter,postRouter,commentRouter} from "./modules/index.js";
import  {errorHandler} from "./middlewares/error/index.js"; 

function bootStrap(app) {
    dbConnection();
    
    app.use(express.json());

    app.use("/user", userRouter);

    app.use("/post", postRouter);

    app.use("/comment", commentRouter);

    app.use(errorHandler)
}

export default bootStrap;