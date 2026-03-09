import "dotenv/config";
import fs from "fs";
import path from "path";
import pool from "../config/database.js";

const migrationsPath = path.resolve("src/migrations");

async function runMigrations() {

    try {

        const files = fs.readdirSync(migrationsPath).sort();

        for (const file of files) {

            const filePath = path.join(migrationsPath, file);

            const sql = fs.readFileSync(filePath, "utf-8");

            console.log(`Rodando migration: ${file}`);

            await pool.query(sql);

        }

        console.log("Migrations executadas com sucesso");

        process.exit();

    } catch (error) {

        console.error("Erro ao executar migrations:", error);

        process.exit(1);

    }

}

runMigrations();