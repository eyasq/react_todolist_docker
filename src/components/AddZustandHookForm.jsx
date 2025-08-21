import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTodosStore } from "../store/store";
import { useForm } from "react-hook-form";
import axios from 'axios'
export default function AddZustandHookForm() {

  

  const addTodo = useTodosStore((state) => state.addTodo);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const [, setTodo] = useState({
    text: "",
    important: false,
    notes:"",
    completed: false,
    id: null,
    complete_by:null
  });
  
  async function postToDB(data){
    const csrfData = await axios.get("http://localhost:8000/api/getCSRF", {withCredentials:true});
    const csrfToken = csrfData.data.csrfToken
    try{
      await axios.post("http://localhost:8000/api/post", data,
      {
        headers:{
        "X-CSRFToken":csrfToken
      },
    withCredentials:true},
    )
    }catch(e){
      console.log("Error posting data",e)
    }
  }


  function onSubmit(data) {
    const newTodo = {
      ...data,
      title: data.text,
      due_by: data.complete_by,
      id: uuidv4(),
      completed: false, 
      important: data.important === "true" || data.important === true, 
    };

    addTodo(newTodo);
    console.log("This is what the db data should look like in postToDB: \n",newTodo)
    postToDB(newTodo)

    reset(); 
    setTodo({ text: "", notes:"", important: null, completed: false, id: null });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Todo
        </label>
        <input
          type="text"
          id="text"
          {...register("text", {
            required: "Todo cannot be empty.",
            minLength: { value: 4, message: "Todo must be 4 letters or more!" },
          })}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-500">{errors.text.message}</p>
        )}
      </div>
      <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes: <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            id="notes"
            rows="4"
            {...register("notes")}
            placeholder="Add any extra details..."
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
          />
</div>
       <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Due By:
        </label>
        <input
          type="date"
          id="text"
          {...register("complete_by", {
            required: "Due date cannot be empty.",
          })}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-500">{errors.complete_by.message}</p>
        )}
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">Important?</legend>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="yes"
            value={true}
            {...register("important", {
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="yes" className="text-sm text-gray-700">
            Yes
          </label>
        </div>


        {errors.important && (
          <p className="mt-1 text-sm text-red-500">{errors.important.message}</p>
        )}
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2 px-4 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        Add Todo
      </button>
    </form>
  );
}
