import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useTodosStore } from "../../store/store";

export default function AddZustand(){
    const addTodo = useTodosStore((state)=>state.addTodo)
    const [todo, setTodo] = useState({
        text:'',
        important: null,
        completed:false,
        id: null,
    })
    function handleSubmit(e){
        e.preventDefault();
        const newTodo = {
            ...todo,
            id:uuidv4()
        }
        e.preventDefault();
        
        addTodo(newTodo)

    }
    return(
        <>
        <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
        <div>
            <label htmlFor="text">Todo:  </label>
            <input type="text" minLength={5} required={true} onChange={(e)=>setTodo({...todo, text:e.target.value})}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <legend style={{textAlign:"left", marginTop:"0.5rem"}}>Important?  </legend>
            <div style={{textAlign:"left"}}>
                    <input type="Radio" id="yes" value={true}  name="important"
                    checked={todo.important===true}
                    onChange={()=>setTodo({...todo, important:true})}
                    required/>
                    <label htmlFor="yes">Yes</label>
            </div>
            <div style={{textAlign:"left"}}>
                    <input type="Radio" id="No"  name="important" value={false}
                    checked={todo.important===false}
                    onChange={()=>setTodo({...todo, important:false})}
                    required/>
                    <label htmlFor="No">No</label>

            </div>
                       

            <button>Add todo</button>
        </div>

        </form>
        </>
    )
}