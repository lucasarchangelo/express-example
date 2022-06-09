import { User } from '../models/User';
import { UserRepository } from '../repository/user.repository';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }


    public getAll = async () => {
        const users = await this.userRepository.getAll()
        return users;
    }

    public getById = async (id: number) => {
        const users = await this.userRepository.getById(id)
        return users;
    }

    public create = async (user: User) => {
        const newUser = await this.userRepository.create(user);
        return newUser;
    }

    public update = async (user: User, id: number) => {
        const updatedPost = await this.userRepository.update(id, user);
        return updatedPost;
    }

    public delete = async (id: number) => {
        const deletedPost = await this.userRepository.delete(id);
        return deletedPost;
    }

}