// imports
const express = require('express')
const { connectToDB } = require('./Database/dbConnection')
const methodOverride = require('method-override')
const morgan = require('morgan')

const app = express()


// middlewares
app.use(express.static('public')) // using public folder
app.use(express.urlencoded({ extended: false })) // to access the data in express
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// calling db connection
connectToDB()



app.listen(3000, () => {
    console.log('Listening on port 3000')
})