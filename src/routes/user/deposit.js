const Joi = require('joi')
const depositHandler = require('../../api/controllers/userControllers/deposit.controller')
const {DepositRequestDTO} = require('../../api/models/dto/deposit.dto')
const deposit = {
    method:'POST',
    path: '/user/deposit',
    handler: depositHandler,
    options: {
        tags: ['api', 'deposit'],
        description: 'Realiza o depósito em uma conta.',
        notes: 'Para realizar um depósito, é necessário inserir a account (conta) e o CPF (userCPF) da pessoa para quem se quer depositar o valor no body da requisição. Também é importante informar o valor do depósito (value) no body.',
        validate: {
            payload: DepositRequestDTO
        },
        response: {
            status: { 
                200: Joi.any(),
                400: Joi.any()
            }
        } 
    } 
}


module.exports = deposit