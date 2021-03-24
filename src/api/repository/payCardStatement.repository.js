const mysql = require('mysql')
const databaseConfigs  = require('../../configs/env').database


// o que vamos receber: creditcard, cardEntrieValue, cardEntrieCreditInstallment
// obj = numero de parcelas, valor de cada parcela
//cardInstallment é um array

let connection
const openConnection = async () => {
    connection = await mysql.createConnection(databaseConfigs)
}

const executeInTransaction = async (sqlstatement) => {
    return new Promise(async (resolve, reject) => {
        await connection.query(sqlstatement, (err, result) => {
            if (err) reject(err)
            resolve(result)

        })
    })
}





const payCardStatement = async (creditCardNumber, date, avaliableLimit ) => {
    return new Promise(async(resolve, reject) => {
        await openConnection()
        connection.beginTransaction(async err =>{
            if(err) throw new Error("sintaxe inválida")
            try{
                const newCardentrieSQL = `SELECT inst.creditCardEntrieInstallmentNumber, inst.creditCardEntrieCod, inst.creditCardEntrieInstallmentDate,  inst.creditCardEntrieInstallmentValue,  cardentrie.cardEntrieCreditDescription, inst.creditCardEntrieInstallmentStatus FROM cardentrie
                INNER JOIN clientcard ON clientcard.clientCardNumber = cardentrie.clientCardNumber
                INNER JOIN creditcardentrieinstallment AS inst ON  inst.creditCardEntrieCod = cardentrie.cardEntrieCod
                WHERE clientcard.clientCardNumber = "${creditCardNumber}" AND inst.creditCardEntrieInstallmentDate LIKE "${date}%" AND inst.creditCardEntrieInstallmentStatus = "open"`
                let resultArray
                try{
                   const result = await executeInTransaction(newCardentrieSQL)
                   if(result.length === 0) throw new Error("Não existe fatura para esse período.")
                   resultArray = result
                }catch(err) {

                    throw err
                }
                
                let sumValue = 0
                for(installment of resultArray){

                    const {creditCardEntrieInstallmentNumber, creditCardEntrieCod, creditCardEntrieInstallmentValue} = installment
                    sumValue += creditCardEntrieInstallmentValue
                    const installmentSQL = `UPDATE creditcardentrieinstallment SET creditcardentrieinstallment.creditCardEntrieInstallmentStatus = "payed" WHERE creditcardentrieinstallment.creditCardEntrieInstallmentNumber = ${creditCardEntrieInstallmentNumber} AND creditcardentrieinstallment.creditCardEntrieCod = ${creditCardEntrieCod}`
                
                    try{
                        await executeInTransaction(installmentSQL)
                    }catch(err) {
                        
                        throw err
                    }
                              
                }

                let newLimit = avaliableLimit + sumValue

                const updateLimitSQL = `UPDATE clientcard SET clientcard.clientCreditCardLimitAvailable = ${newLimit}
                WHERE clientcard.clientCardNumber = "${creditCardNumber}"`
                try{
                    await executeInTransaction(updateLimitSQL)
                }catch(err) {
                     throw err
                }

                

                connection.commit(err =>{
                    if(err) {
                        return connection.rollback(_=>{
                            throw new Error("Falha no Pagamento")
                        })
                    }
                    connection.end()
                })
                resolve('Pagamento Aprovado')
            }catch(err) {
                connection.rollback(_=>{
                    reject(new Error("Pagamento Recusado"))
                })
            }


        })

    })
} 



module.exports = payCardStatement