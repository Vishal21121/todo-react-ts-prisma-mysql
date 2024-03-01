import { useEffect } from "react";
import useArray from "../hooks/useArray";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoItem from "./TodoItem";

function Todo() {
  const { getItem } = useLocalStorage();
  const { setArray, todos } = useArray();

  const getTodos = async () => {
    const user = getItem("user");
    const userId = user?.id;
    try {
      const response = await fetch(`api/v1/todo/${userId}`);
      const data = await response.json();
      if (data.data.statusCode == 200) {
        console.log(data.data.value);
        setArray(data.data.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="w-full flex flex-col items-center h-screen">
      <div className="w-3/4 md:w-4/5 mt-8 flex flex-col flex-wrap items-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Create Todo</h1>
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 w-full">
          <input
            type="text"
            placeholder="What you have planned to do?"
            className="input input-bordered w-full sm:w-3/4"
          />
          <button className="btn btn-success">Submit</button>
        </div>
      </div>
      <div className="w-3/4 md:w-4/5 flex flex-col items-center gap-4 p-4">
        <h2 className="text-2xl font-bold">Saved Todos</h2>
        <div className="flex flex-col gap-4 w-full md:h-[60vh] overflow-scroll p-2 overflow-x-hidden">
          {todos.map((el) => (
            <TodoItem key={el.id} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Todo;
