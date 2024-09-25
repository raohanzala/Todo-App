import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllTdodo, editTodo, fetchTodos, removeTodo } from '../features/todoSlice'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa6'
import { TiPencil } from 'react-icons/ti'

function TodosList({onHandleEdit}) {
  const [todos, setTodos] = useState([])  
  const [checkedTodos, setCheckedTodos] = useState({})
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(fetchTodos())
  },[])

  console.log(todos)





  const handleCheck = (id) => {
    setCheckedTodos(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }


  return (
    <div>
      <h2 className='text-2xl text-center mb-7'>Your Tasks {todos.length === 0 ? '' : todos.length}</h2>
      <ul>
        {todos.length === 0 ? <p className='text-gray-400'>No Tasks Found </p> : todos.map(todo => (
          <div key={todo.id} className='flex justify-between gap-20 border-b-2 pb-2 mb-4'>
            <div className='flex gap-3'>
              <input type="checkbox" checked={checkedTodos[todo.id] || false} onChange={() => handleCheck(todo.id)} />
              <li style={{
                textDecoration: checkedTodos[todo.id] ? 'line-through' : 'none',
                color: checkedTodos[todo.id] ? 'lightgray' : 'black'
              }}
              >{todo.text}</li>
            </div>
            <div className='space-x-4 text-lg'>

            <button onClick={() => onHandleEdit(todo)} className='text-xl'> <TiPencil />
            </button>
            <button className='text-red-600 font-semibold' onClick={() => dispatch(removeTodo(todo.id))}><FaTrash />
            </button>
            </div>
          </div>
        ))}
      </ul>
      {todos.length !== 0 ? <button className='bg-red-700 text-white py-2 px-5 mt-14 ' onClick={() => dispatch(clearAllTdodo())}>Clear All</button> : ''}
    </div>
  )
}

export default TodosList