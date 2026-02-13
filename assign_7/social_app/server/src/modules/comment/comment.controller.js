import {Router} from 'express';
import * as commentService from './comment.service.js';
import comment from '../../database/models/comment.model.js';


const commentRouter = Router();

commentRouter.post('/new_comment', async (req, res,next) => {
    try {
        const newComments = await commentService.bulkOfComment(req.body);
        res.status(201).json(newComments);
    } catch (error) {
        next(error);
    }
});

commentRouter.patch('/update/:id',async(req,res,next)=>{
    try {
        const result = await commentService.updateComment(req.params.id,req.body);
        res.status(200).json(result)
    } catch (error) {
        next (error)
    }
});

commentRouter.post("/find_or_create", async (req, res, next) => {
    try {
        const result = await commentService.findOrCreateComment(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

commentRouter.get("/search/:word", async (req, res, next) => {
    try {
        const result = await commentService.findCommentsByWord(req.params.word);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

commentRouter.get("/recent/:postId", async (req, res, next) => {
    try {
        const comments = await commentService.getRecentComments(req.params.postId);
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
});

commentRouter.get("/:id/details", async (req, res, next) => {
    try {
        const commentDetails = await commentService.getCommentsByPostUser (req.params.id);
        res.status(200).json(commentDetails);
    } catch (error) {
        next(error);
    }
});


export default commentRouter;