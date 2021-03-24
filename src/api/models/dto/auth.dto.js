const Joi = require('joi');

const LoginRequestDTO = Joi.object({
    clientEmail: Joi.string().required().example('johndoe@example.com'),
    clientPassword: Joi.string().required().example('s3nh@b0A')
}).label('LoginRequestDTO')


const LoginResponseDTO = Joi.object({
    login: Joi.string().valid('Concluido','Invalido'),
    auth: Joi.alternatives().conditional('login',{is:'Concluido', then: Joi.bool().required()}),
    token: Joi.alternatives().conditional('login',{is:'Concluido', then: Joi.string().required()}),
    error: Joi.alternatives().conditional('login',{is:'Invalido', then: Joi.string().required()})
}).label('LoginResponseDTO')
 


const SignUpRequestDTO = Joi.object({
    clientEmail: Joi.string().required().example('johndoe@example.com'),
    clientPassword:Joi.string().required().example('s3nh@b0A'),
    clientName:Joi.string().required().example('John Doe'),
    clientCPF:Joi.string().required().example('12345678909')
    
}).label('SignUpRequestDTO')


module.exports = { LoginRequestDTO , LoginResponseDTO, SignUpRequestDTO }