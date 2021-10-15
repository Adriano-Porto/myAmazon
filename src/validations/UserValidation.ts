import { getCustomRepository, Repository } from "typeorm"
import { ValidationError } from "../errors/ValidationError"
import { User } from "../models/User"
import { UserRepository } from "../repositories/UserRepository"

interface IDatabaseValidations {
    email: string,
    password: string,
}

interface IDataValidations {
    name: string,
    email: string,
    password: string,
    money: number,
}

class UserValidations {
    private userRepository: Repository<User>

    constructor () {
        this.userRepository = getCustomRepository(UserRepository)
    }
    async databaseValidations ({email, password}: IDatabaseValidations) {
        const userAlreadyExists = await this.userRepository.findOne({
            where: { email }
        })
        if(userAlreadyExists) {
            throw new ValidationError("User Already Exists", 402)
        }

        const passwordAlreadyExists = await this.userRepository.findOne({
            where: { password }
        })
        if (passwordAlreadyExists) {
            throw new ValidationError("Password Already Exists", 402)
        }

    }

    dataValidations({ name, email, money } : IDataValidations) {
        if(money < 0 ){
            throw new ValidationError("Can't have negative number as money", 406)
        }

        if(
            name.trim().length === 0 ||
            email.trim().length === 0
        ) {
            throw new ValidationError("Can't save empty strings on the database", 406)
        }
    }
}

export { UserValidations }