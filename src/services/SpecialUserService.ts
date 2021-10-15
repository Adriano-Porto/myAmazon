import { getCustomRepository, Repository } from "typeorm"
import { SpecialUser } from "../models/SpecialUser"
import { SpecialUserRepository } from "../repositories/SpecialUserRepository"

interface ISpecialUserReceived {
    name: string,
    password: string,
    email: string,
    created_by: string
}

class SpecialUserService {

    private specialUserRepository: Repository<SpecialUser>
    
    constructor () {
        this.specialUserRepository = getCustomRepository(SpecialUserRepository)
    }

    async save (specialUserReceived : ISpecialUserReceived) {
        const specialUser = this.specialUserRepository.create(specialUserReceived)
        await this.specialUserRepository.save(specialUser)
        return specialUser
    }
}

export { SpecialUserService}