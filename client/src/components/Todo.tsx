import { useEffect, useState } from "react";
import useArray from "../hooks/useArray";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoItem from "./TodoItem";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { IoLogOut } from "react-icons/io5";
import TodoType from "../types/todoType";

function Todo() {
  const [todoContent, setTodoContent] = useState("");
  const { getItem } = useLocalStorage();
  const {
    setArray,
    todos,
    addElement,
    removeElement,
    updateElement,
    getELementIndex,
  } = useArray();
  const { user, logoutUser } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const [editableElement, setEditableElement] = useState<TodoType | null>(null);
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

  const editTodo = (element: TodoType) => {
    setTodoContent(element.content);
    setEditableElement(element);
    setEditMode(true);
  };

  const addTodo = async (content: string) => {
    if (editMode) {
      try {
        const response = await fetch("/api/v1/todo/update", {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content,
            isCompleted: editableElement?.isCompleted,
            todoId: editableElement?.id,
          }),
        });
        const data = await response.json();
        console.log(data);
        if (data.data.statusCode == 200) {
          const index = getELementIndex(editableElement?.id);
          console.log(index);
          updateElement(index, data.data.value);
          setTodoContent("");
        }
      } catch (error) {
        console.log(error);
      }
      console.log(todos);
      setEditMode(false);
      return;
    }
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

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch("/api/v1/todo/delete", {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId: id,
        }),
      });
      const data = await response.json();
      if (data.data.statusCode == 200) {
        removeElement(data.data.value.id);
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
          <button className="btn btn-primary" onClick={logoutUser}>
            Logout
            <IoLogOut className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="w-3/4 md:w-4/5 flex flex-col items-center gap-4 p-4">
        <h2 className="text-2xl font-bold">Saved Todos</h2>
        <div className="flex flex-col gap-4 w-full md:h-[60vh] overflow-scroll p-2 overflow-x-hidden">
          {todos.map((el) => (
            <TodoItem
              key={el.id}
              el={el}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Todo;
