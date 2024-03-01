import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function TodoItem() {
  return (
    <div className="p-2 bg-neutral sm:p-4 rounded-md flex flex-col sm:flex-row md:flex-row gap-4 items-center justify-between w-full ">
      <div className="flex gap-2 w-full md:w-full">
        <input type="checkbox" defaultChecked className="checkbox mt-1" />
        <p className="w-full sm:w-[90%]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea velit
          deleniti repellendus magnam iste ratione accusamus, in tempora, sunt
          nobis et sed explicabo esse distinctio libero officiis? Officia, minus
          sed.
        </p>
      </div>
      <div className="flex gap-2">
        <FaEdit className="text-2xl sm:text-3xl" />
        <MdDelete className="text-2xl sm:text-3xl" />
      </div>
    </div>
  );
}

export default TodoItem;
