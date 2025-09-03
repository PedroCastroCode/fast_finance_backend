import { config as readEnv } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

readEnv({ path: join(__dirname, '../../../../.env') });
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT as any,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: ['dist/**/*.schema.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
    logging: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
