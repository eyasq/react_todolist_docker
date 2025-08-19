import { useState } from "react";
import {v4 as uuidv4  } from 'uuid';
import { useOutletContext } from "react-router";
import {useForm} from 'react-hook-form'

export default function HookForm(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [todos, setTodos] = useOutletContext()
    const [Todo, setTodo] = useState({
        text:'',
        important:null,
        completed:false,
        id:null
    })
    function onSubmit(data){
        console.log(data)
        //data = {text:'', important:'true', complete:'false'}
        const todoData = {...data, id:uuidv4()};
        console.log("Todo data:" , todoData)
        setTodos([...todos, todoData])
    }

return(
    <>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="text">Todo:  </label>
            <input type="text" {...register("text", {required:"Todo cannot be empty.", minLength:{
                value:4,
                message: "Todo must be 4 letters or more!"
                }})} onChange={(e)=>setTodo({...Todo, text:e.target.value})}/>
            {errors.text?.message && <div style={{color:"red"}}>{errors.text?.message}</div>}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <legend style={{textAlign:"left", marginTop:"0.5rem"}}>Important?  </legend>
            <div style={{textAlign:"left"}}>
                    <input type="Radio" id="yes" value={true} {...register("important", {required:"You must select whether it's important or not."})}  
                    checked={Todo.important===true}
                    onChange={()=>setTodo({...Todo, important:true})}
                    required/>
                    {errors.important?.message && <div>{errors.important.message}</div>}
                    <label htmlFor="yes">Yes</label>
            </div>
            <div style={{textAlign:"left"}}>
                    <input type="Radio" id="No"   {...register("important")} value={false}
                    checked={Todo.important===false}
                    onChange={()=>setTodo({...Todo, important:false})}
                    required/>
                    <label htmlFor="No">No</label>

            </div>
                        <input type="hidden" {...register("completed")} value={false} name="completed" />

            <button>Add todo</button>
        </div>
        </form>
    
    </>
)

}