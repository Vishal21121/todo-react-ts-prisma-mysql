import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes"
dotenv.config()

const app = express()


app.use(express.json())

app.get("/heath", (req: Request, res: Response) => {
    res.status(200).send("up and running!")
})

app.use("/api/v1", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})