import { BaseRepository } from '#base-classes/repository.js';
import { IAuthRepository } from '#base-interfaces/repository.js';
import { IUser } from '#types/index.js';
import { UserModel } from './model.js';

export class AuthRepository
    extends BaseRepository<Partial<IUser>>
    implements IAuthRepository<Partial<IUser>>
{
    constructor() {
        super(UserModel);
    }
    async findByEmail(
        email: string,
        hasPassword = false,
    ): Promise<Partial<IUser> | null> {
        if (hasPassword)
            return this.db.findOne({ email }, '+password').lean().exec();
        return this.db.findOne({ email }).lean().exec();
    }
}
