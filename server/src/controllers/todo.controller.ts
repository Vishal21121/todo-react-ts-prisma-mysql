import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express"
const prisma = new PrismaClient()

export const createTodo = async (req: Request, res: Response) => {
    const { content, userId } = req.body
    try {
        const userFound = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!userFound) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 404,
                    message: "please provide correct userId"
                }
            })
        }
        const todoCreated = await prisma.todo.create({
            data: {
                content: content,
                userId: userId
            }
        })
        return res.status(201).json({
            success: true,
            data: {
                statusCode: 201,
                value: todoCreated
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 500,
                message: error || "Internal server error"
            }
        })
    }
}

export const getTodo = async (req: Request, res: Response) => {
    const { userId } = req.params
    if (!userId) {
        return res.status(400).json({
            success: false,
            data: {
                statusCode: 400,
                message: "Please provide userId"
            }
        })
    }
    try {
        const userFound = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!userFound) {
            return res.status(404).json({
                success: false,
                data: {
                    statusCode: 404,
                    message: "please provide correct userId"
                }
            })
        }
        const todos = await prisma.todo.findMany({
            where: {
                userId: userId
            }
        })
        return res.status(200).json({
            success: true,
            data: {
                statusCode: 200,
                value: todos
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 500,
                message: error || "Internal server error"
            }
        })
    }
}