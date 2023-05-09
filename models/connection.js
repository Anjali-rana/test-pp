const mongoose = require('mongoose');
const config = require('../config');

const connectDb = async () => {
    try {
        console.log("innnn")
        await mongoose.connect(config.mongoUrl)
        console.log("innnn2")
        console.log("mongodb connected")
    } catch (err) {
        console.log("connection failed ", err.message)
    }
}

module.exports = connectDb;