// imports
const express = require('express')
const { connectToDB } = require('./Database/dbConnection')
const methodOverride = require('method-override')
const morgan = require('morgan')

const Book = require('./models/Book')

const app = express()


// middlewares
app.use(express.static('public')) // using public folder
app.use(express.urlencoded({ extended: false })) // to access the data in express
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// calling db connection
connectToDB()

// R
app.get('/home',
    (req, res) => {
        res.render('home.ejs')    
    }
)


// GET: /all-books - (ALL BOOKS)
app.get('/all-books', 
    async (req, res) => {
        try{
            const allBooks = await Book.find()
            res.render('allBooks.ejs', {allBooks})
        }
        catch(err){
            console.log(err)
        }
    }
)

// GET : (/)



// C

// U

// D

app.listen(3000, () => {
    console.log('Listening on port 3000')
})