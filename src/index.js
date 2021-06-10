const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const userRouter = require('./routes/user.route')
const quizRouter = require('./routes/quiz.route')
const app = express()
const port = Number(process.env.PORT || 3331)
const bodyParser = require('body-parser')
dotenv.config()
app.use(cors())
app.options('*',cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
//cara akses rest api, http://url/endpointnya
app.use('/api/v1/users',userRouter)
app.use('/api/v1/quizzes',quizRouter)


app.listen(port, () => {
    console.log(`App launch at ${port}`)
})

module.exports = app