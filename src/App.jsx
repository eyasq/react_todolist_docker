import { useEffect, useState } from 'react'

import './App.css'
import Form from './components/Form'
function App() {
const [todos, setTodos] = useState([])
useEffect(()=>{
  console.log("todos:", todos)
},[todos])
  return (
    <>
       <h3>Task Tracker</h3>
      <Form setTodos={setTodos} todos={todos}></Form>
      
    </>
  )
}

export default App
