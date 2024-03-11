import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { User } from 'src/user/entity/user.entity';

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'testdb',
  synchronize: true,
  logging: true,
  entities: [User],
}

export const AppDataSource = new DataSource(TypeORMConfig as DataSourceOptions);
AppDataSource.initialize()
  .then(() => {
    console.log('Data source has been initialized')
  })
  .catch((err) => {
    console.error('Error during data source initialization', err);
  })