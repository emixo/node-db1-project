const express = require("express");

const accountRouter = require('./accountRouter')

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter)

server.get('/', (req, res) => {
    res.status(200).json({api:'up and running'})
})

module.exports = server;
