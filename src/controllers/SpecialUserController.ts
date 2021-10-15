import { Request, Response } from "express"
import { ValidationError } from "../errors/ValidationError"
import { SpecialUserService } from "../services/SpecialUserService"
import { SpecialUserValidation } from "../validations/SpecialUserValidation"

class SpecialUserController {
    async create (request: Request, response: Response){
        const specialUserValidation = new SpecialUserValidation()
        const specialUserService = new SpecialUserService()

        const specialUserReceived = request.body

        specialUserValidation.dataValidations(specialUserReceived)
        await specialUserValidation.databaseValidations(specialUserReceived)
        const specialUser = await specialUserService.save(specialUserReceived)

        return response.status(200).json({
            Message: "Special User was Successfully Saved",
            specialUser
        })
    }
}

export { SpecialUserController }