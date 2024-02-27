import { validationResult, FieldValidationError, ValidationError } from "express-validator";
import { Request, Response, NextFunction } from "express";

interface ErrorType {
    [x: string]: string
}

export const validation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const errorStack: ErrorType[] = []
    errors.array().map((error: ValidationError) => {
        errorStack.push({ [error.type]: error.msg })
    })
    return res.status(422).json({
        status: "failure",
        data: {
            statusCode: 422,
            value: errorStack
        }
    })
}