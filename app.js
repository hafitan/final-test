const express = require('express')
const app = express()
const port = 3005
const bodyParser = require('body-parser')
const cookie = require('cookie-parser')
require('dotenv').config()
app.set("view engine", "ejs")
app.use(express.json())
app.use(cookie())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const user = require('./src/routes/user')
const siswa = require('./src/routes/siswa')

app.use('/', user)
app.use('/siswas', siswa)

app.listen(port, () => {
    console.log(`port ${port}`)
})