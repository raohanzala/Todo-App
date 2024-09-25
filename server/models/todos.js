import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    todo : String
})

export  const TodoModel = mongoose.model('todos', TodoSchema)
