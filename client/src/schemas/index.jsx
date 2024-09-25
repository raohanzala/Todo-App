import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    todoName : Yup.string().min(10).max(30).required('Please enter your task')
})