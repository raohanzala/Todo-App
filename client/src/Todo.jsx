import React, { useState } from 'react'
import AddTodo from './components/AddTodo'
import TodosList from './components/TodosList'

function Todo() {

    const [editingTodo, setEditingTodo] = useState(null);

    const handleEdit = (todo) => {
        setEditingTodo(todo);
    }

    // console.log(editingTodo)
    return (
        <div className='flex flex-col items-center w-full mt-10'>

                <div className='text-4xl mb-10 font-semibold '>TODO APP</div>
                <AddTodo todoToEdit={editingTodo} setEditingTodo={setEditingTodo} />
            <TodosList onHandleEdit={handleEdit} />
        </div>

    )
}

export default Todo