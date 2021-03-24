const statementHandler = require('../../api/controllers/userControllers/statement.controller')
const Joi = require('joi')

const statement = {
    method:'GET',
    path: '/user/statement/{initDate}/{endDate}',
    handler: statementHandler,
    options: {
        tags: ['api', 'statement'],
        description: 'Consulta do extrato da conta corrente do usuário',
        notes: 'Para consultar o extrato da conta de um período específico, é preciso informar o token no header da requisição e também passar como parâmetros no path da requisição a data de início e de fim do período a ser consultado.',
        validate: {
            headers: Joi.object({'x-access-token':Joi.string()}).unknown(),
            params: Joi.object({
                'initDate':Joi.number().required().description('Data inicial'),
                'endDate':Joi.number().required().description('Data final'),
        })
        },
        
        
        response: {
            status: { 
                200: Joi.any(),
                400: Joi.any()
            }
        } 
    }
}


module.exports = statement
