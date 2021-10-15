import { getCustomRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { SpecialUserRepository } from "../repositories/SpecialUserRepository";

class UserService {
    private userRepository: Repository<User>
    private specialUserRepository: Repository<SpecialUserRepository>
    constructor () {
        this.userRepository = getCustomRepository(UserRepository)
    }

    save (userReceived : object) {
        const user = this.userRepository.create(userReceived)
        this.userRepository.save(user)
        return user
    }

    async login ({email, password}:{email:string,password:string}) {
        const specialUserFound = await this.specialUserRepository.findOne({
            where: { email:email, password:password }
        })

        if(specialUserFound) return specialUserFound

        const userFound = await this.userRepository.findOne({
            where: {
                email: email,
                password: password
            }
        })
        return userFound
    }

    
}

export { UserService }