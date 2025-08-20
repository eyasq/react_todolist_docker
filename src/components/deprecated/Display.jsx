import { useState } from "react";
import { useOutletContext } from "react-router";
import './styles/display.css'
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
return (
  <div className="display">
    <h2>Current Todos (State)</h2>
    <ul className="todo-list">
      {todos.map((item) => (
        <li
          key={item.id}
          className={`todo-item ${item.completed ? "completed" : ""} ${
            item.important ? "important" : ""
          }`}
        >
          <span>{item.text}</span>
          <div className="actions">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheck(item.id)}
            />
            <button onClick={() => handleRemove(item.id)}>✖</button>
          </div>
        </li>
      ))}
    </ul>

    <h2>LocalStorage Todos</h2>
    <ul className="todo-list">
      {todosFromStorage.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""} ${
            todo.important ? "important" : ""
          }`}
        >
          <span>
            {todo.text}{" "}
            <small>
              ({todo.important ? "Important" : "Not important"})
            </small>
          </span>
          <div className="actions">
            <button onClick={() => handleStorageDelete(todo.id)}>✖</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

}