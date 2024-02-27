import express from "express"
import { createTodoValidator } from "../validators/todo.validator"
import { validation } from "../middleware/validate.middleware"
import { createTodo } from "../controllers/todo.controller"
const router = express.Router()

router.route("/create").post(createTodoValidator(), validation, createTodo)

export default router