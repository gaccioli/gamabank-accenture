const database = require('../../helpers/database.util.js')


const getClient = async (client) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sqlstatement = `SELECT * FROM client WHERE clientEmail = "${client.clientEmail}" `
            
            const result = await database.query(sqlstatement)

            if(!result[0]) throw new Error("Usuario não existe")
            resolve(result[0])
        }catch(err) {
            reject(err)
        }
    })
}


const getClientByCod = async (cod) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sqlstatement = `SELECT * FROM client WHERE clientCod = "${cod}" `
            
            const result = await database.query(sqlstatement)
            resolve(result[0])

        }catch(err) {
            console.error(err)
            reject(err)
        }
    })
}

const getClientByAccount = async (acc) => {
    return new Promise(async(resolve, reject) => {
        try{
            const sqlstatement = `SELECT cl.clientCod, cl.clientName, cl.clientCPF, acc.checkingAccountNumber, acc.checkingAccountBalance FROM client AS cl
            INNER JOIN checkingaccount AS acc ON acc.clientCod = cl.clientCod
            WHERE acc.checkingAccountNumber = "${acc}"`

            const result = await database.query(sqlstatement)
            resolve(result[0])
        } catch(err){
            console.error(err)
            reject(err)
        }
    })
}

const newClient = async (client) => {

    return new Promise(async(resolve, reject) => {
        try {
            const clientExists = await database.registerExists('client', 'clientCPF', client.clientCPF)
            if(clientExists){
                throw new Error("Cliente já cadastrado")
            }
            const clientSql = `INSERT INTO client (clientEmail, clientPassword, clientSalt, clientName, 
                            clientCPF, clientStatus) VALUES ("${client.clientEmail}", "${client.clientPassword}", "${client.clientSalt}", 
                            "${client.clientName}", "${client.clientCPF}", "Active")`
            
                            
            const { insertId } = await database.query(clientSql)
            
            
            resolve(insertId)

        }catch(err) {
            reject(err)
        }
    })
} 
   
module.exports = { getClient, newClient, getClientByCod, getClientByAccount }