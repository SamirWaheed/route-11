 import {
     Router
 } from 'express';
 import * as postService from './post.service.js';

 const postRouter = Router();

 postRouter.post('/newPost', async (req, res, next) => {
     try {
         const newPost = await postService.addPost(req.body);
         res.status(201).json(newPost);
     } catch (error) {
         next(error);
     }

 });

 postRouter.delete('/deletePost/:id',async (req,res,next)=>{
    try {
        const deletedPost = await postService.deletePost(req.params.id,req.body)
        res.status(200).json(deletedPost);
    } catch (error) {
        next(error)
    }
 });


 postRouter.get("/details", async (req, res, next) => {
    try {
        const posts = await postService.getPostsWithDetails();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});



postRouter.get("/commentCount", async (req, res, next) => {
    try {
        const posts = await postService.getPostsWithCommentCount();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }   
});
     
 export default postRouter;