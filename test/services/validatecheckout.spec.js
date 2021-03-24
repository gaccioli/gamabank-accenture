const {validateCheckout} = require('../../src/api/services/validateCheckout.service')
var chai = require('chai')
const {assert, expect} = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised);

describe('Valida se os valores estão sendo corretamente validados: ',()=>{
    
    it('Passando o valor incorreto, a função deve cair no reject',async ()=>{

        const param = {
            description: "undefined",
            userCPF: '12345678909',
            value: -10,
            accNumber: 7,
            bank: 999,
            accAnother: 2
        }

        await expect(validateCheckout(param)).to.be.rejected


    })

    it('Passando um banco inexistente, a função deve cair no reject',async ()=>{

        const param = {
            description: "undefined",
            userCPF: '12345678909',
            value: 10,
            accNumber: 7,
            bank: 6,
            accAnother: 2
        }

        await expect(validateCheckout(param)).to.be.rejected


    })

    it('Passando uma conta inexistente, a função deve cair no reject',async ()=>{

        const param = {
            description: "undefined",
            userCPF: '12345678909',
            value: 10,
            accNumber: 1255442112,
            bank: 999,
            accAnother: 2
        }

        await expect(validateCheckout(param)).to.be.rejected


    })

    it('Passando uma conta com todos os dados validados, a funçao deve ser resolvida',async ()=>{

        const param = {
            description: "undefined",
            userCPF: '12345678909',
            value: 10,
            accNumber: 7,
            bank: 999,
            accAnother: 2
        }

        const {checkingAccountNumber} = await validateCheckout(param)

        expect(checkingAccountNumber).to.be.equal(param.accNumber)


    })

})

