const Joi = require('joi');

//O headers deveria permitir omissão aos itens: accNumber, userCPF e account.
//Entretando, isto não está acontecendo.

const TransferRequestDTO = Joi.object({

    destinyAccount: Joi.number().required()
        .description('Aqui, você passa a conta de quem receberá a transferência.'), 
    CPF: Joi.string().example('12345678909')
        .description('CPF válido.'),
    value: Joi.number(),
    originAccount: Joi.number()
        .description('A conta a partir da qual sairá a transferência.'),
    bank: Joi.number()
        .description('Recebe um número que representa um banco na tabela BACEN.'),
    description: Joi.string()
        .description('Descrição da transferência'),

}).label('TransferRequestDTO')


module.exports = { TransferRequestDTO }