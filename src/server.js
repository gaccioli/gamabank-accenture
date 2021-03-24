const Hapi = require('@hapi/hapi')
require('./configs/env')
const swagger = require('./configs/swagger')
const routes = require('./routes/index')

const server = async () =>  {

    const hapiServer = Hapi.server({
        port: process.env.PORT || 3001,
        host: process.env.HOST || 'localhost',
    })

   
    
    await hapiServer.register(swagger);
    hapiServer.route(routes)
  
   
    return hapiServer
}

process.on('unhandledRejection', err => {
    console.error(err)
    process.exit(10)
})


module.exports = server()