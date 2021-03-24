const {ValidaCPF, passwordValidator, emailValidator, isPositiveNumber} = require("../../src/helpers/validate")
const assert = require('chai').assert

describe('Valida se a senha contem 8 digitos, tendo ao menos: \n1 letra maiuscula, 1 letra minuscula, 1 numero e 1 caracter especial',()=>{

    it(' "T3st@ndo" Deve retornar TRUE',()=>{
        const expectedResult = true
        assert.equal(passwordValidator('T3st@ndo'),expectedResult)
    })

    it(' "123456789" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(passwordValidator('123456'),expectedResult)
    })

    it(' "abcdefgh" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(passwordValidator('abcdefgh'),expectedResult)
    })

    it(' "78A1dcna" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(passwordValidator('78A1dcna'),expectedResult)
    })

    it(' !@ertiog Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(passwordValidator('!@ertiog'),expectedResult)
    })
})

describe('Valida se o dado inserido for um numero positivo: ',()=>{
    
    it(' 1 Deve retornar TRUE',()=>{
        const expectedResult = true
        assert.equal(isPositiveNumber(1),expectedResult)
    })

    it(' 1000 Deve retornar TRUE',()=>{
        const expectedResult = true
        assert.equal(isPositiveNumber(1000),expectedResult)
    })

    it(' "100" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(isPositiveNumber('100'),expectedResult)
    })
    
    it(' -1 Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(isPositiveNumber(-1),expectedResult)
    })

    it(' "A" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(isPositiveNumber('A'),expectedResult)
    })
    
})

describe('Valida se o formato da string é e-mail: ',()=>{
    
    it(' "example@gmail.com" Deve retornar TRUE',()=>{
        const expectedResult = true
        assert.equal(emailValidator('example@gmail.com'),expectedResult)
    })

    it(' "example.com" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(emailValidator('example.com'),expectedResult)
    })
    
    it(' "example@gmail" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(emailValidator('example@gmai'),expectedResult)
    })

    it(' "emailValido1512" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(emailValidator('emailValido1512'),expectedResult)
    })
    
})

describe('Valida CPF (string): ',()=>{
    
    it(' "12345678909" Deve retornar TRUE',()=>{
        const expectedResult = true
        assert.equal(new ValidaCPF('12345678909').valida(),expectedResult)
    })

    it(' "123.456.789-09" Deve retornar TRUE',()=>{
        const expectedResult = true
        assert.equal(new ValidaCPF('123.456.789-09').valida(),expectedResult)
    })

    it(' "317.741.843-89" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(new ValidaCPF('1234567900').valida(),expectedResult)
    })
    
    it(' "11111111111" Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(new ValidaCPF('11111111111').valida(),expectedResult)
    })

    it(' 12345678911 Deve retornar FALSE',()=>{
        const expectedResult = false
        assert.equal(new ValidaCPF(12345678911).valida(),expectedResult)
    })
    
})


