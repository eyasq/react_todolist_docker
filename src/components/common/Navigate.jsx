import { NavLink } from "react-router"
import axios from "axios"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { userStore } from "../../store/store"
export default function Navigation(){
  const reset = userStore((state)=>state.reset)
  const [message, setMessage]=useState("")
  const [loggedIn, setLoggedIn]=useState(false)
  const navigate = useNavigate()
  async function isLoggedIn(){
    try{
      const loggedIn = await axios.get("http://localhost:8000/api/user", { withCredentials:true})
      if(loggedIn.data.auth == 'true'){setLoggedIn(true); loggedIn(true)}

    }catch(e){
      console.log("Somethign went wrong", e)
    }
  }
  async function handleLogOut(){
    try{
      await axios.post('http://localhost:8000/api/logout/',{}, {
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true
      })
      setMessage("Successfully Logged out")
      setLoggedIn(false)
      setTimeout(()=>{
          navigate("/login")
          setMessage("")
      },1000)
      reset();
      }catch(e){
        console.log("Error logging out", e)
      }
       
    }
    useEffect(()=>{
        isLoggedIn()
      },[])
    return(

                <nav>
          <ul style={{listStyleType:"none"}}>

          {loggedIn &&
          <div>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/zustand">Add Todo</NavLink></li>
          <li><NavLink to="/displayzustand">Display Todos</NavLink></li>
          <li><NavLink onClick={handleLogOut} >Logout</NavLink></li>
          </div>
            }
          {!loggedIn && <div>
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          {message}
            </div>}

                  </ul>
                </nav>
              

    )
}