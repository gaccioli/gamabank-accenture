const {dateDDMMYYYY} = require('../../helpers/dateToUTC')


class CreditCardInstallment{
    constructor(date, value, description){
        this.date = dateDDMMYYYY(date),
        this.value = value,
        this.description = description
    }
}

module.exports = CreditCardInstallment