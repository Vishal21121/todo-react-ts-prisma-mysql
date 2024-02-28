import express from "express"
import { createTodoValidator } from "../validators/todo.validator"
import { validation } from "../middleware/validate.middleware"
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.controller"
const router = express.Router()

router.route("/create").post(createTodoValidator(), validation, createTodo)
router.route("/:userId").get(getTodo)
router.route("/update").patch(updateTodo)
router.route("/delete").delete(deleteTodo)

export default router