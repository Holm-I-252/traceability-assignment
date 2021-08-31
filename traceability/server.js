const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

let port = process.env.PORT || 2525

app.listen(port, () => {
    console.log(`running on ${port}`)
})