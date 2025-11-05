import fs from "fs";
import path from "path";
import { db } from "./db";


async function runMigrations() {
    const migrationsDir = path.join(process.env.PWD || process.cwd(), "src", "database", "migrations");
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith(".sql")).sort();

    console.log("🚀 Iniciando migrations...\n");

    await db.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      run_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

    const [executedRows] = await db.query("SELECT name FROM migrations");
    const executed = new Set((executedRows as any[]).map(r => r.name));

    for (const file of files) {
        if (executed.has(file)) {
            console.log(`🟡 ${file} já executada, pulando.`);
            continue;
        }

        const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
        console.log(`🟢 Executando: ${file}`);

        try {
            await db.query(sql);
            await db.query("INSERT INTO migrations (name) VALUES (?)", [file]);
            console.log(`✅ ${file} concluída!\n`);
        } catch (err: any) {
            console.error(`❌ Erro na migration ${file}:`, err.message);
            process.exit(1);
        }
    }

    console.log("🎉 Todas as migrations executadas com sucesso!");
    process.exit(0);
}

runMigrations();
