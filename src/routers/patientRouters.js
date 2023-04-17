import { Router } from "express";
import { registerPatient } from "../controllers/patientControllers.js";
import { validatePatient } from "../middlewares/validatePatient.js";
import { validateToken } from "../middlewares/validateToken.js";

const patientRouter = Router();
patientRouter.post('/patient', validateToken, validatePatient, registerPatient);

export default patientRouter;