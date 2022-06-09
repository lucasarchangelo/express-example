import pool from '../config/db-configuration'

export class RepositoryExecute {

    public async execute(sql: string, params?: any[]) {
        const client = await pool.connect();
        const { rows } = await client.query(sql, params);
        client.release();

        return rows;
    }
}