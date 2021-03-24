const creditCardStatement = require('../../../services/creditCardStatement.service')
const { getUserTokenData } = require('../../../services/userTokenData.service')

const creditCardStatementHandler = async (request, h) => {
    const token = request.headers['x-access-token']
    if(token){
        try{
            const date = request.params.date
            const { clientCod } = await getUserTokenData(token)
    
            const cardStatement = await creditCardStatement(date, clientCod)
            return cardStatement
        }catch(err){
            return err.message
        }

    }

}
module.exports = creditCardStatementHandler