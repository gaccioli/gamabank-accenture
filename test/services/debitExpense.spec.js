const {newDebitExpenses} = require('../../src/api/services/debitExpense.service')
var chai = require('chai')
const {assert, expect} = require('chai')

describe('Valida os casos de erro de valor dentro da função',()=>{
    
    it('Passando o valor negativo, a função deve cair no reject',async ()=>{

        const param = {
            description: 'teste',
            userCPF: undefined,
            value: -1,
            accNumber: 1,
            bank: 999,
            accAnother: undefined
          }

        await expect(newDebitExpenses(param)).to.be.rejected

    })

    it('Passando um tipo inválido no valor, a função deve cair no reject',async ()=>{

        const param = {
            description: 'teste',
            userCPF: undefined,
            value: "teste",
            accNumber: 1,
            bank: 999,
            accAnother: undefined
          }

        await expect(newDebitExpenses(param)).to.be.rejected

    })

    it('Passando sem valor, a função deve cair no reject',async ()=>{

        const param = {
            description: 'teste',
            userCPF: undefined,
            accNumber: 1,
            bank: 999,
            accAnother: undefined
          }

        await expect(newDebitExpenses(param)).to.be.rejected

    })

})

describe('Valida os casos de erro de conta dentro da função',()=>{
    
    it('Passando uma conta inexistente, a função deve cair no reject',async ()=>{

        const param = {
            description: 'teste',
            userCPF: undefined,
            value: 1,
            accNumber: 654,
            bank: 999,
            accAnother: undefined
          }

        await expect(newDebitExpenses(param)).to.be.rejected

    })

    it('Passando um tipo inválido na conta, a função deve cair no reject',async ()=>{

        const param = {
            description: 'teste',
            userCPF: undefined,
            value: 1,
            accNumber: "teste",
            bank: 999,
            accAnother: undefined
          }

        await expect(newDebitExpenses(param)).to.be.rejected

    })

    it('Passando sem a conta, a função deve cair no reject',async ()=>{

        const param = {
            description: 'teste',
            userCPF: undefined,
            bank: 999,
            value: 1,
            accAnother: undefined
          }

        await expect(newDebitExpenses(param)).to.be.rejected

    })

})

describe('Valida o retorno dos parametros passados corretamente',()=>{
    
    it('Passando todos os parametros corretamente, deve retornar "Depósito efetuado com sucesso!"',async ()=>{

        const param = {
            description: undefined,
            userCPF: '12345678909',
            value: 1,
            accNumber: 1,
            bank: 999,
            accAnother: undefined
          }
        
        const response = await newDebitExpenses(param)

        expect(response).to.be.equal('Pagamento realizado com sucesso')

    })

})





