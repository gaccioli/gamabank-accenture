const Joi = require('joi');


const PayCreditStatementDTO = Joi.object({
    date: Joi.string().required(),

}).label('PayCreditStatementDTO')


module.exports = { PayCreditStatementDTO }