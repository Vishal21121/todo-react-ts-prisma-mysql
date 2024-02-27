import express from "express"
import { userRegisterValidator } from "../validators/user.validator"
import { validation } from "../middleware/validate.middleware"
import { createAccount } from "../controllers/user.controller"
const router = express.Router()

router.route("/user/create").post(userRegisterValidator(), validation, createAccount)

export default router