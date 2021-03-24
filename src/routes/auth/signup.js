const signupHandler = require('../../api/controllers/authControllers/signup.controller')
const {SignUpRequestDTO} = require('../../api/models/dto/auth.dto')
const Joi = require('joi');

const signup = {
    method:'POST',
    path: '/auth/signup',
    handler: signupHandler,
    options: {
        tags: ['api', 'signup'],
        description: 'Realiza o cadastro do usuário no sistema',
        notes: 'Para realizar o cadastro, é necessário enviar o email (clientEmail), a senha (clientPassword), o nome do cliente (clientName) e o CPF do cliente (clientCPF) no body da requisição. ',
        validate: {
            payload: SignUpRequestDTO
        },
        response: {
            status: { 
                200: Joi.any(),
                400: Joi.any()
            }
        } 
    } 
}



module.exports = signup