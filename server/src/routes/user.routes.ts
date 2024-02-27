import express from "express"
import { userLoginValidator, userRegisterValidator } from "../validators/user.validator"
import { validation } from "../middleware/validate.middleware"
import { createAccount, loginUser } from "../controllers/user.controller"
const router = express.Router()

router.route("/user/create").post(userRegisterValidator(), validation, createAccount)
router.route("/user/login").post(userLoginValidator(), validation, loginUser)

export default router