import joi from 'joi'

const patientSchema = joi.object({
    name: joi.string().required(),
    birthdate: joi.date().required(),
    address: joi.object({
      city: joi.string().required(),
      neighborhood: joi.string().required(),
      street: joi.string().required(),
      number: joi.number().required(),
      complement: joi.string().optional().allow('')
    }),
    responsible: joi.string().required(),
    phoneNumber: joi.string().required(),
    email: joi.string().email().required()
});

export async function validatePatient(req, res, next){
    const patient = req.body;
    const validation = patientSchema.validate(patient, { abortEarly: false });
    const {error} = validation;
    if (error){
        const messages = error.details.map((detail) => detail.message);
        console.log(messages);
        return res.status(400).json({ error: messages });
    }
    next();
};