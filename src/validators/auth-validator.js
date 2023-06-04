const Joi = require('joi');
const validate = require('./validate');

const registrySchema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required().pattern(/^[a-zA-Z0-9]{4,30}$/),
    confirmPassword: Joi.string().trim().required().valid(Joi.ref('password')).strip(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    gender: Joi.string().trim().pattern(/^[0-2]$/),
    role: Joi.string().trim().pattern(/^[0-9]$/),
    licenseNumber: Joi.string().trim(),
    status: Joi.string().pattern(/^[0-2]{1,1}$/)
})




const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});


exports.validateLogin = validate(loginSchema);
exports.validateRegistry = validate(registrySchema);