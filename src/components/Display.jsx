
export default function Display({todos, setTodos}){
    function handleRemove(id){
        setTodos((prevTodos)=>prevTodos.filter((todo)=>todo.id!==id))
    }
    function handleCheck(id){
        setTodos((prevTodos)=>
        prevTodos.map((todo)=>
        todo.id==id?{...todo, completed:!todo.completed}:todo))
    }
return(

    <>  
    <p>Current Todos:</p>
    <ul>
        {todos.map((item)=><li 
        style={{textAlign:"left", color:item.completed? "green":(item.important? "red":"black"),
        }}
         key={item.id}>{item.text} 
         -  
         <button 
         onClick={()=>{handleRemove(item.id)}}  
         style={{fontSize:"0.75rem"}}>X </button> 
         <input type="checkbox" onChange={()=>handleCheck(item.id)} />
         </li>
        )}
    </ul>
    </>

)

}