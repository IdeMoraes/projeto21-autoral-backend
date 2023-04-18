import { createAddress, createPatient, findAllPatients } from "../repositories/queries.js";

export async function registerPatient(req, res){
    const {user} = req;
    if(user.type_id!==1 && user.type_id!==2) return res.sendStatus(401);
    const created_by = user.name;
    const {name, birthdate, address, responsible, phoneNumber, email} = req.body;
    const {city, neighborhood, street, number, complement} = address;
    try {
        const patient = await createPatient({name, birthdate, responsible, phoneNumber, email, created_by});
        const patient_id = patient.id;
        await createAddress({city, neighborhood, street, number, complement, patient_id, created_by});
        return res.status(201).send(patient);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};
export async function listAllPatients(req, res){
    const {user} = req;
    if(user.type_id!==1 && user.type_id!==2) return res.sendStatus(401);
    try {
        const patients = await findAllPatients();
        return res.status(200).send(patients);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);   
    }
}