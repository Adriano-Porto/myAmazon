import { getCustomRepository, Repository } from "typeorm"
import { ValidationError } from "../errors/ValidationError"
import { SpecialUser } from "../models/SpecialUser"
import { SpecialUserRepository } from "../repositories/SpecialUserRepository"

interface IDatabaseValidations {
    email: string
    password: string;
    created_by: string;
}

interface IDataValidation {
    name: string,
    email: string,
    password: string,
}

class SpecialUserValidation {
    private specialUserRepository: Repository<SpecialUser>

    constructor() {
        this.specialUserRepository = getCustomRepository(SpecialUserRepository)
    }

    async databaseValidations ({
        email,
        password,
        created_by
    } : IDatabaseValidations) {
        const emailExists = await this.specialUserRepository.findOne({
            where: { email }
        })
        if(emailExists) {
            throw new ValidationError("Email already exists", 402)
        }

        const passwordExists = await this.specialUserRepository.findOne({
            where: { password }
        })
        if(passwordExists) {
            throw new ValidationError("Password already exists", 402)
        }

        const creatorExists = await this.specialUserRepository.findOne({
            where: { id: created_by }
        })
        if(!creatorExists) {
            throw new ValidationError("Creator User don't exists", 402)
        }
    }

    dataValidations({ name, email, password } : IDataValidation) {
        if(!name){
            throw new ValidationError("Name was not mentioned", 400)
        }

        if(!email){
            throw new ValidationError("Email was not mentioned", 400)
        }

        if(!password){
            throw new ValidationError("Password was not mentioned", 400)
        }

        if (
            name.trim().length === 0 ||
            email.trim().length === 0 ||
            password.trim().length === 0
        ){
            throw new ValidationError(
                "Can't save empty strings on the database", 406)
        }
    }
}

export { SpecialUserValidation }