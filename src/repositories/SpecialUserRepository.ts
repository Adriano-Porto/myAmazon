import { EntityRepository, Repository } from "typeorm"
import { SpecialUser } from "../models/SpecialUser"

@EntityRepository(SpecialUser)
class SpecialUserRepository extends Repository<SpecialUser> {}

export { SpecialUserRepository }