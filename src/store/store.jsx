import {create} from 'zustand'

export const useTodosStore = create((set)=>({
    todos:[],
    addTodo: (todo)=>
        set((state)=>({
            todos:[...state.todos, todo]
        })) 
    ,
    removeTodo:(todoId)=>set((state)=>({
        todos:state.todos.filter(todo=>todo.id!==todoId)}))
    ,
    toggleCheck: (id)=>set((state)=>({
        todos: state.todos.map((todo)=>
        todo.id==id?{...todo, completed:!todo.completed}:todo)
    }))


}))