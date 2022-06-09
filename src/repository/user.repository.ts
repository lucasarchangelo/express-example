import { User } from '../models/User';
import { RepositoryExecute } from './repository-execute';

export class UserRepository {
    private repositoryExecute = new RepositoryExecute();

    public async getAll() {
        try {
            const sql = 'SELECT * FROM users';
            return await this.repositoryExecute.execute(sql);
        } catch (error) {
            console.log(error);
        }
    }

    public async getById(id: number) {
        try {
            const sql = 'SELECT * FROM users where id = $1';
            return await this.repositoryExecute.execute(sql, [id]); 
        } catch (error) {
            console.log(error)
        }
    }

    public async create(userReq: User) {
        try {
            const sql = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *';
            const user =  await this.repositoryExecute.execute(sql, [userReq.name, userReq.email, userReq.password]);
            return user[0];
        } catch (error) {
            console.log(error)
        }
    }

    public async update(id: number, userReq: User) {
        try {
            const sql = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *';
            const user = await this.repositoryExecute.execute(sql, [userReq.name, userReq.email, userReq.password, id]);
            return user[0];
        } catch (error) {
            console.log(error)
        }

    }

    public async delete(id: number) {
        try {
            const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
            const user = await this.repositoryExecute.execute(sql,[id]);
            return user[0];
        } catch (error) {
            console.log(error)
        }
    }
}