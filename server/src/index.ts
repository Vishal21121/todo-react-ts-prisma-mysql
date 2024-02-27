import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config()

const app = express()

app.get("/heath", (req: Request, res: Response) => {
    res.status(200).send("up and running!")
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})