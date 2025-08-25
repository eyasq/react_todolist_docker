import { useForm } from "react-hook-form"
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { userStore } from "../store/store";
export default function Register(){
    const [message,setMessage]=useState('')
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const addUserData = userStore((state)=>state.addUser)
    async function handleData(data){
        try{
            const csrfData = await axios.get("http://localhost:8000/api/getCSRF", {withCredentials:true});
            const csrfToken = csrfData.data.csrfToken
            await axios.post("http://localhost:8000/api/login/", data,{
                headers:{
                    "X-CSRFToken":csrfToken,
                    "Content-Type":"application/json"
                }, withCredentials:true
            })
            setMessage("Successfully Logged in!")
            try{
              const userData = await axios.get('http://localhost:8000/api/user/', {
                headers:{
                   "X-CSRFToken":csrfToken,
                    "Content-Type":"application/json"
                },
                withCredentials:true
              })
              console.log("USER data: ", userData) //userData.data.email, userData.data.username
              addUserData({"username":userData.data.username, "email":userData.data.email});
                console.log("STORES STATE RN AFTER ADDING:\n",userStore.getState().user)
              
             
            }catch(e){
              console.log(e)
            }


        setTimeout(()=>{
            navigate("/")
        },1000)
            }catch(e){
                console.log("Somethign went wrong, ", e)
                setMessage("Registry Failed")
            }
    }


    function onSubmit(data) {
    const userData = ({
        "username":data.username,
        "password":data.password
    })
    console.log(userData)
    handleData(userData)
        };
    

    return(
        <>     
            {message}
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6" >

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Username cannot be empty."
          })}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

    


      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password cannot be empty.",
    
          })}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>


     

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2 px-4 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </form>


    </>

    )
}