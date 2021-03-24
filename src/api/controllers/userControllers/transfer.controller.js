const CheckingTransaction = require('../../models/checkingTransaction')
const { newTransferCheckout, newTransferReceived, newTransfer } = require('../../services/transfer.service')
const validate = require('../../../helpers/validate')
const { getUserTokenData } = require('../../services/userTokenData.service')
const {getClientByAccount} = require('../../repository/client.repository')


const transferHandler = async (request, h) => {

   const token = request.headers['x-access-token']
   if (token) {
      try {

         const { clientCPF, checkingAccountNumber } = await getUserTokenData(token) // dados out cpf e conta
         const { CPF, destinyAccount:accAnother, value, description } = request.payload
         const transferOut = new CheckingTransaction({ userCPF: clientCPF, value: value, account: checkingAccountNumber, bank: 999, accAnother: accAnother, description: description })
         const transferIn = new CheckingTransaction({ userCPF: CPF, value: value, account: accAnother, bank: 999, accAnother: checkingAccountNumber, description:description })
         return await newTransfer(transferOut, transferIn)

      } catch (err) {
         return err.message
       
      }
   }
   try {
      const { CPF } = request.payload
      if (new validate.ValidaCPF(CPF).valida()) {
         const { CPF, originAccount:accAnother, value, destinyAccount:account, bank, description } = request.payload
         const transferData = new CheckingTransaction({userCPF: CPF, value: value, account: account, bank: bank, accAnother: accAnother, description: description})
         //{userCPF, value, account, bank, accAnother, description}
         
         return await newTransferReceived(transferData)
      }
   } catch (err) {
      return err.message
   }
}

module.exports = transferHandler