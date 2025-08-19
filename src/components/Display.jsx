
export default function Display({todos, setTodos}){
    function handleRemove(id){
        setTodos((prevTodos)=>prevTodos.filter((todo)=>todo.id!==id))
    }
return(

    <>  
    <p>Current Todos:</p>
    <ul>
        {todos.map((item)=><li style={{textAlign:"left", color: item.important? "red":"black"
        }} key={item.id}>{item.text} - {item.id}  <button onClick={()=>{handleRemove(item.id)}}  style={{fontSize:"0.75rem"}}>X </button></li>)}
    </ul>
    </>

)

}