const getCreditStatement = require('../repository/creditCardStatement.repository')
const {getClientCard} = require('../repository/clientCard.repository')
const CreditCardInstallment = require('../models/creditCardInstallment')
//month, creditCardNumber

const creditCardStatement = async (date, clientCod) =>{

    try{
        const  {clientCardNumber}  = await getClientCard(clientCod)
        const statements = await getCreditStatement(date, clientCardNumber)
        const newstatement = statements.map(item => {
            return new CreditCardInstallment(item.creditCardEntrieInstallmentDate, item.creditCardEntrieInstallmentValue, item.cardEntrieCreditDescription)
        })
        return newstatement
    }catch(err){
        throw err
    }


}

module.exports = creditCardStatement