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

//state.todos to access the todos in the zustand store

export const useFetchStore = create((set)=>({
    posts:[],
    getPostsAsync: async()=>{
        try{
        const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
        const res = await posts.json();
             set((state)=>({
            posts: [...state.posts, ...res]
        }))
        }catch(e){
            console.log(e,"Something went wrong")
        }
   
    },
    


}))