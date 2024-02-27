import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username should be provided")
            .isLength({ min: 3 })
            .withMessage("Username must of 3 characters"),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email address"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Please enter your password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long"),

    ]
}

const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Please enter your password")
    ]
}

export { userRegisterValidator, userLoginValidator }