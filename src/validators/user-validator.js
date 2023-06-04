const Joi = require('joi');
const validate = require('./validate');

const changePasswordSchema = Joi.object({
    password: Joi.string().trim().required().pattern(/^[a-zA-Z0-9]{4,30}$/),
    confirmPassword: Joi.string().trim().required().valid(Joi.ref('password')).strip()
})


exports.validateChangePassword = validate(changePasswordSchema);
