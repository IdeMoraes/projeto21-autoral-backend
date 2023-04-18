import postgres from "../db.js";

async function createUser(name, hashPassword, type_id){
    try {
        await postgres.query('INSERT INTO "user" (name, password, type_id) VALUES ($1, $2, $3);', [name, hashPassword, type_id]);
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
    
};
async function findUserByName(name){
    try {
        const resp = await postgres.query('SELECT * FROM "user" WHERE name = $1;', [name]);
        if (resp.rows.length === 0) {
            return null;
        }
        return resp.rows[0];
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function findUserByUserId(user_id){
    try {
        const resp = await postgres.query('SELECT * FROM "user" WHERE id = $1;', [user_id]);
        if (resp.rows.length === 0) {
            return null;
        }
        return resp.rows[0];
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function createSession(user_id, token){
    try {
        await postgres.query('INSERT INTO "session" (user_id, token) VALUES ($1, $2);', [user_id, token]);
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function findSessionByToken(token){
    try {
        const resp = await postgres.query('SELECT * FROM "session" WHERE token = $1;', [token]);
        if (resp.rows.length === 0) {
            return null;
        }
        return resp.rows[0];
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function deleteSessionByToken(token){
    try {
        await postgres.query('DELETE FROM "session" WHERE token = $1;', [token]);
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function createPatient({name, birthdate, responsible, phoneNumber, email, created_by}){
    try {
        const resp = await postgres.query('INSERT INTO "patient" (name, birthdate, responsible, phoneNumber, email, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;', [name, birthdate, responsible, phoneNumber, email, created_by]);
        return resp.rows[0];
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function findAllPatients(){
    try {
        const resp = await postgres.query('SELECT id, name FROM "patient";');
        return resp.rows;
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function createAddress({city, neighborhood, street, number, complement, patient_id, created_by}){
    try {
        await postgres.query('INSERT INTO "address" (city, neighborhood, street, number, complement, patient_id, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;', [city, neighborhood, street, number, complement, patient_id, created_by]);
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function createAppointment({patient_id, type_id, health_insurance, date, start_time, created_by}){
    try {
        await postgres.query('INSERT INTO "appointment" (patient_id, type_id, health_insurance, date, start_time, created_by) VALUES ($1, $2, $3, $4, $5, $6);', [patient_id, type_id, health_insurance, date, start_time, created_by]);
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}
async function findAppointmentByDate(date){
    const resp = await postgres.query(
        'SELECT a.id, a.type_id, a.health_insurance, a.start_time, p.name AS patient_name FROM appointment a JOIN patient p ON p.id = a.patient_id WHERE a.date = $1 ORDER BY a.start_time ASC;',
        [date]);
    return resp.rows;
}

export {createUser, findUserByName, findUserByUserId, createSession, findSessionByToken, deleteSessionByToken, createPatient, findAllPatients, createAddress, createAppointment, findAppointmentByDate};