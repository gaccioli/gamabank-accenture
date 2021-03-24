//Formato do userInfo : nome, número do cartão, ultima entrada do crédito, essas coisas.
const { signupHtml, paidInstallmentHtml, paidDebitHtml, creditCardEntryHtml  } = require("../views/emailView")

class EmailModel {
    constructor( subject, text, html){
        this.subject = subject,
        this.text = text,
        this.html = html
    }
}

//Todos os tipos de email que enviamos estão listados abaixo:
const signUpEmail = userInfo => {
    return(new EmailModel("Bem vindo ao HelloBank", `Olá ${userInfo.clientName}, \n bem vindo ao melhor banco do mundo.
    \n Sua senha é ${userInfo.password}, o número de seu cartão é ${userInfo.number}`, signupHtml(userInfo)))
} 

const paidInstallmentEmail = userInfo => {
    return(new EmailModel("Confirmação de Pagamento", `Caro(a) ${userInfo.clientName}, \n sua fatura do cartão de número ${userInfo.clientCardNumber} mais recente acabou de ser paga. `, paidInstallmentHtml(userInfo)))
}

const creditCardEntryEmail = userInfo => {
    console.log("creditCardEntry userInfo:\t", userInfo)
    return(new EmailModel("Novo lançamento de crédito", `Caro(a) ${userInfo.clientData.clientName}, \n foi cadastrada uma nova compra de ${userInfo.value} em seu cartão de número ${userInfo.cardNumber}. `, creditCardEntryHtml(userInfo)))
}

const paidDebitEmail = userInfo => {
    let actualTime = new Date()
    let dataFormatada = ((actualTime.getDate() )) + "/" + ((actualTime.getMonth() + 1)) + "/" + actualTime.getFullYear() + ` \n ${actualTime.toLocaleTimeString('en-US', { hour12: false })} `
    userInfo.dataFormatada = dataFormatada
    return(new EmailModel("Novo lançamento de débito!", `Foi cadastrada uma nova compra de débito em sua conta. \n Valor: R$ ${userInfo.value.toFixed(2)} \n Descrição: ${userInfo.description} \n Horário: ${dataFormatada} `, paidDebitHtml(userInfo)))
    
}

module.exports = {EmailModel, signUpEmail, paidInstallmentEmail, creditCardEntryEmail, paidDebitEmail }