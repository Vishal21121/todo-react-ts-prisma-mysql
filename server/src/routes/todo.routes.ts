import express from "express"
import { createTodoValidator } from "../validators/todo.validator"
import { validation } from "../middleware/validate.middleware"
import { createTodo, getTodo } from "../controllers/todo.controller"
const router = express.Router()

router.route("/create").post(createTodoValidator(), validation, createTodo)
router.route("/:userId").get(getTodo)

export default router