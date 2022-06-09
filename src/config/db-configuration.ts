import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://mygame:mygame@localhost:5432/mygame',
    idleTimeoutMillis: 30000
});