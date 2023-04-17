import { Router } from "express";
import patientRouter from "./patientRouters.js";
import userRouter from "./userRouters.js";

const router = Router();
router.use(userRouter);
router.use(patientRouter);
export default router;