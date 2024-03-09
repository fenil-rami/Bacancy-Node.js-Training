import { Sequelize } from "sequelize";

const sequelize = new Sequelize('ecommerce', 'postgres', 'root', {
    dialect: 'postgres',
    host: 'localhost',
    // port: '5432',    // optional 
    logging: true
})

const connect = async () => {
    try {
        // await sequelize.sync({ force: true })
        await sequelize.authenticate(); // testing connection
        console.log("Database Connected successfully!!!")
    }
    catch (err) {
        console.log("Something went wrong", err.message)
    }
}

await connect()

export default sequelize; 