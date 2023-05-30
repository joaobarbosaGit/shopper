import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "shopperDB",
    migrations: ["./src/database/migrations/*.ts"],
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    
});
