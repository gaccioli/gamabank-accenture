const database = require('../../helpers/database.util.js')

const insertDebitExpenses = async (transferData) => {
    const sqlStatement = `INSERT INTO 
    checkingaccountcheckout (checkingAccountNumber, checkingAccountCheckoutType, checkingAccountCheckoutValue, bankCode,checkingAccountCheckoutDescription) VALUES (${transferData.accNumber}, 3, ${transferData.value}, ${transferData.bank},"${transferData.description}")`
    try{
        const result = await database.query(sqlStatement)
        return result;
    }catch(err){
        console.log(err)
    }
}

module.exports = {insertDebitExpenses}