import { useState } from "react"
import Todo from "../types/todoType"


const useArray = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    const setArray = (array: Todo[]) => {
        setTodos(array)
    }

    const getELementIndex = (id: (string | undefined)) => {
        if (id == undefined) {
            return
        }
        let index = todos.findIndex(el => el.id == id)
        return index
    }

    const addElement = (element: Todo) => {
        setTodos((pre) => [...pre, element])
    }

    const removeElement = (id: string) => {
        todos.filter(el => el.id != id)
        setTodos(todos.filter(el => el.id != id))
    }

    const updateElement = (index: (number | undefined), element: (Todo | null)) => {
        if (element == null || index == undefined) {
            return
        }
        let arr = [...todos.slice(0, index), element, ...todos.slice(index + 1, todos.length - 1)]
        console.log("not return", arr)
        setTodos(arr)
    }

    return { setArray, addElement, removeElement, updateElement, todos, getELementIndex }
}

export default useArray