const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

console.log(process.env.DB_CONN_STRING) //getting the data from .env file

// Connect to db
async function connectToDB() {

    try {
        await mongoose.connect(process.env.DB_CONN_STRING) //inside the method is the connection string from mongoose
        console.log('Connected Successfully')

        // mongoose.connection.on("connected", () => {
        // console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
        // });
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {connectToDB}