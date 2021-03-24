const server = require('./server')


server.then((server)=>{
    server.start()
    console.log(`server iniciado na port ${process.env.PORT}`)
})