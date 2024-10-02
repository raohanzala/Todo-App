import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('http://localhost:3000/get')
    return response.data
})

export const sendTodoData = createAsyncThunk(
    'todos/sendTodoData',
    async (todoData, { rejectWithValue }) => {
        try {
            console.log('Sending todo data:', todoData);
            const response = await axios.post('http://localhost:3000/add', todoData);
            console.log('Response from server:', response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:3000/delete/${id}`);
        console.log(response)
        return id;

    } catch (err) {
        return rejectWithValue(err);
    }
});

export const deleteAllTodo = createAsyncThunk('todos/deleteAllTodo', async ()=>{
   const response = await axios.delete(`http://localhost:3000/delete-all`);
   console.log(response)
   return response.data

}) 

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({id, text})=> {
    console.log('Todo for update todo' ,id)
    console.log('Todo for update Text' ,text)
    const response = await axios.put(`http://localhost:3000/update/${id}`, { text})
    return response.data
})

const initialState = {
    todos: [],
    isLoading: false,
    isError: false,
    errorMessage: '',
    todoMessage : ''
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,

    extraReducers: (builder) => {
        //handle get request
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true
            state.isError = false
        })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                console.log('Error', action.payload)
                state.isError = true
                state.isLoading = false
                state.errorMessage = 'Unable to fetch todos'
                toast.error('Unable to fetch todos')
            })

            //handle post request
            .addCase(sendTodoData.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(sendTodoData.fulfilled, (state, action) => {
                console.log(state)
                console.log(action.payload)
                state.isLoading = false
                state.todos.push(action.payload)
                toast.success('Todo added successfully')
            })
            .addCase(sendTodoData.rejected, (state, action) => {
                console.log('Error', action.payload)
                state.isError = true
                state.errorMessage = action.payload
            })

            //handle Delete 
            .addCase(deleteTodo.pending, (state, action) => {
                state.isLoading = true
                console.log('deleteTodo.pending is working....')
                state.isError = false
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                console.log( 'Actions', action.payload)
                state.isLoading = false
                state.todos = state.todos.filter(todo => todo._id !== action.payload)
                toast.success('Todo deleted successfully')
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                console.log('Error', action.payload)
                state.isError = true
                state.isLoading = false
                state.errorMessage = action.payload
            })
            //handle Delete All Todos 
            .addCase(deleteAllTodo.pending, (state, action) => {
                state.isLoading = true
                console.log('deleteAllTodo.pending is working....')
                state.isError = false
            })
            .addCase(deleteAllTodo.fulfilled, (state, action) => {
                console.log('Fulfilled AddCase', state, action.payload)
                state.isLoading = false
                state.todos = []
                toast.success('All todos are deleted')
                // state. = action.payload
                // state.todos = state.todos.filter(todo => todo)
            })
            .addCase(deleteAllTodo.rejected, (state, action) => {
                console.log('rejected AddCase Error', action.payload)
                state.isError = true
                state.isLoading = false
                state.errorMessage = action.payload
            })

            // handel Update Todo
            .addCase(updateTodo.pending, (state, action)=>{
                console.log('Update Todd Slice')
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false
                const index = state.todos.findIndex(todo => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
                toast.success('Todo updated successfully')
            })
            .addCase(updateTodo.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

    },
})

export const { addTodo, removeTodo, clearAllTdodo, editTodo } = todoSlice.actions

export default todoSlice.reducer


