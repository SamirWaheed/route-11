import { Router } from "express";
import  * as userService  from "./user.service.js";
import { validator } from "../../middleware/index.js";

const router = Router();

router.patch('/updateUser/:id', async (req,res,next)=>{
    const userId = req.params.id;
    const data = req.body ;
    try {
        validator.validUpdate(req.body);
        const result = await userService.updateUser(data, userId);
        return res.status(201).json({ msg: "Update user Successfully" ,result});
    } catch (error) {
        next(error);
    }
    
    } 
);
router.get('/userinfo/:id',async (req,res,next)=>{
    const id = req.params.id;

    try {
          const userInfo = await userService.getUserInfo(id);
      return res.status(200).json({userInfo});
    } catch (error) {
            next(error)
    }
} )

router.delete('/deleteUser/:id',async (req,res,next)=>{
    const id = req.params.id;

    try {
          const deleteUser = await userService.deleteUserById(id);
          if (deleteUser)return res.status(200)
            .json({message : "Delete User Account Successfully"});
      
    } catch (error) {
            next(error)
    }
} )

export default router;