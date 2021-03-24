const paydebitHandler = require('../../api/controllers/userControllers/paydebit.controller')
const {PayDebitDTO} = require('../../api/models/dto/paydebit.dto')
const Joi = require('joi')

const paydebit = {
    method:'POST',
    path: '/user/paydebit',
    handler: paydebitHandler,
    options: {
        tags: ['api', 'debit'],
        description: 'Rota de lançamento de débito',
        notes: 'É importante enviar o token no header dessa requisição',
        validate: {
            headers: Joi.object({'x-access-token':Joi.string()}).unknown(),
            payload: PayDebitDTO
            
        },
        
        response: {
            status: { 
                200: Joi.any(),
                400: Joi.any()
            }
        } 
    } 
}


module.exports = paydebit