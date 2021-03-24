const {dateToUTC} = require('../../helpers/dateToUTC')
const generateInstallment = (installmentNumber, fullValue, postingDate) => {
    const installments = []
    let installmentDate = new Date(postingDate)
    const installmentValue = Number((fullValue / installmentNumber).toFixed(2)) //round maybe
    const fix = fullValue - installmentValue*installmentNumber
    for (let i = 1; i <= installmentNumber; i++) {
        
        installmentDate = new Date(installmentDate).setMonth(new Date(installmentDate).getMonth() + 1)
        const [formatedDate] = dateToUTC(installmentDate/1000).split(" ")
        if(i === 1) 
            installments.push(
                { number: i, value: Number((installmentValue+fix).toFixed(2)), date: formatedDate }
            )
        else
            installments.push(
                { number: i, value: installmentValue, date: formatedDate }
            )
    }
    
    return installments
}



module.exports = generateInstallment