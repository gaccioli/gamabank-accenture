const CreditCardTransaction = require('../../models/creditCardTransaction') 
const creditTransaction = require('../../services/creditPosting.service')
const ClientCard = require('../../models/clientCard')
const { sendCreditCardEntryEmail } = require('../../services/email.service')
const { getClientByCod } = require('../../repository/client.repository')


const paycreditHandler = async (request, h) => {
    //modela a entrada de dados 
    // Dados esperados : clientCard,cardEntrieValue, installmentNumber

    let shouldEmailBeSent = true
    let emailData

    try {
        const {cardNumber,value,installments, description} = request.payload
        const {expiration, holder, password, cvv} = request.payload
        const creditCard = new ClientCard(cardNumber, holder, expiration, cvv, password)
        const creditCardTransaction = new CreditCardTransaction({clientCard:cardNumber,cardEntrieValue:value,installmentNumber:installments, description:description})
        const {clientCod, msg} = await creditTransaction(creditCardTransaction, creditCard)
        emailData = {
            clientData: await getClientByCod(clientCod),
            cardNumber, 
            value, 
            installments, 
            description
        }
        //emailData = userInfo
        return msg

    }catch(err) {
        shouldEmailBeSent = false
        return err.message
    }finally{
        if (shouldEmailBeSent) sendCreditCardEntryEmail(emailData)
    }

}

module.exports = paycreditHandler


