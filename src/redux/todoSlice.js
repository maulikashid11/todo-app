import { createSlice } from "@reduxjs/toolkit"

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        showFinished: true
    },
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        setShowFinished: (state, action) => {
            state.showFinished = action.payload
            localStorage.setItem('showFinished', JSON.stringify(state.showFinished))
        },
        setIsCompleted: (state, action) => {
            state.todos[action.payload].isCompleted = !state.todos[action.payload].isCompleted
            localStorage.setItem('todos', JSON.stringify(state.todos))
        }
    }
})
export const { setTodos, setShowFinished, setIsCompleted } = todoSlice.actions
export default todoSlice.reducer