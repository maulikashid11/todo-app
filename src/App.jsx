import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

export default function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useState(() => {
    setTodos(JSON.parse(localStorage.getItem('todos')) || [])
    setTodo(JSON.parse(localStorage.getItem('todo')) || '')
    setShowFinished(JSON.parse(localStorage.getItem('isFinished')) || true)
  }, [])

  
  const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('todo', JSON.stringify(todo))
    localStorage.setItem('isFinished', JSON.stringify(showFinished))
  }
  saveToLocalStorage()
  const addTodo = () => {
    setTodos([...todos, { todo, id: crypto.randomUUID(), isCompleted: false }])
    setTodo('')
    saveToLocalStorage()
  }
  const editTodo = (e, id) => {
    const t = todos.find(item => item.id === id)
    console.log(t)
    setTodo(t.todo)
    let newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const deleteTodo = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const checkbox = (e, id) => {
    const td = todos.findIndex((item) => item.id === id)
    todos[td].isCompleted = !todos[td].isCompleted
    let newTodos = [...todos]
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
    saveToLocalStorage()
  }
  return (
    <>
      <Navbar />
      <div className="container bg-slate-600 md:w-2/3 mx-auto my-5 text-white p-5 rounded-sm">
        <div className="addTasks">
          <h2 className='font-bold my-2 text-xl'>Add Your todo</h2>
          <input onChange={(e) => { setTodo(e.target.value)}} value={todo} type="text" className="bg-slate-500 mr-5 outline-0 rounded-md text-xl p-1" />
          <button onClick={addTodo} className='bg-violet-600  p-1 px-2 font-bold rounded-sm cursor-pointer'>Add</button>
        </div>
        <div className="todo-container">
          <h2 className='font-bold my-2'>Your todos</h2>
          <input onChange={toggleFinished} type="checkbox" name="" id="finished" checked={showFinished} />
          <label htmlFor="finished">   Show Finished</label>
          <hr className="my-5" />
          <div className="todos my-5">
            {
              todos.length ?
                todos.map((item) =>
                  (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-3 items-center my-5">
                    <input onChange={(e) => checkbox(e, item.id)} type="checkbox" name="" id="" checked={item.isCompleted} />
                    <p className={`${item.isCompleted ? 'line-through' : ''} font-bold`}>{item.todo}</p>
                    <button onClick={(e) => editTodo(e, item.id)} disabled={item.isCompleted} className='disabled:bg-violet-500 bg-violet-600  p-1 px-2 font-bold rounded-sm cursor-pointer'>Edit</button>
                    <button onClick={(e) => deleteTodo(e, item.id)} className='bg-violet-600  p-1 px-2 font-bold rounded-sm cursor-pointer'>Delete</button>
                  </div>
                ) : <div>Your todo is Empty</div>
            }
          </div>
        </div>
      </div >
    </>
  )
}
