class CheckingTransaction {
    constructor({userCPF, value, account, bank, accAnother, description}){
        this.description = description
        this.userCPF= userCPF, 
        this.value = value, 
        this.accNumber = account,
        this.bank = bank,
        this.accAnother = accAnother
    }
}

module.exports = CheckingTransaction

// bernando transferindo para paulo
// out userCPF do paulo, accNumber do Bernardo e accAnother do Paulo
// in userCPF do Bernanrdo, acc/Number do Paulo e accAnother do Bernardo
