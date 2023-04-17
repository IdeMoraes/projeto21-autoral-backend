import postgres from "../db.js";
import bcrypt from "bcrypt";
import { createSession, createUser, deleteSessionByToken, findUserByName } from "../repositories/queries.js";
import { v4 as uuidV4 } from "uuid";

export async function countUsers(req, res){
    try {
        const result = await postgres.query('SELECT COUNT(*) FROM "user";');
        return res.status(200).send(result.rows[0].count);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};

export async function signup(req, res){
    //type_id===1 Banco vazio ou 1 craindo
    //type_id===2 1 criando
    //type_id===3 1e2 criando
    const {name, password, type_id} = req.body;
    const hashPassword = bcrypt.hashSync(password,10);
    try {
        await createUser(name, hashPassword, type_id)
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};

export async function login(req, res){
    const {name, password} = req.body;
    try {
        const user = await findUserByName(name);
        if(!user) return res.sendStatus(404);
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.sendStatus(401);
        const token = uuidV4();
        await createSession(user.id, token);
        return res.status(200).send({userName: user.name, userType: user.type_id, token});
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
}

export async function logout(req, res){
    const token = req.headers.authorization.split(' ')[1];
    try {
        await deleteSessionByToken(token);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }
}
