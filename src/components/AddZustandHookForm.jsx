import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTodosStore } from "../store/store";
import { useForm } from "react-hook-form";
export default function AddZustandHookForm() {
  const addTodo = useTodosStore((state) => state.addTodo);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const [todo, setTodo] = useState({
    text: "",
    important: null,
    completed: false,
    id: null,
  });

  function onSubmit(data) {
    const newTodo = {
      ...data,
      id: uuidv4(),
      completed: false, 
      important: data.important === "true" || data.important === true, 
    };

    addTodo(newTodo);
    reset(); 
    setTodo({ text: "", important: null, completed: false, id: null });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="text">Todo: </label>
        <input
          type="text"
          {...register("text", {
            required: "Todo cannot be empty.",
            minLength: { value: 4, message: "Todo must be 4 letters or more!" },
          })}
          value={todo.text}
          onChange={(e) => setTodo({ ...todo, text: e.target.value })}
        />
        {errors.text && <div style={{ color: "red" }}>{errors.text.message}</div>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <legend style={{ textAlign: "left", marginTop: "0.5rem" }}>Important?</legend>
        <div style={{ textAlign: "left" }}>
          <input
            type="radio"
            id="yes"
            value={true}
            {...register("important", { required: "You must select whether it's important or not." })}
            checked={todo.important === true}
            onChange={() => setTodo({ ...todo, important: true })}
          />
          <label htmlFor="yes">Yes</label>
          {errors.important && <div style={{ color: "red" }}>{errors.important.message}</div>}
        </div>

        <div style={{ textAlign: "left" }}>
          <input
            type="radio"
            id="no"
            value={false}
            {...register("important")}
            checked={todo.important === false}
            onChange={() => setTodo({ ...todo, important: false })}
          />
          <label htmlFor="no">No</label>
        </div>

        <button type="submit">Add Todo</button>
      </div>
    </form>
  );
}
