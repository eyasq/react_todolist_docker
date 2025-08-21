import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
const [todos, setTodos]=useState([])
const [loading, setLoading]=useState(true)
const [completedTodos, setCompletedTodos]=useState([])

    useEffect(()=>{
      const fetchAllTodos = async ()=>{
        try{
        const todos = await axios.get("http://localhost:8000/api/get")
        const compTodos = await axios.get("http://localhost:8000/api/get/completed")
        setCompletedTodos(compTodos.data)
        setTodos(todos.data)
        }catch(e){
          console.log("Something went wrong while fetching from DB", e)
        }finally{
              setLoading(false)

        }
      }; 
     
   fetchAllTodos();   
      
    },[])


  return (
    <div className="home">
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow bg-green-100">
          <p className="text-lg font-semibold">{loading?"Loading...":todos.length}</p>
          <p>Total Todos</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-blue-100">
          <p className="text-lg font-semibold">{loading?"Loading...":completedTodos.length}</p>
          <p>Completed</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-yellow-100">
          <p className="text-lg font-semibold">{loading?"Loading...": todos.length-completedTodos.length}</p>
          <p>Pending</p>
        </div>
      </div>
    </div>
  )
}
