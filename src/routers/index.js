import { Router } from "express";
import appointmentRouter from "./appointmentRouters.js";
import patientRouter from "./patientRouters.js";
import userRouter from "./userRouters.js";

const router = Router();
router.use(userRouter);
router.use(patientRouter);
router.use(appointmentRouter);
export default router;