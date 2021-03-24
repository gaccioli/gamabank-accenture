const checkingAccount = require('../repository/checkingAccount.repository')
const depositRepository = require('../repository/deposit.repository')
const {isPositiveNumber} = require('../../helpers/validate')



const newDeposit = async (deposit)=>{

    const clientAccount =  await checkingAccount.getCurrentAccount(deposit.accNumber)
    if(!isPositiveNumber(deposit.value)) throw new Error("Valor incorreto: insira um valor positivo")
    if(!clientAccount) throw new Error("Conta não encontrada")
    const newAccountBalance = clientAccount.checkingAccountBalance + deposit.value
    try {
        await depositRepository.newDepositQuery(deposit)
        await checkingAccount.updateBalance(deposit.accNumber, newAccountBalance)
        return "Depósito efetuado com sucesso!"
    } catch (err) {
        console.log(err)
    }
}


module.exports = { newDeposit }