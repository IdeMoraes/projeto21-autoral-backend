import joi from 'joi'

const appointmentSchema = joi.object({
    patient_id: joi.number().integer().required(),
    type_id: joi.number().integer().required(),
    health_insurance: joi.boolean().required(),
    date: joi.date().required(),
    start_time: joi.string().required(),
});

export async function validateAppointment(req, res, next){
    const appointment = req.body;
    const validation = appointmentSchema.validate(appointment, { abortEarly: false });
    const {error} = validation;
    if (error){
        const messages = error.details.map((detail) => detail.message);
        console.log(messages);
        return res.status(400).json({ error: messages });
    }
    next();
};