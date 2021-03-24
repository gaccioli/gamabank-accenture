const Joi = require('joi');


const PayCreditDTO = Joi.object({
    cardNumber: Joi.string().required(),
    value: Joi.number().required(),
    installments: Joi.number().required(),
    description: Joi.string().required(),
    expiration: Joi.string().required(),
    holder: Joi.string().required(),
    cvv: Joi.string().required(),
    password: Joi.string().required()

}).label('PayCreditDTO')


module.exports = { PayCreditDTO }