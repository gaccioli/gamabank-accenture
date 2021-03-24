const statusHandler = require('../api/controllers/app.controller')


const status = {
    method: 'GET',
    path: '/status',
    handler: statusHandler
}

module.exports = status