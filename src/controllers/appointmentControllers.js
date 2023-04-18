import { createAppointment, findAppointmentByDate } from "../repositories/queries.js";

export async function scheduleAppointment(req, res){
    const {user} = req;
    if(user.type_id!==1 && user.type_id!==2) return res.sendStatus(401);
    const created_by = user.name;
    const {patient_id, type_id, health_insurance, date, start_time} = req.body;
    try {
        await createAppointment({patient_id, type_id, health_insurance, date, start_time, created_by})
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};
export async function listAppointmentByDate(req, res){
    const {user} = req;
    if(user.type_id!==1 && user.type_id!==2) return res.sendStatus(401);
    const {date} = req.params;
    try {
        const appointments = await findAppointmentByDate(date);
        res.status(200).send(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
}