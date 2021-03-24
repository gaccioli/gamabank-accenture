const {getClient} = require('../repository/client.repository')
const {getAccountById} = require('../repository/checkingAccount.repository')
const auth = require('./auth.service')

const getUserTokenData = async (token) => {
    try{
        const {data} = await auth.verify(token)
        const {clientCod, clientCPF} = await getClient({clientEmail: data.username})
        const {checkingAccountNumber} = await getAccountById(clientCod)
        return {clientCod, clientCPF, checkingAccountNumber}
    } catch (err) {
        throw new Error("Token inválido")
    }
   
}

module.exports = {getUserTokenData}