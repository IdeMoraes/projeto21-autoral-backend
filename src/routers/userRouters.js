import { Router } from "express";
import { countUsers, login, logout, signup } from "../controllers/userControllers.js";
import { validateSignup } from "../middlewares/validateSignup.js";

const userRouter = Router();
userRouter.get('/count', countUsers);
userRouter.post('/signup', validateSignup, signup);
userRouter.post('/login', login);
userRouter.delete('/logout', logout);

export default userRouter;