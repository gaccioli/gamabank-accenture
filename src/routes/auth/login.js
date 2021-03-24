const loginHandler = require('../../api/controllers/authControllers/login.controller')
const Joi = require('joi')
const {LoginRequestDTO, LoginResponseDTO } = require('../../api/models/dto/auth.dto')

const login = {
    method:'POST',
    path: '/auth/login',
    handler: loginHandler,
    options: {
        tags: ['api', 'login'],
        description: 'Realiza o login do usuário no sistema',
        notes: 'Para realizar o login, é necessário enviar o email e a senha usados no signup no body da requisição.',
        validate: {
            payload: LoginRequestDTO
        },
        response: {
            status: { 
                200: LoginResponseDTO,
                400: Joi.any()
            }
        } 
    } 
}



module.exports = login