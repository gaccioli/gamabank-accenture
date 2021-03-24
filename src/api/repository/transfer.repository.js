const database = require('../../helpers/database.util.js')


const newTransferEntrie = async (transferData) => {
    const sqlStatement = `INSERT INTO checkingaccountentry (checkingAccountNumber, checkingAccountEntryType, checkingAccountEntryValue, bankCode, checkingAccountEntryCPF, checkingAccountEntryAccountOrigin, checkingAccountEntryDescription) VALUES (${transferData.accNumber}, 2, ${transferData.value}, ${transferData.bank}, "${transferData.userCPF}", ${transferData.accAnother}, "${transferData.description}")`
    try{
        const result = await database.query(sqlStatement)
        return result;
    }catch(err){
        console.log(err)
    }
    
}


const newTransferCheckout = async (transferData) => {
    const sqlStatement = `INSERT INTO 
    checkingaccountcheckout (checkingAccountNumber, checkingAccountCheckoutType, checkingAccountCheckoutValue, bankCode, checkingAccountCheckoutCPF, checkingAccountCheckoutAccountDestiny, checkingAccountCheckoutDescription) VALUES (${transferData.accNumber}, 1, ${transferData.value}, ${transferData.bank}, "${transferData.userCPF}", ${transferData.accAnother}, "${transferData.description}")`
    try{
        const result = await database.query(sqlStatement)
        return result;
    }catch(err){
        console.log(err)
    }
}

module.exports = {newTransferEntrie, newTransferCheckout}