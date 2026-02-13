import {
    Router
} from 'express';
import * as userService from './user.service.js';
import user from '../../database/models/user.model.js';


const userRouter = Router();


userRouter.post("/signup", async (req, res, next) => {
    try {
        const user = await userService.addUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }

});

userRouter.post("/login", async (req, res, next) => {
    try {
        const user = await userService.loginUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }



});

userRouter.patch("/update/:id", async (req, res, next) => {
    try {
        const editedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(editedUser);
    } catch (error) {
        next(error);
    } });


userRouter.get("/profile", async (req, res, next) => {
    try {
        const userProfile = await userService.getUserByEmail(req.body);
        res.status(200).json(userProfile);
    } catch (error) {
        next(error);
    }
});


userRouter.get("/:id", async (req, res, next) => {
    try {
        const userProfile = await userService.getUserById(req.params.id);
        res.status(200).json(userProfile);
    } catch (error) {
        next(error);
    }   }); 
export default userRouter;