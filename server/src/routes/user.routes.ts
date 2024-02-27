import express from "express"
import { userLoginValidator, userRegisterValidator } from "../validators/user.validator"
import { validation } from "../middleware/validate.middleware"
import { createAccount, loginUser } from "../controllers/user.controller"
const router = express.Router()

router.route("/create").post(userRegisterValidator(), validation, createAccount)
router.route("/login").post(userLoginValidator(), validation, loginUser)

export default router