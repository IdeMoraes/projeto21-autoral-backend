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
async function createPatient({name, birthdate, city, neighborhood, street, number, complement, responsible, phoneNumber, email, created_by}){
    try {
        const resp =await postgres.query('INSERT INTO "patient" (name, birthdate, city, neighborhood, street, number, complement, responsible, phoneNumber, email, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;', [name, birthdate, city, neighborhood, street, number, complement, responsible, phoneNumber, email, created_by]);
        return resp.rows[0];
    } catch (error) {
        throw new Error(`${error.name}: ${error.message}`);
    }
}

export {createUser, findUserByName, findUserByUserId, createSession, findSessionByToken, deleteSessionByToken, createPatient};