import * as express from 'express';
import  {authRouter} from "./modules/index.js";
import  {userRouter}  from './modules/index.js';
import { blogRouter } from './modules/index.js';
import {errorHandler} from './middleware/index.js';
function bootStrap(app){
    
   
app.use(express.json());
    app.use('/auth', authRouter); 
    app.use('/user', userRouter); 
    app.use('/blog', blogRouter)

    app.use(errorHandler);
};

export default bootStrap;