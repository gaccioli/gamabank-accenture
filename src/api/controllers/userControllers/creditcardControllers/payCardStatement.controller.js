const creditCardStatement = require('../../../services/payCardStatement.service')
const { getUserTokenData } = require('../../../services/userTokenData.service')
const { sendPaidInstallmentEmail } = require('../../../services/email.service')
const { getClientByCod } = require('../../../repository/client.repository')
const { getClientCard } = require('../../../repository/clientCard.repository')

const payCardStatementHandler = async (request, h) => {
    let shouldEmailBeSent = true
    let emailData
    const token = request.headers['x-access-token']
    if(token){
        try{
            const { date } = request.payload
            const { clientCod } = await getUserTokenData(token)
            const cardStatement = (await creditCardStatement(date, clientCod)).statements
            console.log('cardStatement: ', cardStatement)
            emailData = {
                ...await getClientByCod(clientCod),
                ...await getClientCard(clientCod)
            }
            console.log('emailData - payCardStatement: \n', emailData)
            return cardStatement
        }catch(err){
            shouldEmailBeSent = false
            return err.message
        }finally{
            if(shouldEmailBeSent) await sendPaidInstallmentEmail(emailData)
        }

    }
}

module.exports = payCardStatementHandler