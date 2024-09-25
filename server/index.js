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

app.post('/add', (req, res)=>{
    const todo = req.body.todo
    TodoModel.create({
        todo : todo
    }).then(todos=> res.json(todos))
    .catch(err=>res.json(err))
}) 


app.listen(3001, ()=>{
    console.log('Server is running on port 3001')
})