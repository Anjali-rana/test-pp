const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    isMarked: {
        type: Boolean,
        required: true,
        default: false
    }
})

const task = mongoose.model('Task', taskSchema)

module.exports = task;