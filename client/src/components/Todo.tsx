import { useEffect, useState } from "react";
import useArray from "../hooks/useArray";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoItem from "./TodoItem";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";

function Todo() {
  const [todoContent, setTodoContent] = useState("");
  const { getItem } = useLocalStorage();
  const { setArray, todos, addElement } = useArray();
  const { user } = useUserContext();
  const userId = user?.id;

  const getTodos = async () => {
    const user = getItem("user");
    const userId = user?.id;
    try {
      const response = await fetch(`api/v1/todo/${userId}`);
      const data = await response.json();
      if (data.data.statusCode == 200) {
        setArray(data.data.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (content: string) => {
    try {
      const response = await fetch("/api/v1/todo/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          content: content,
        }),
      });
      const data = await response.json();
      const statusCode = data.data.statusCode;
      if (statusCode == 201) {
        addElement(data.data.value);
        toast.success("Todo added successfully", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTodoContent("");
      } else if (statusCode == 422) {
        toast.error(data.data.value[0]["field"], {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
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
            value={todoContent}
            onChange={(e) => setTodoContent(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => addTodo(todoContent)}
          >
            Submit
          </button>
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
