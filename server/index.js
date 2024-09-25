const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const TodoModel = require('./models/todos')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://raohanzala70:uce6dmplSO7YbyjN@cluster0.eiwje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

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