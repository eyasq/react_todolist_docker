import { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router'
import './App.css'
import Form from './components/Form'
import Display from './components/Display'
function App() {
const [todos, setTodos] = useState([])
useEffect(()=>{
  console.log("todos:", todos)
},[todos])
  return (
    <>
       <h3>Task Tracker</h3>
       <Outlet context={[todos, setTodos]} ></Outlet>

      <div>
        <h3>Links</h3>
        <ul style={{textAlign:"left"}}>
          <li><NavLink to="/add">Add</NavLink></li>
          <li><NavLink to="/display">Display</NavLink></li>
          <li><NavLink to="/">Home</NavLink></li>


        </ul>
      </div>
    </>
  )
}

export default App
