import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { ValidationError } from "../errors/ValidationError"
import { UserRepository } from "../repositories/UserRepository"
import { UserService } from "../services/UserService"
import { UserValidations } from "../validations/UserValidation"

class UserController {
    async create ( request: Request, response: Response) {
        const userReceived = request.body
        const userValidations = new UserValidations()
        const userService = new UserService()

        userValidations.dataValidations(userReceived)
        await userValidations.databaseValidations(userReceived)

        const user = userService.save(userReceived)
        return response.status(200).json({Message: "User Successfuly Saved", user })
    }

    async login ( request: Request, response: Response) {
        const credentials = request.body
        const userService = new UserService()
        
        const userFound = await userService.login(credentials)

        if(userFound){
            return response.status(201).json(userFound)
        } else {
            return response.status(403)
                .json({
                    Message: "Usuário não existente, senha ou email inválidos"
                })
        }
    }
}

export { UserController }