const payCardStatementHandler = require('../../../api/controllers/userControllers/creditcardControllers/payCardStatement.controller')
const {PayCreditStatementDTO} = require('../../../api/models/dto/paycreditstatement.dto')
const Joi = require('joi')

const billpayment = {
    method:'POST',

    path: '/user/creditcards/payment/',
    handler: payCardStatementHandler,
    options: {
        tags: ['api', 'pay-creditcardstatements'],
        description: 'Rota para pagar uma parcela de uma compra no cartão de crédito',
        notes: 'Para pagar uma parcela, é necessário passar o token do usuário no header da requisição e informar no body o mês e o ano da parcela (date).  ',
        validate: {
            headers: Joi.object({'x-access-token':Joi.string()}).unknown(),
            payload: PayCreditStatementDTO
            
        },
        
        response: {
            status: { 
                200: Joi.any(),
                400: Joi.any()
            }
        } 
    } 
}


module.exports = billpayment