const CreditCard = require('node-creditcard');
const randomGenerate = require('../../helpers/randomGenerate')
const mycripto = require('../../helpers/mycripto');
const ClientCard = require('../models/clientCard');

//(tres digitos)
const generateCVV = () => {
    let arr = []
    let newFourDigits;
    for(let i = 0; i<1; i++){
        arr.push(("" + Math.random()).substring(2, 5))
    }
    return arr.join('')
}


const generatePassword = () => {
    let arr = []
    let newFourDigits;
    for(let i = 0; i<1; i++){
        arr.push(("" + Math.random()).substring(2, 8))
    }
    return arr.join('')
}


const generateExpirationDate = () => {
    const days = randomGenerate(730, 1825)
    let date = new Date()
    date.setDate(date.getDate() + days);
    
    const verifyMonth = (date) => {
        let month = date.getUTCMonth() + 1
        if(month.toString().length === 2) return month
        return `0${month}`
    }

    const month = verifyMonth(date)
    const year = date.getUTCFullYear().toString().slice(2)

    const newDate =  month + "/" + year;
    return newDate
}

const generateHolder = (longName) => {

    const names = longName.split(' ')
    const [firstName, lastName] = [names.shift(), names.pop()]

    let abreviatedMiddleNames = names.map(middleName =>{
        if (middleName.charCodeAt(0) >= 65 && middleName.charCodeAt(0) <= 90){
            abreviated = middleName.charAt(0)
            return abreviated
        }else {
            return ''
        }
    })

    let clearSpaces = abreviatedMiddleNames.filter(item => item !='')

    const listResult = [firstName, ...clearSpaces, lastName]

    const result = listResult.join(' ').toUpperCase()

    return result
  }



const createCreditCard = async (clientName) =>{
    const cvv = await generateCVV()
    const password = await generatePassword()
    const {encryptedPassword, salt} = await mycripto.encryptPassword(password);

    const expiration = await generateExpirationDate()
    const number = await CreditCard.generate('VISA')
    const holder = await generateHolder(clientName)
    const card = new ClientCard(number, holder, expiration, cvv, password, encryptedPassword, salt)
    console.table(card)
    return card
}

module.exports = createCreditCard