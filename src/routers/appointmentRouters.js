import { Router } from "express";
import { listAppointmentByDate, scheduleAppointment } from "../controllers/appointmentControllers.js";
import { validateAppointment } from "../middlewares/validateAppointment.js";
import { validateToken } from "../middlewares/validateToken.js";

const appointmentRouter = Router();
appointmentRouter.post('/appointment', validateToken, validateAppointment, scheduleAppointment);
appointmentRouter.get('/appointment/:date', validateToken, listAppointmentByDate);

export default appointmentRouter;