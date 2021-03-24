const mysql = require('mysql')
const databaseConfigs  = require('../configs/env').database


const query = async (sqlstatement) =>{
    const connection = await mysql.createConnection(databaseConfigs)
    return new Promise(async (resolve, reject) =>{
        
        connection.query(sqlstatement,(err, result) =>{
            if(err) reject(err)
            resolve(result)
            connection.end()
            
        })
    })
}

const registerExists = async (tableName, tableColumn, value) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sqlstatement = `SELECT * FROM ${tableName} WHERE ${tableColumn} = "${value}" `
            
            const result = await query(sqlstatement)
            if(result[0]){
                resolve(true)
            }
            resolve(false)
            
        }catch(err) {
            console.error(err)
            reject(err)
        }
    })
}



const executeDB = (sqlStatement) => {
    console.log("Entrei no util")
    console.log("Minhas ordens",sqlStatement,'\n')
    return new Promise(async (resolve, reject) =>{
        transactionConnection.query(sqlStatement,(err, result) =>{
            if(err) reject(err)
            console.log("Meus resultados",result,'\n')
            resolve(result)
            
            
        })
    })
}



module.exports = { query, registerExists, executeDB}



