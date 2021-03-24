const {validateCheckout} = require('./validateCheckout.service')
const { getCurrentAccount, updateBalance} = require('../repository/checkingAccount.repository')
const {insertDebitExpenses} = require('../repository/debit.repository')

    
const newDebitExpenses = async transferData => {
    const account = await validateCheckout(transferData)
    if(transferData.value > account.checkingAccountBalance) throw new Error('Saldo insuficiente para realizar a transação')
    await insertDebitExpenses(transferData)
    const newBalance = account.checkingAccountBalance - transferData.value
    await updateBalance(transferData.accNumber, newBalance)
       
    return 'Pagamento realizado com sucesso'
        
        
}





module.exports = {newDebitExpenses}