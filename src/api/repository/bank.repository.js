const database = require('../../helpers/database.util.js')

const getBank = async bankNumber => {

    let sqlstatement = `SELECT * FROM bank WHERE bankCode = ${bankNumber}`
    try{
        const result = await database.query(sqlstatement)
        if(result.length === 0) return false

        return result[0]
    } catch(err) {
        //console.log(err)
        return false
    }
    
}

module.exports = getBank