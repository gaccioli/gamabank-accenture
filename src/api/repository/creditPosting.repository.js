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




const payCreditStatement = async (creditCardTransaction,newLimit) => {
    return new Promise(async(resolve, reject) => {
        await openConnection()
        connection.beginTransaction(async err =>{
            if(err) throw new Error("sintaxe inválida")
            try{
                const {clientCard, clientCod, cardEntrieValue, installmentNumber, description} = creditCardTransaction
                
                const newCardentrieSQL = `INSERT INTO cardentrie (clientCardNumber, clientCod, cardEntrieType, cardEntrieValue, cardEntrieCreditInstallment, cardEntrieCreditDescription) VALUES("${clientCard}", ${clientCod}, "credit", ${cardEntrieValue}, ${installmentNumber}, "${description}")`
                let insertId
                try{
                   const result = await executeInTransaction(newCardentrieSQL)
                   insertId = result.insertId
                }catch(err) {
                    throw err
                }
    
                const {installments} = creditCardTransaction 
                for(installment of installments){
                    const installmentSQL = `INSERT INTO creditcardentrieinstallment (creditCardEntrieCod,creditCardEntrieInstallmentNumber, creditCardEntrieInstallmentValue,creditCardEntrieInstallmentDate, creditCardEntrieInstallmentStatus) VALUES(${insertId},${installment.number}, ${installment.value}, "${installment.date}", "open")`
                
                    try{
                        await executeInTransaction(installmentSQL)
                    }catch(err) {
                        throw err
                    }
                              
                }

                const updateLimitSQL = `UPDATE clientcard SET clientcard.clientCreditCardLimitAvailable = ${newLimit}
                WHERE clientcard.clientCardNumber = "${clientCard}"`
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



module.exports = payCreditStatement