import { Router } from "express";
import { listAllPatients, registerPatient } from "../controllers/patientControllers.js";
import { validatePatient } from "../middlewares/validatePatient.js";
import { validateToken } from "../middlewares/validateToken.js";

const patientRouter = Router();
patientRouter.post('/patient', validateToken, validatePatient, registerPatient);
patientRouter.get('/patient', validateToken, listAllPatients);

export default patientRouter;