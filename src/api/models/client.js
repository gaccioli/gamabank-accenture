class Client {
    constructor({clientEmail, clientPassword,  clientSalt, clientName, clientCPF, 
        clientStatus, clientCreatedDate, clientCod}){
        if(!clientStatus){
            clientStatus = "Active"
        }
        this.clientCod = clientCod,
        this.clientEmail = clientEmail,
        this.clientPassword = clientPassword,
        this.clientSalt = clientSalt,
        this.clientName = clientName,
        this.clientCPF = clientCPF,
        this.clientStatus = clientStatus,
        this.clientCreatedDate = clientCreatedDate
    }
}

module.exports = Client


