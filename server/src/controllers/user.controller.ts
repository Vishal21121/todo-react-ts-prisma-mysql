import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createAccount = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
        const userFound = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (userFound) {
            return res.status(400).json({
                success: false,
                data: {
                    statusCode: 400,
                    message: "Please enter different email address"
                }
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const createdAccount = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            },
            select: {
                id: true,
                username: true
            }
        })
        return res.status(201).json({
            success: true,
            data: {
                statusCode: 201,
                value: createdAccount
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 500,
                message: error || "Internal server error"
            }
        })
    }
}   