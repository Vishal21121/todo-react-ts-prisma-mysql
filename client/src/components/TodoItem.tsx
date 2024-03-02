import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Todo from "../types/todoType";

function TodoItem({
  el,
  deleteTodo,
  editTodo,
}: {
  el: Todo;
  deleteTodo: (id: string) => void;
  editTodo: (element: Todo) => void;
}) {
  return (
    <div className="p-2 bg-neutral sm:p-4 rounded-md flex flex-col sm:flex-row md:flex-row gap-4 items-center justify-between w-full ">
      <div className="flex gap-2 w-full md:w-full">
        <input type="checkbox" defaultChecked className="checkbox mt-1" />
        <p className="w-full sm:w-[90%]">{el.content}</p>
      </div>
      <div className="flex gap-2">
        <FaEdit
          className="text-2xl sm:text-3xl hover:cursor-pointer"
          onClick={() => editTodo(el)}
        />
        <MdDelete
          className="text-2xl sm:text-3xl hover:cursor-pointer"
          onClick={() => deleteTodo(el.id)}
        />
      </div>
    </div>
  );
}

export default TodoItem;
