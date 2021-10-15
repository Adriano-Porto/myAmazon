import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import "express-async-errors"
import { createConnection } from "typeorm"
import { router } from "./router"
import { join } from "path"
import { ValidationError } from "./errors/ValidationError"

createConnection()
const app = express()

app.use(express.json())
    .post('/post', (req, res) => {
        console.log("Connected to React")
        res.redirect('/')
    })
    .use(router)
    .use((
        err: Error,
        request: Request,
        response: Response,
        _next: NextFunction
    )=>{
        if(err instanceof ValidationError) {
            return response.status(err.statusCode).json({
                message: err.message
            })
        }
        console.log(err)

        return response.status(500).json({
            messsage: "Internal Server Error"
        })
    })
    .use(express.static("public"))
    .set("views", join(__dirname, "..", "public", "pages"))
    .set('view engine', 'hbs')

export { app }