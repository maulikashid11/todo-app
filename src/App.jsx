import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCompleted, setShowFinished, setTodos } from './redux/todoSlice'

export default function App() {

  const [todo, setTodo] = useState('')
  const [error, setError] = useState('')
  const { todos, showFinished } = useSelector(store => store.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTodos(JSON.parse(localStorage.getItem('todos')) === null ? [] : JSON.parse(localStorage.getItem('todos') || [])))
    dispatch(setShowFinished(JSON.parse(localStorage.getItem('showFinished') || true)))
  }, [])

  const addTodo = () => {
    if (todo) {
      dispatch(setTodos([...todos, { todo, id: crypto.randomUUID(), isCompleted: false }]))
      setTodo('')
    } else {
      setError('Please enter todo')
    }
  }
  const editTodo = (e, id) => {
    const t = todos.find(item => item.id === id)
    console.log(t)
    setTodo(t.todo)
    let newTodos = todos.filter((item) => item.id !== id)
    dispatch(setTodos(newTodos))
  }
  const deleteTodo = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id)
    dispatch(setTodos(newTodos))
  }
  const checkbox = (e, id) => {
    const td = todos.findIndex((item) => item.id === id)
    dispatch(setIsCompleted(td))
  }

  const toggleFinished = () => {
    dispatch(setShowFinished(!showFinished))
  }
  return (
    <>
      <Navbar />
      <div className="container bg-slate-600 md:w-2/3 mx-auto my-5 text-white p-5 rounded-sm">
        <div className="addTasks">
          <h2 className='font-bold my-2 text-xl'>Add Your todo</h2>
          <input onChange={(e) => { setTodo(e.target.value); setError('') }} value={todo} placeholder='Enter todo' type="text" className="bg-slate-500 mr-5 outline-0 rounded-md text-xl p-1" />
          <button onClick={addTodo} className='bg-violet-600  p-1 px-2 font-bold rounded-sm cursor-pointer'>Add</button>
          {
            error &&
            <p className='text-red-500'>{error}</p>
          }
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
