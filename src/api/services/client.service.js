const clientRepository = require('../repository/client.repository')
const mycripto = require('../../helpers/mycripto')
const validate = require('../../helpers/validate')
const createCreditCard = require('./createCreditCard.service')
const { insertCard } = require('../repository/clientCard.repository')
const {createAccount} = require('../repository/checkingAccount.repository')


const newClient = async (client)=>{
    if(
        !validate.passwordValidator(client.clientPassword) ||
        !new validate.ValidaCPF(client.clientCPF).valida() ||
        !validate.emailValidator(client.clientEmail)
    
    ) throw new Error(`Dados invalidos`)

    try{
        const {encryptedPassword, salt} = await mycripto.encryptPassword(client.clientPassword);
    
        client.clientPassword = encryptedPassword
        client.clientSalt = salt
    
    
        const clientId =  await clientRepository.newClient(client) 
        const {insertId:checkingAccountNumber} = await createAccount(clientId)
        const card = await createCreditCard(client.clientName)
        const newCard = await insertCard(clientId, checkingAccountNumber, card)
    
            //envio de e-mail
        return ({message: 'O cadastro foi realizado com sucesso. Verifique os dados da sua conta no seu e-mail.', ...card, newCard: newCard})
    } catch(err){
        throw err
    }

    
}


module.exports = { newClient }