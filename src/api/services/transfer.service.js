const transferRepository = require('../repository/transfer.repository')
const { getCurrentAccount, updateBalance} = require('../repository/checkingAccount.repository')
const {isPositiveNumber} = require('../../helpers/validate')
const getBank = require('../repository/bank.repository')
const {getClientByCod, getClientByAccount} = require('../repository/client.repository')
const {validateCheckout} = require('./validateCheckout.service')
const validate = require('../../helpers/validate')




const newTransferReceived = async (transferData) =>{
    const account = await validateCheckout(transferData)

    if (!(await getClientByCod(account.clientCod).clientCPF === transferData.CPF)) throw new Error("CPF não equivalente ao do usuário")
    await transferRepository.newTransferEntrie(transferData)
    const newBalance = account.checkingAccountBalance + transferData.value

    await updateBalance(transferData.accNumber, newBalance)
    
    return 'Transferência realizada com sucesso'
    
    
}


const newTransferCheckout = async transferData => {
    const account = await validateCheckout(transferData)
    if(transferData.value > account.checkingAccountBalance) throw new Error('Saldo insuficiente para realizar a transação')
    await transferRepository.newTransferCheckout(transferData)
    const newBalance = account.checkingAccountBalance - transferData.value
    await updateBalance(transferData.accNumber, newBalance)
   
    return 'Transferência realizada com sucesso'
    
    
}

const newTransfer = async (transferOut, transferIn) => {
    if (!new validate.ValidaCPF(transferIn.userCPF).valida()) throw new Error("CPF inválido")
    const clientAccount = await getClientByAccount(transferIn.accNumber) 
    if(transferOut.accNumber === transferIn.accNumber) throw new Error("Não é possível realizar transferência para a própria conta")
    if (clientAccount.clientCPF !== transferIn.userCPF) throw new Error('CPF não corresponde com a conta')
    await newTransferCheckout(transferOut)
    await newTransferReceived(transferIn)

    return `Transferência de R$ ${transferOut.value.toFixed(2)} realizada para ${clientAccount.clientName}.`
}



module.exports = {newTransferReceived, newTransferCheckout, newTransfer}

