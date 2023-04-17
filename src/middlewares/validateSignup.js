import joi from 'joi';

const userSchema = joi.object({
    name: joi.string()
    .min(1)
    .max(30)
    .regex(/^[a-zA-Z0-9._]+$/)
    .trim()
    .lowercase()
    .required(),
    password: joi.string()
    .min(8)
    .max(64)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]+$/
    , 'password')
    .required(),
    type_id: joi.number().integer().positive().required(),
});

export async function validateSignup(req, res, next){
    const user = req.body;
    const validation = userSchema.validate(user, { abortEarly: false });
    const {error} = validation;
    if (error){
        const messages = error.details.map((detail) => detail.message);
        console.log(messages);
        return res.status(400).json({ error: messages });
    }
    next();
};