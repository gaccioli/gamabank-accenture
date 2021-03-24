const Client = require('../../models/client')
const authService = require('../../services/auth.service')



const loginHandler = async (request, h) => {
    try {
        const client = new Client(request.payload)
        await authService.verifyPassword(client)
        const login = await authService.sign({username: client.clientEmail})
        return {login:'Concluido', ...login}

    }catch(err) {
        return {login:'Invalido',error:err.message}
    }
   
}

module.exports = loginHandler