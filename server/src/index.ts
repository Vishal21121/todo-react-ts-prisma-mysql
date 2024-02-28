import express, { Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import userRouter from "./routes/user.routes"
import todoRouter from "./routes/todo.routes"
dotenv.config()

const app = express()


app.use(express.json())
app.use(cors())

app.get("/heath", (req: Request, res: Response) => {
    res.status(200).send("up and running!")
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/todo", todoRouter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})