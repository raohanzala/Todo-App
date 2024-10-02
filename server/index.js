import express from 'express';
import cors from 'cors';
import {TodoModel} from './models/todos.js';

import connectDB from './config/mongodb.js'

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.get('/get', (req, res)=> {
   TodoModel.find().then(todos=> res.json(todos))
    .catch(error=> res.json(error))
})

app.post('/add', (req, res) => {
    const todoText = req.body.text;
    TodoModel.create({ todo: todoText })
        .then(createdTodo => {
            return res.json(createdTodo); 
        })
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res)=> {
    console.log( 'response from server', req.params.id)
    const todoId = req.params.id
    TodoModel.findByIdAndDelete(todoId)
    .then(deletedTodo=> {
        if(deletedTodo){
            // console.log('deleted Todo FOund', deletedTodo)
            return res.json({deletedTodo : deletedTodo, message : 'Todo successfully Deleted'})
        }else {
            return res.json('Todo not Found')
        }
    }).catch(err=> res.json(err))
})

app.delete('/delete-all', (req, res)=>{
    console.log(TodoModel)
    TodoModel.deleteMany({}).then(result=> res.json(`${result.deletedCount} todos deleted.`))
    .catch(err=> res.json(err))
})

app.put('/update/:id', (req, res)=> {
    const todoId = req.params.id
    const updatedText = req.body.text
console.log('update todo')
    TodoModel.findByIdAndUpdate(todoId, {todo: updatedText}, {new : true})
    .then(updatedTodo=> {
        if(updatedTodo){
            res.json(updatedTodo)
        }else{
            res.json('Todos not found.')
        }
    }).catch(err=> res.json(err))
})

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Server is running on port', port)
})