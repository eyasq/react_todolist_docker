import { useTodosStore } from "../store/store";
import './styles/general.css'
export default function DisplayZustand(){
    const todos = useTodosStore((state)=>state.todos)
    const deleteTodo = useTodosStore((state)=>state.removeTodo)
    const checkTodo = useTodosStore((state)=>state.toggleCheck)
    function handleDelete(id){
        localStorage.removeItem(id)
        deleteTodo(id)
    }
return(

    <>  
    <p>Current Todos:</p>
    <ul>
        {todos.map((item)=><li 
        style={{textAlign:"left", color:item.completed? "green":(item.important? "red":"black"),
        }}
         key={item.id}>{item.text} 
         <button onClick={()=>{handleDelete(item.id)}}
         
         style={{fontSize:"0.75rem"}}>X </button> 
         <input type="checkbox"  onChange={()=>checkTodo(item.id)}/>
         </li>
        )}
    </ul>
    </>

)

}