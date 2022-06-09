import { User } from '../models/User';
import { UserRepository } from '../repository/user.repository';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public getAll = async () => {
        return await this.userRepository.getAll();
    }

    public getById = async (id: number) => {
        return await this.userRepository.getById(id)
    }

    public create = async (user: User) => {
        return await this.userRepository.create(user);
    }

    public update = async (user: User, id: number) => {
        return await this.userRepository.update(id, user);
    }

    public delete = async (id: number) => {
        return await this.userRepository.delete(id);
    }
}