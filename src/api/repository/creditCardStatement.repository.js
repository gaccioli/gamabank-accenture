const database = require('../../helpers/database.util.js')

const getCreditStatement = async (date, creditCardumber) => {
    let sqlstatement = `SELECT inst.creditCardEntrieInstallmentDate,  inst.creditCardEntrieInstallmentValue,  cardentrie.cardEntrieCreditDescription, inst.creditCardEntrieInstallmentStatus FROM cardentrie
    INNER JOIN clientcard ON clientcard.clientCardNumber = cardentrie.clientCardNumber
    INNER JOIN creditcardentrieinstallment AS inst ON  inst.creditCardEntrieCod = cardentrie.cardEntrieCod
    WHERE clientcard.clientcardNumber = "${creditCardumber}" AND inst.creditCardEntrieInstallmentDate LIKE "${date}%" AND inst.creditCardEntrieInstallmentStatus = "open"`
    try{
        const result = await database.query(sqlstatement)
        if(result.length === 0) throw new Error("Não existe fatura em aberto para o mês selecionado.")

        return result
    } catch(err) {
        throw err
    }
    
}

module.exports = getCreditStatement