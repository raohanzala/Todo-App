const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    todo : String
})

const TodoModel = mongoose.model('todos', TodoSchema)
module.exports = TodoModel