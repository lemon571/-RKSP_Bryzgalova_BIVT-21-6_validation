import { DataSource } from 'typeorm';

const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'education3',
  username: 'postgres',
  password: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: true,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*{.ts,.js}'],
});
export default ormConfig;
