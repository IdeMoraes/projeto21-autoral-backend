import { createPatient } from "../repositories/queries.js";


export async function registerPatient(req, res){
    const {name, birthdate, address, responsible, phoneNumber, email, created_by} = req.body;
    const {city, neighborhood, street, number, complement} = address;
    try {
        const patient = await createPatient({name, birthdate, city, neighborhood, street, number, complement, responsible, phoneNumber, email, created_by});
        return res.status(201).send(patient);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};