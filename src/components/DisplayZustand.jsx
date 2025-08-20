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
 return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md">
      <p className="text-lg font-semibold mb-4">Current Todos:</p>
      <ul className="space-y-3">
        {todos.map((item) => (
          <li
            key={item.id}
            className={`flex items-center justify-between rounded-lg px-3 py-2 shadow-sm border
              ${item.completed ? "text-green-600" : item.important ? "text-red-600" : "text-gray-800"}
            `}
          >
            <span className={item.completed ? "line-through" : ""}>
              {item.text}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                X
              </button>
              <input
                type="checkbox"
                onChange={() => checkTodo(item.id)}
                checked={item.completed}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}