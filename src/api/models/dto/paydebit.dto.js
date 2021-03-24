const Joi = require('joi');


const PayDebitDTO = Joi.object({
 
    value: Joi.number().required(),
    description: Joi.string().required()

}).label('PayDebitDTO')


module.exports = { PayDebitDTO }