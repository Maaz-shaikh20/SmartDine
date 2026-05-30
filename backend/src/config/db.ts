import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error("DATABASE_URL is not defined in environment variables");
    process.exit(1);
}

const isMySQL = databaseUrl.startsWith("mysql://");
const dialect = isMySQL ? "mysql" : "postgres";

const sequelize = new Sequelize(databaseUrl, {
    dialect: dialect,
    logging: false,
    dialectOptions: isMySQL
        ? {}
        : {
            ssl: process.env.NODE_ENV === "production"
                ? { require: true, rejectUnauthorized: false }
                : false,
          },
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`${isMySQL ? "MySQL" : "PostgreSQL"} connected successfully`);

        await sequelize.sync({ alter: true });
        console.log("Database synced");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

export default sequelize;