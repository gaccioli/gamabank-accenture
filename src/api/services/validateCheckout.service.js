const {isPositiveNumber} = require('../../helpers/validate')
const { getCurrentAccount} = require('../repository/checkingAccount.repository')
const getBank = require('../repository/bank.repository')


const validateCheckout = async transferData => {
    if(!isPositiveNumber(transferData.value)) throw new Error('Valor incorreto.')
    const verifybank = await getBank(transferData.bank)
    if(!verifybank) throw new Error('Banco não é valido') 
    const account = await getCurrentAccount(transferData.accNumber)
    if(!account) throw new Error ('Conta não existe')
    return account
}

module.exports = {validateCheckout}