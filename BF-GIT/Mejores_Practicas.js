/*
Establecer NODE_ENV = produccion:
    cmd -> export NODE_ENV = produccion
    al ejecutar su archivo server.js:
    cmd -> NODE_ENV = nodo de produccion server.js

Habilitar la compresion Gzip:
    npm i compresion
    compresion = require('compresion')
    app.use (compresion())
*/

// Asegurese de que el diario sea correcto
const {stLogger, stHttpLoggerMiddleware} = require('sematext-agent-express')
// En la parte superior de tus rutas, agrega el stHttpLoggerMiddleware
// para enviar registros de API a Sematext
const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    res.status(200).send('Hello')})

app.get('/lol', (req, res, next) => {
    res.status(200).send('Lol')})
    app.use(stHttpLoggerMiddleware)
    app.get('/api', (req, res, next) => {
        stLogger.info('Un registro de informacion')
        stLogger.debug('Un registro de depuracion')
        stLogger.warn('Un registro de advertencia')
        stLogger.error('An error log')
        res.status(200).send('Hello World')})

    
// Usa stLogger para enviar todos los registros escribe directamente en Sematext


app.listen(3005, () => {
    console.log(`Server is runnnig on: http://localhot/3005`)
})
