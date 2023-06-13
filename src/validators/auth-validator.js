const Joi = require('joi');
const validate = require('./validate');

const registrySchema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required().pattern(/^[a-zA-Z0-9]{4,30}$/),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    gender: Joi.number().integer(),
    role: Joi.number().integer(),
})




const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});


exports.validateLogin = validate(loginSchema);
exports.validateRegistry = validate(registrySchema);