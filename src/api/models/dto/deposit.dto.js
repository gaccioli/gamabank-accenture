const Joi = require('joi');

const DepositRequestDTO = Joi.object({
    headers : Joi.object({'x-access-token':Joi.string()}).unknown(),
    account: Joi.number().required(),
    userCPF: Joi.string().example('12345678909'),
    value: Joi.number().required(),
    description: Joi.string().example('para transferir pra mamãe')
}).label('DepositRequestDTO')


module.exports = {DepositRequestDTO}