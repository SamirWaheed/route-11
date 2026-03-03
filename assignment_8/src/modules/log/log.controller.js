import * as logService from "./log.service.js";
import {Router} from "express";

const logRouter = Router();
logRouter.post('/capped', async (req, res, next) => {
    try {
        await logService.createCappedCollection();  
        res.status(201).json({
            message: "Capped collection created successfully"
        })
    } catch (error) {
        next(error);
    }  
})
logRouter.post('/logs', async (req, res, next) => {
    try {
        const log = req.body;
        await logService.insertLog(log);
        res.status(201).json({
            message: "Log added successfully"
        })
    } catch (error) {
        next(error);
    }
});

logRouter.get('/join', async (req, res, next) => {
    try {
        const result = await logService.joinLogsWithBooks();
        res.status(200).json({
            message: "Joined logs with books",
            data: result
        })
    } catch (error) {
        next(error);
    }
});
export default logRouter;