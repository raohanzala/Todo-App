import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector, } from 'react-redux'
import { deleteAllTodo, deleteTodo, fetchTodos } from '../features/todoSlice'
import { FaTrash } from 'react-icons/fa6'
import { TiPencil } from 'react-icons/ti'
import Spinner from './Spinner'

function TodosList({setEditingTodo}) {

  const todos = useSelector((state) => state.todo.todos)
  const isLoading = useSelector((state) => state.todo.isLoading)
  const isError = useSelector((state) => state.todo.isError)
  const errorMessage = useSelector((state) => state.todo.errorMessage)
  const [checkedTodos, setCheckedTodos] = useState({})
  const dispatch = useDispatch()

  const handleDeleteAllTodo =  async ()=>{
    await dispatch(deleteAllTodo())
    dispatch(fetchTodos())
  }

  useEffect(()=>{
    dispatch(fetchTodos())  
  },[])


  const handleCheck = (id) => {
    setCheckedTodos(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }



  if(isLoading) return <Spinner/>

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='text-2xl text-center'>Your Tasks {todos.length}</h2>
      <ul className='overflow-y-auto custom-scrollbar h-48 p-5'>
        {isError ? <p className='text-[red]'>{errorMessage}</p> : todos.length === 0 ? <p className='text-gray-400'>No Tasks Found </p> : todos.map(todo => {
          return <div key={todo._id} className='bg-white shadow-md rounded-md border flex justify-between p-3 gap-20 mb-4'>
            <div className='flex gap-3'>
              
              <input type="checkbox" checked={checkedTodos[todo.id] || false} onChange={() => handleCheck(todo.id)} />
              <li style={{
                textDecoration: checkedTodos[todo.id] ? 'line-through' : 'none',
                color: checkedTodos[todo.id] ? 'lightgray' : 'black'
              }}
              >{todo.todo}</li>
            </div>
            <div className='space-x-4 text-lg'>

            <button onClick={() =>setEditingTodo(todo)} className='text-xl'> <TiPencil />
            </button>
            <button className='text-red-600 font-semibold' onClick={() => dispatch(deleteTodo(todo._id))}><FaTrash />
            </button>
            </div>
          </div>
  })} 
      </ul>
      {todos.length !== 0 ? <button className='bg-red-700 text-white py-2 px-5 ' onClick={handleDeleteAllTodo}>Clear All</button> : ''}
    </div>
  )
}

export default TodosList