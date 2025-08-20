import { Outlet } from "react-router";
import { TbChecklist, TbMenu } from "react-icons/tb";
import Navigation from "./common/Navigate";
import { useState,useEffect } from "react";
import { useTodosStore } from "../store/store";
import './styles/Layout.css'


export default function Layout(){
    const addTodo = useTodosStore((state) => state.addTodo);
//     function grabTodos (){
//       const allKeys = []
//       for(let i = 0; i<localStorage.length; i++){
//         const key = localStorage.key(i);
//         allKeys.push(key)
//       }
//       const todoKeys = allKeys.filter((key)=>key.length==36)
//       const todos = todoKeys.map(key=>{
//         const todoString=localStorage.getItem(key)
//         return JSON.parse(todoString)
//       })
//       return todos
//     }
//     useEffect(()=>{
//   console.log("mount")
//     const todos = grabTodos().filter((todo)=> todo &&  todo.text)
//     console.log("Storage Todos: ",todos)
//     todos.map((todo)=>addTodo(todo))
// }, [])
    
    const [sideBarOpen, setSideBarOpen]=useState(false)
    function handleSideBar(){
        setSideBarOpen(!sideBarOpen)
    }

    return(
        <>
        <div className="layout">
           <aside className={`sidebar ${sideBarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
            <TbChecklist className="logo" />
            <TbMenu className="menu-toggle" onClick={handleSideBar} />
        </div>
        <Navigation />
        </aside>
            <main className="main-content">
                <Outlet></Outlet>
            </main>
        </div>
        
        </>
    )
}