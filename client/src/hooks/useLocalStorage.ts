import { User } from "../types/userType"

const useLocalStorage = () => {

    const setItem = (key: string, value: User) => {
        if (!key || !value) {
            return
        }
        localStorage.setItem(key, JSON.stringify(value))
    }

    const getItem = (itemName: string): (User | null) => {
        if (!itemName) {
            return null
        }
        let itemFound = localStorage.getItem(itemName)
        if (!itemFound) {
            return null
        }
        try {
            let parsedItem = JSON.parse(itemFound)
            return parsedItem
        } catch (error) {
            console.log(error)
            return null
        }
    }
    const deleteItem = (itemName: string) => {
        if (!itemName) {
            return
        }
        localStorage.removeItem(itemName)
    }
    const removeAll = () => {
        localStorage.clear()
    }
    return { setItem, getItem, deleteItem, removeAll }
}

export default useLocalStorage