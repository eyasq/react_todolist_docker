import { NavLink } from "react-router"
import axios from "axios"
import { useNavigate } from "react-router"
import { useState } from "react"
import { userStore } from "../../store/store"
export default function Navigation(){
  const reset = userStore((state)=>state.reset)
  const [message, setMessage]=useState("")
  const navigate = useNavigate()
  async function handleLogOut(){
    try{
      await axios.post('http://localhost:8000/api/logout/',{}, {
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true
      })
      setMessage("Successfully Logged out")
      setTimeout(()=>{
          navigate("/")
          setMessage("")
      },1000)
      reset();
      console.log("store on logout:\n",userStore.getState().user)
      }catch(e){
        console.log("Error logging out", e)
      }
    
  }
    return(

                <nav>
                  <ul style={{listStyleType:"none"}}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink onClick={handleLogOut} >Logout</NavLink></li>
          {message}

          <li><NavLink to="/zustand">Add Todo</NavLink></li>
          <li><NavLink to="/displayzustand">Display Todos</NavLink></li>

                  </ul>
                </nav>
              

    )
}