import React, { useEffect, useState } from 'react'
import { addTodo, editTodo } from '../features/todoSlice'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { signUpSchema } from '../schemas'


function AddTodo({todoToEdit, setEditingTodo}) {

    // const [input, setInput] = useState('')
    const dispatch = useDispatch()
    
    // const editedTodos = useSelector(state => state.todo.editedTodos)
    const initialValues  = {
        todoName : ''
    }
    

    const {values, touched, errors, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues,
        validationSchema : signUpSchema,
        onSubmit : (values,action)=>{
                if (values) {
                    if (todoToEdit) {
                        dispatch(editTodo({ id: todoToEdit.id, text : values.todoName }));
                        setEditingTodo(null)
                    } else {
                        dispatch(addTodo({text : values.todoName}));
                    }
                }
                console.log(values, action)
                action.resetForm()
            
            // if (values) {
            //     if (todoToEdit) {
            //         dispatch(editTodo({ id: todoToEdit.id, text : values.todoName }));
            //         setEditingTodo(null)
            //     } else {
            //         dispatch(addTodo({text : values.todoName}));
            //     }
            // }
            // action.resetForm()
        }

    })


    // useEffect(() => {
    //     if (todoToEdit) {
    //         setInput(todoToEdit.text);
    //     } else {
    //         setInput(''); 
    //     }
    // }, [todoToEdit]);


    // function addTodoHandler (e){
    //     e.preventDefault()
    //     // if(!input) return null
    //     // dispatch(addTodo(input))
    //     // setInput('')



    //     // if (input) {
    //     //     if (todoToEdit) {
    //     //         dispatch(editTodo({ id: todoToEdit.id, text : input }));
    //     //         setEditingTodo(null)
    //     //     } else {
    //     //         dispatch(addTodo({text : input}));
    //     //     }
    //     //     setInput(''); 
    //     // }
    //     if (values) {
    //         if (todoToEdit) {
    //             dispatch(editTodo({ id: todoToEdit.id, text : values }));
    //             setEditingTodo(null)
    //         } else {
    //             dispatch(addTodo({text : values}));
    //         }
    //         // setInput(''); 
    //     }
    // }

  return (
    <form onSubmit={handleSubmit} className='mb-8'>
        <div className='flex gap-5 mb-1'>

    <input type='text' name='todoName' placeholder='Add your task here...' className=' py-2 border-b-2 border-black outline-none w-96 px-5' 
    // onChange={(e)=> setInput(e.target.value)}
    onChange={handleChange}
    value={values.todoName} onBlur={handleBlur}/>
        <button className='bg-black text-white p-3 px-4 rounded-md' type='submit'>{todoToEdit ? 'Edit' : 'Add Todo'}</button>
    </div>
     { errors.todoName && touched.todoName ? <p className='text-[red] px-2'>{errors.todoName}</p> : null}
    </form>
  )
}

export default AddTodo