const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: '0985576c109f4269b97baa859b40627e',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.use(express.json())

let names = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.log("HTML loaded")
})

// app.get('/api/test', (req, res), () => {
//     try {
//         theFunction()
//     } catch (error) {
//         rollbar.error(error)
//     }

// })

app.post('/api/name', (req, res) => {
    if (typeof req.body.name === 'string'){
        names.push(req.body.name)
        rollbar.log(`recived ${req.body.name}`)
        res.status(200).send(names)
    } else {
        rollbar.error('name is not a string')
        console.log('name is not a string')
    }
})

let port = process.env.PORT || 2525

app.listen(port, () => {
    console.log(`running on ${port}`)
})