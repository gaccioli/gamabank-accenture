const {newDeposit} = require('../../src/api/services/deposit.service')
var chai = require('chai')
const {assert, expect} = require('chai')

describe('Valida os casos de erro de valor dentro da função',()=>{
    
    it('Passando o valor negativo, a função deve cair no reject',async ()=>{

        const param = {
            description: undefined,
            userCPF: '12345678909',
            value: -10000,
            accNumber: 8,
            bank: undefined,
            accAnother: undefined
          }

        await expect(newDeposit(param)).to.be.rejected

    })

    it('Passando um tipo inválido no valor, a função deve cair no reject',async ()=>{

        const param = {
            description: undefined,
            userCPF: '12345678909',
            value: "teste",
            accNumber: 8,
            bank: undefined,
            accAnother: undefined
          }

        await expect(newDeposit(param)).to.be.rejected

    })

    it('Passando sem valor, a função deve cair no reject',async ()=>{

        const param = {
            description: undefined,
            userCPF: '12345678909',
            accNumber: 8,
            bank: undefined,
            accAnother: undefined
          }

        await expect(newDeposit(param)).to.be.rejected

    })

})

describe('Valida os casos de conta incorreta  dentro da função',()=>{
    
    it('Passando uma conta inexistente, a função deve cair no reject',async ()=>{

        const param = {
            description: undefined,
            userCPF: '12345678909',
            value: 10000,
            accNumber: 215165,
            bank: undefined,
            accAnother: undefined
          }

        await expect(newDeposit(param)).to.be.rejected

    })

    it('Passando um tipo inválido na conta, a função deve cair no reject',async ()=>{

        const param = {
            description: undefined,
            userCPF: '12345678909',
            value: "teste",
            accNumber: 8,
            bank: undefined,
            accAnother: undefined
          }

        await expect(newDeposit(param)).to.be.rejected

    })

    it('Passando o objeto sem a conta, a função deve cair no reject',async ()=>{

        const param = {
            description: undefined,
            userCPF: '12345678909',
            value: 10000,
            bank: undefined,
            accAnother: undefined
          }

        await expect(newDeposit(param)).to.be.rejected

    })

})

describe('Valida o retorno dos parametros passados corretamente',()=>{
    
    it('Passando todos os parametros corretamente, deve retornar "Depósito efetuado com sucesso!"',async ()=>{

        const param = {
            description: undefined,
            userCPF: '12345678909',
            value: 10000,
            accNumber: 2,
            bank: undefined,
            accAnother: undefined
          }
        
        const response = await newDeposit(param)

        expect(response).to.be.equal("Depósito efetuado com sucesso!")

    })
})
