import { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router'
import { useTodosStore } from './store/store'
import './App.css'
function App() {

const [todos, setTodos] = useState([])
useEffect(()=>{
  console.log("todos:", todos)
},[todos])
const ztodos = useTodosStore((state)=>state.todos)
useEffect(()=>{
  console.log("ZUSTAND TODOS: ", ztodos)
}, [ztodos])
  return (
    <>
       <h3>Task Tracker</h3>
       <Outlet context={[todos, setTodos]} ></Outlet>

      <div>
        <h3 style={{marginBottom:"0"}}>Links</h3>
        <ul style={{textAlign:"left", marginTop:'0'}}>
          <li><NavLink to="/add">Add</NavLink></li>
          <li><NavLink to="/display">Display</NavLink></li>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/hookform">HookForm</NavLink></li>
          <li><NavLink to="/zustand">Add From/zustand</NavLink></li>
          <li><NavLink to="/displayzustand">Display from Zustand Store</NavLink></li>
          <li><NavLink to="/async">Add & Display Async data</NavLink></li>

        </ul>
      </div>
    </>
  )
}

export default App
