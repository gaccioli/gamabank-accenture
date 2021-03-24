const hapiswagger = require("hapi-swagger");
const inert = require("@hapi/inert");
const vision = require("@hapi/vision");
const { version } = require("../../package.json");


const swagger = 
    {
      plugin: hapiswagger,
      options: {
        info: {
          title: "Gamabank - Hello Work 😎",
          description: "Projeto desenvolvido para o curso de Node.js com o propósito de simular endpoints conhecidos de um banco real.",
          version: version
        },
        
      },
    }

module.exports = [inert, vision, swagger ]
