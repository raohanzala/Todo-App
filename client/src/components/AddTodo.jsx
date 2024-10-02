import React, { useEffect, useState } from 'react'
import { sendTodoData, updateTodo } from '../features/todoSlice'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { signUpSchema } from '../schemas'


function AddTodo({ todoToEdit, setEditingTodo }) {

    const dispatch = useDispatch()

    const initialValues = {
        todoName: ''
    }


    const { values, setValues, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            if (values) {
                if (todoToEdit) {
                    // console.log('Add Todo todoToEdit')
                    // console.log({ id: todoToEdit._id, text: values.todoName })
                    dispatch(updateTodo({ id: todoToEdit._id, text: values.todoName }));
                    setEditingTodo(null)
                } else {
                    console.log(values.todoName)
                    dispatch(sendTodoData({ text: values.todoName }))
                }
            }
            action.resetForm()
            console.log(values, action)
        }

    })

    useEffect(() => {
        if (todoToEdit) {
            console.log(todoToEdit)
            setValues({todoName : todoToEdit.todo});
        } else {
            console.log('No todo to edit ')
        }
    }, [todoToEdit]);

    return (
        <div className=' bg-white  pt-10'>
        <div className='text-4xl mb-10 font-semibold text-center'>TODO APP</div>   
        <form onSubmit={handleSubmit} className='mb-8'>
            <div className='flex gap-5 mb-1'>

                <input type='text' name='todoName' placeholder='Add your task here...' className=' py-2 border-b-2 border-black bg-transparent outline-none w-96 px-5'
                 
                    onChange={handleChange}
                    value={values.todoName} onBlur={handleBlur} />
                <button className='bg-black text-white p-3 px-4 rounded-md' type='submit'>{todoToEdit ? 'Edit' : 'Add Todo'}</button>
            </div>
            {errors.todoName && touched.todoName ? <p className='text-[red] px-2'>{errors.todoName}</p> : null}
        </form>
        </div>
    )
}

export default AddTodo