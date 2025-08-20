import { useState } from "react";
import { useOutletContext } from "react-router";
export default function Display(){
    const [todos, setTodos] = useOutletContext()
    const [, setStorageTodos] = useState(() => {
    return Object.keys(localStorage)
      .map(key => JSON.parse(localStorage.getItem(key)))
      .filter(todo => todo?.id != null); // filter out bad data
  });
    function handleRemove(id){
        setTodos((prevTodos)=>prevTodos.filter((todo)=>todo.id!==id))
    }
    function handleCheck(id){
        setTodos((prevTodos)=>
        prevTodos.map((todo)=>
        todo.id==id?{...todo, completed:!todo.completed}:todo))
    }
    const items = {...localStorage}
    console.log("LocalStorage items:", items)
    const todosFromStorage = Object.keys(localStorage).map(key => {
    return JSON.parse(localStorage.getItem(key))
    })
    console.log(todosFromStorage)
    function handleStorageDelete(id){
        localStorage.removeItem(id)
        setStorageTodos(prev=>prev.filter(todo=>todo.id!=id))
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
    <div>LocalStorage Tasks (added through normal Form component)</div>
        <ul>
           <ul>
            {todosFromStorage.map(todo => (
            <li key={todo.id}>
                {todo.text} - {todo.important ? 'Important' : 'Not important'}
             - <button onClick={()=>handleStorageDelete(todo.id)}>Delete from storage</button></li>
            ))}
        </ul>
        </ul>
    </>

)

}