import { useTodosStore } from "../store/store"

export default function Home() {
  const todos = useTodosStore((state) => state.todos)
  const completed = todos.filter((t) => t.completed).length

  return (
    <div className="home">
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow bg-green-100">
          <p className="text-lg font-semibold">{todos.length}</p>
          <p>Total Todos</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-blue-100">
          <p className="text-lg font-semibold">{completed}</p>
          <p>Completed</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-yellow-100">
          <p className="text-lg font-semibold">{todos.length - completed}</p>
          <p>Pending</p>
        </div>
      </div>
    </div>
  )
}
