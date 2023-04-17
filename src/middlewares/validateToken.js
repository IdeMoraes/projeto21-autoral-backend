import { findSessionByToken, findUserByUserId } from '../repositories/queries.js';

export async function validateToken(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.sendStatus(401);
        const session = await findSessionByToken(token);
        if(!session) return res.sendStatus(401);
        const user = await findUserByUserId(session.user_id);
        if(!user) return res.sendStatus(401);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error.name}: ${error.message}`);
    }  
};