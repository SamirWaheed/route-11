import { Router } from "express";
import { createBlog, editOnBlog } from "./blog.service.js";
import { validator } from "../../middleware/index.js";

const router = Router();

router.post('/add_blog',async(req ,res,next)=>{
try {
     validator.validBlog(req.body);
     await createBlog(req.body);
    return res.status(201).json({message :"Done ya Boss"});
} catch (error) {
    next(error)
}
})

router.post('/edit_blog/:blogId',async(req ,res,next)=>{
try {

     validator.validUpdateOnBlog(req.body);
     await editOnBlog(req.body,req.params.blogId);
    return res.status(201).json({message :"Done ya Boss"});
} catch (error) {
    next(error)
}
})

export default router ;