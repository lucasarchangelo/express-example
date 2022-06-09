import pool from '../config/db-configuration'
import { User } from '../models/User';

export class UserRepository {
    public async getAll() {
        try {
            const client = await pool.connect();
            const sql = 'SELECT * FROM users';
            const { rows } = await client.query(sql);
            const users = rows;
            client.release();
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    public async getById(id: number) {
        const client = await pool.connect();
        const sql = 'SELECT * FROM users where id = $1';
        const { rows } = await client.query(sql, [id]);
        const users = rows;
        client.release();
        return users;
    }

    public async create(userReq: User) {
        try {
            const client = await pool.connect();
            const sql = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *';
            const { rows } = await client.query(sql, [userReq.name, userReq.email, userReq.password]);
            const user = rows[0];
            client.release();
            return user;
        } catch (error) {
            console.log(error)
        }
    }

    public async update(id: number, userReq: User) {
        const client = await pool.connect();
        const sql = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *';
        const { rows } = await client.query(sql, [userReq.name, userReq.email, userReq.password, id]);
        const user = rows[0];
        client.release();
        return user;
    }

    public async delete(id: number) {
        const client = await pool.connect();
        const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const { rows } = await client.query(sql, [id]);
        const users = rows;
        client.release();
        return users;
    }
}