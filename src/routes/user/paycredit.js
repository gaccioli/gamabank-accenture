const paycreditHandler = require('../../api/controllers/userControllers/paycredit.controller')
const {PayCreditDTO} = require('../../api/models/dto/paycredit.dto')
const Joi = require('joi')

const paycredit = {
    method:'POST',
    path: '/user/paycredit',
    handler: paycreditHandler,
    options: {
        tags: ['api', 'credit'],
        description: 'Rota para realizar um lançamento de crédito',
        notes: 'Para realizar uma compra a crédito, é necessário passar no body da requisição o número do cartão do cliente (cardNumber), o valor da compra (value), o número de parcelas (installments), a descrição da compra (description), a data de expiração do cartão do cliente (expiration), o nome do cliente (holder), a senha do usuário (password) e o cvv do cartão (cvv). ',
        validate: {
            headers: Joi.object({'x-access-token':Joi.string()}).unknown(),
            payload: PayCreditDTO
            
        },
        
        response: {
            status: { 
                200: Joi.any(),
                400: Joi.any()
            }
        } 
    } 
}


module.exports = paycredit