import { body } from "express-validator";

const createTodoValidator = () => {
    return [
        body("content")
            .notEmpty()
            .withMessage("Content cannot be empty"),
        body("userId")
            .notEmpty()
            .withMessage("userid is required"),
    ]
}

export { createTodoValidator }