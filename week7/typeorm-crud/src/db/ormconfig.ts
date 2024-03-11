import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "root",
    "database": "testdb",
    "synchronize": false,
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "migrations": ["dist/db/migrations/*{.ts,.js}"],
    "migrationsTableName": "migrations",
  
    // entities: [User],
    // synchronize:true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;