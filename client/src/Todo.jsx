import React, { useState } from 'react'
import AddTodo from './components/AddTodo'
import TodosList from './components/TodosList'

function Todo() {

    const [editingTodo, setEditingTodo] = useState(null);
    console.log(editingTodo)
    return (
        <div className='flex flex-col items-center w-full'>
            <AddTodo todoToEdit={editingTodo} setEditingTodo={setEditingTodo} />
            <TodosList setEditingTodo={setEditingTodo} />
        </div>

    )
}

export default Todo