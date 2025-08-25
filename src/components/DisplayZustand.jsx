import './styles/general.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import {NavLink} from 'react-router'
export default function DisplayZustand(){
    const [loggedIn, setLoggedIn]=useState(false)
    const [loading, setLoading] = useState(true)
    const [todos, setTodos]=useState([])
    const [deleting, setDeleting]=useState(false)
     async function handleDelete(id){
      const csrfData = await axios.get("http://localhost:8000/api/getCSRF", {withCredentials:true});
      const csrfToken = csrfData.data.csrfToken
      setDeleting(true)
      try{
      await axios.delete(`http://localhost:8000/api/delete/${id}`, {
        headers:{
          "X-CSRFToken":csrfToken
        },
        withCredentials:true
      })
     setDeleting(false)
      }catch(e){
        console.log("Something went wrong Deleting",e)
      }
     }

     async function checkTodo(id, completed){
      const newComplete = !completed
      const csrfData = await axios.get("http://localhost:8000/api/getCSRF", {withCredentials:true});
      const csrfToken = csrfData.data.csrfToken

      try{
        await axios.put(`http://localhost:8000/api/edit/${id}`, {completed:newComplete}, 
          {headers:{
            "Content-Type":"application/json",
            "X-CSRFToken":csrfToken
          },
        withCredentials:true}
        )
        const Ctodos = await axios.get("http://localhost:8000/api/get", {headers:{"Content-Type":"application/json"}, withCredentials:true})
          setTodos(Ctodos.data)
        
        
      }
      catch(e){
        console.log(e, "Someting went wrong checking the todo!!")
      }
     }
    



    function formatDate(date){
      const date_ = new Date(date);
      return date_.toLocaleDateString('en-GB')
    }
    function overDue(date){
      const current_date = (new Date()).toLocaleString('en-GB')
      if(current_date > date){
        return true
      }
      return false
    }



    useEffect(()=>{
      const fetchTodos = async ()=>{
        try{
        const loggedIn = await axios.get("http://localhost:8000/api/user", { withCredentials:true})
        if(loggedIn.data.auth == 'true'){setLoggedIn(true)}
        const todos = await axios.get("http://localhost:8000/api/get", {
          headers:{
            "Content-Type":"application/json"
          }, withCredentials:true
        })
        setLoading(false)
        console.log(todos.data)
        setTodos(todos.data)
        }catch(e){
          console.log("Something went wrong while fetching from DB", e)
        }
      }; fetchTodos();
      
    },[deleting])

 return ( 
    <>
    {loggedIn? 
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md">
      <p className="text-lg font-semibold mb-4">Current Todos:</p>
       {loading && <span>Loading...</span>}
      <ul className="space-y-3">
        {todos.map((item) => (
          <li
            key={item.id}
            className={`flex items-center justify-between rounded-lg px-3 py-2 shadow-sm border
              ${item.completed ? "text-green-600" : item.important ? "text-red-600" : "text-gray-800"}
            `}
            >
            <div className="flex flex-col">
            <span className={item.completed ? "line-through" : ""}>
              {item.title} 
            </span>
            <span className="text-xs ">Complete by: {formatDate(item.due_by) } {overDue(formatDate(item.due_by))&&!item.completed? "OVERDUE":""}</span>
              {item.notes && (
    <span className="text-xs text-gray-500 mt-1 italic">
      Notes: {item.notes}
    </span> )}

              {deleting && (
    <span className="text-xs text-gray-500 mt-1 italic">
      Deleting.......
    </span> )}
     <span className="text-xs text-gray-500 mt-1 italic">
      <NavLink style={{textDecoration:"underline"}} to={`/edit/${item.id}`}>Edit</NavLink>
    </span>   <span className="text-xs text-gray-500 mt-1 italic"> Owner: {item.user}</span>
            </div>      
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                X
              </button>
              <input
                type="checkbox"
                onChange={() => checkTodo(item.id, item.completed)}
                checked={item.completed}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
            </div>
  
          </li>
        ))}
      </ul>
    </div>

    :     <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md">
      <p className="text-lg font-semibold mb-4">Log in to add todos!</p>
      
    </div>}
    </>
  );

}