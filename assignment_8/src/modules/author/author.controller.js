import { Router } from "express";
import * as authorService from "./author.service.js";

const authorRouter = Router();

authorRouter.post("/add-author", async (req, res,next) =>{
try {
      const process = await authorService.addAuthor(req.body);
    res.status(201).json({
        message : "Author added successfully",
        data : process
        
    });
} catch (error) {
    next(error);
}
})

export default authorRouter;
