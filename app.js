const express = require('express')
const fs = require('fs')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoute')
const userRouter = require('./routes/userRoute')

const app = express()
const PORT = 3000

app.use(morgan('dev'))
app.use(express.json())
app.use((req, res, next) => {
    req.resquestTime = new Date().toISOString()
    next()
})


app.use('/api/v1/tours', tourRouter)
app.use('api/v1/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})