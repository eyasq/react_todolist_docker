import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
const [todos, setTodos]=useState([])
const [loading, setLoading]=useState(true)
const [completedTodos, setCompletedTodos]=useState([])
const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
      const fetchAllTodos = async ()=>{
        try{
        const loggedIn = await axios.get("http://localhost:8000/api/user", { withCredentials:true})
        if (loggedIn.data.auth == 'true'){
                    const todos = await axios.get("http://localhost:8000/api/get", {headers:{"Content-Type":"application/json"}, withCredentials:true})
                    const compTodos = await axios.get("http://localhost:8000/api/get/completed", {headers:{"Content-Type":"application/json"}, withCredentials:true} )
                    setCompletedTodos(compTodos.data)
                    setTodos(todos.data)
                    setLoggedIn(true)
          } else {
            setCompletedTodos(0)
            setTodos([])
          }

        
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
      {loggedIn? <h1 className="text-2xl font-bold">Welcome Back 👋</h1>:<h1 className="text-2xl font-bold">Hello! Please Log in</h1>}
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow bg-green-100">
          <p className="text-lg font-semibold">{loading?"Loading...":todos.length}</p>
          <p>Total Todos</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-blue-100">
          <p className="text-lg font-semibold">
            {loggedIn?loading?"Loading...":completedTodos.length:0}

            </p>
          <p>Completed</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-yellow-100">
          <p className="text-lg font-semibold">{loggedIn?loading?"Loading...": todos.length-completedTodos.length:0}</p>
          <p>Pending</p>
        </div>
      </div>
    </div>
  )
}
