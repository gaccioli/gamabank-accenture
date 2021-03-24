


//Entradas do modelo: Mes, Date, Valor, tipoOperacao, descricao
//tipoOperacao: Transferência, depósito, etc

//Iteracao das entradas:

class StatementRegister{
    constructor(operationType, date, value, checkoutOrEntry, description){
    
        this.date = date,
        this.value = value,
        this.operationType = operationType,
        this.checkoutOrEntry = checkoutOrEntry,
        this.description = description
           
    }
}

module.exports = StatementRegister

