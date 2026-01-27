import  {validator} from "../../middleware/index.js";
import { logIn,signUp } from "./auth.service.js";
import { Router } from "express";

const router = Router();
router.post('/signup', async (req, res, next) => {
    try {
        validator.validSignup(req.body)
         const newUser =await signUp(req.body);
         if (newUser)
        return res.status(201).json({message : "signup success "})

    } catch (error) {
        next(error);
    };
});

router.post('/login', async (req, res, next) => {
    try {
        validator.validLogin(req.body);
        
         await logIn(req.body);
         const {userEmail} = req.body;
       return res.status(200).json({ message : "successfully Login",email : userEmail })

    } catch (error) {
       next(error)
    };
});
export default router;