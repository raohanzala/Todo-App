import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchTodos = createAsyncThunk('fetchTodos', async()=>{
    const response = await fetch('http://localhost:3001/get')
    return response.json()
})

export const sendTodoData = createAsyncThunk(
    'form/sendFormData',
    async (todoData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:5000/add', todoData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// try {
//     const response = await axios.post('http://localhost:5000/submit', formData);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }

const initialState = {
    todos: [],
    isLoading : false,
    isError : false
}

export const todoSlice = createSlice({
    name : 'todo',
    initialState,

    reducers : {
        addTodo : (state, action)=> {

            // console.log(action)
           const todo = {
                id: nanoid(), 
                text: action.payload.text,
            }
            state.todos.push(todo)
        },

        removeTodo : (state, action)=> {
            state.todos = state.todos.filter(todo=> todo.id !== action.payload)
            
        },

        clearAllTdodo :(state)=> {
            state.todos = []
        },
        editTodo : (state, action)=> {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            // console.log(todo.text)

            if(todo){
                todo.text = action.payload.text
            }


            // const editedTodo = {
            //     id: filterTodo.id, 
            //     text: filterTodo.text,
            // }
            // state.editedTodos.push(editedTodo)
        }

    },
    extraReducers : (builder)=> {
        builder.addCase(fetchTodos.pending,(state,action)=> {
            state.isLoading = true
        });
        builder.addCase(fetchTodos.fulfilled,(state,action)=> {
            state.isLoading = false
            state.todos = action.payload
        });
        builder.addCase(fetchTodos.rejected,(state,action)=> {
            console.log('Error', action.payload) 
            state.isError = true
        })
    },
})

export const {addTodo, removeTodo, clearAllTdodo,editTodo} = todoSlice.actions

export default todoSlice.reducer


