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

/*===============================================================================*/
// GET: Landing Page (Home) 
app.get('/', 
    (req, res) => {
        res.render('index.ejs')    
    }
)

// GET: All Books -> /all-books
app.get('/all-books', 
    async (req, res) => {
        try{
            const allBooks = await Book.find()
            res.render('books/allBooks.ejs', {allBooks})
        }
        catch(err){
            console.log(err)
        }
    }
)

/*===============================================================================*/
// CREATE
// GET: 
app.get('/all-books/new-book',
    async (req, res) => {
       res.render('books/create.ejs')
    }
)
// POST
app.post('/all-books',
    async (req, res) => {
        try{
            req.body.isInStore = Boolean(req.body.isInStore)

            await Book.create(req.body)
            res.redirect('/all-books')
        }
        catch(err){
            console.log(err)
        }
    }
)

/*===============================================================================*/
// READ
// GET : Book By Id -> /all-books/:bookid
app.get('/all-books/:bookid',
    async (req, res) => {
        try {
            const foundBook = await Book.findById(req.params.bookid)
            res.render('books/details.ejs', {Book : foundBook})
        }
        catch(err){
            console.log(err)
        }
    }
)

/*===============================================================================*/
// UPDATE
// GET:
app.get('/all-books/:bookid/edit',
    async (req, res) => {
        try{
            const foundBook = await Book.findById(req.params.bookid)
            res.render('books/update.ejs', {Book : foundBook})
        }
        catch(err){
            console.log(err)
        }
    }
)

// PUT:
app.put('/all-books/:bookid',
    async (req, res) => {
        try{
            req.body.isInStore = Boolean(req.body.isInStore)

            const updatedBook = await Book.findByIdAndUpdate(req.params.bookid, req.body) // (obj id, updates)
            res.redirect('/all-books')
        }
        catch(err){
            console.log(err)
        }
    }
)

/*===============================================================================*/
// DELETE:
app.delete('/all-books/:bookid', 
    async (req, res) => {
        try{
            await Book.findByIdAndDelete(req.params.bookid)
            res.redirect('/all-books')
        }
        catch(err){
            console.log(err)
        }
    }
)


app.listen(3000, () => {
    console.log('Listening on port 3000')
})