import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function Form(props){
const [Todo, setTodo] = useState({
    text:'',
    important: null,
    completed:false,
    id: null,
})
function handleSubmit(e){
    const newTodo = {
        ...Todo,
        id:uuidv4()
    }
    e.preventDefault();
    const {todos, setTodos} = props
    setTodos([...todos, newTodo])

}
    return(
        <>
        <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
        <div>
            <label htmlFor="text">Todo:  </label>
            <input type="text" minLength={5} required={true} onChange={(e)=>setTodo({...Todo, text:e.target.value})}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <legend style={{textAlign:"left", marginTop:"0.5rem"}}>Important?  </legend>
            <div style={{textAlign:"left"}}>
                    <input type="Radio" id="yes" value={true}  name="important"
                    checked={Todo.important===true}
                    onChange={()=>setTodo({...Todo, important:true})}
                    required/>
                    <label htmlFor="yes">Yes</label>
            </div>
            <div style={{textAlign:"left"}}>
                    <input type="Radio" id="No"  name="important" value={false}
                    checked={Todo.important===false}
                    onChange={()=>setTodo({...Todo, important:false})}
                    required/>
                    <label htmlFor="No">No</label>

            </div>
                        <input type="hidden" value={false} name="completed" />

            <button>Add todo</button>
        </div>

        </form>
        </>
    )
}