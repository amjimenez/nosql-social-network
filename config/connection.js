require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
    .catch((err) => {
        console.log(err)
    })

module.exports = mongoose