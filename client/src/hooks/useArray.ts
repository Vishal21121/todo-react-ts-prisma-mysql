import { useState } from "react"
import { Todo } from "../types/todoType"


const useArray = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    const setArray = (array: Todo[]) => {
        setTodos(array)
    }

    const addElement = (element: Todo) => {
        setTodos((pre) => [...pre, element])
    }

    const removeElement = (id: string) => {
        setTodos(arr => arr.filter(el => el.id == id))
    }

    const updateElement = (index: number, element: Todo) => {
        setTodos(arr => [
            ...arr.slice(0, index),
            element,
            ...arr.slice(index + 1, arr.length - 1)
        ])
    }

    return { setArray, addElement, removeElement, updateElement, todos }
}

export default useArray