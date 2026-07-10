const mongoose = require('mongoose')

// Book Schema
const bookSchema = new mongoose.Schema (
    {
        title: { // text
            type: String,
            required: true
        },
        numOfPages: { // text
            type: Number,
            required: true,
        },
        genre: { // select
            type: String,
            enum: ['Mystery', 'Fantasy', 'Science-Fiction', 'YA'],
            required: true,
        },
        author: { // text
            type: String,
            required: true
        },
        type: { // radio btn
            type: String,
            required: true,
            enum: ['Physical Book', 'E-Book', 'Audio Book']
        },
        description: { // text
            type: String
        }, 
        Price: { //
            type: Number,
            min: 1
        },
        isInStore: {
            type: Boolean,
            required: true
        }
    }
)

const Book = mongoose.model('Book', bookSchema)

module.export = Book