import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function pad(num: number, size: number) {
  return num.toString().padStart(size, "0");
}

function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1, 2);
  const day = pad(now.getDate(), 2);
  const hours = pad(now.getHours(), 2);
  const minutes = pad(now.getMinutes(), 2);
  const seconds = pad(now.getSeconds(), 2);
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

async function main() {
  const name = process.argv[2];
  if (!name) {
    console.error("❌ Informe o nome da migration (ex: yarn migration:create create_users)");
    process.exit(1);
  }

  const timestamp = getTimestamp();
  const fileName = `${timestamp}_${name}.sql`;
  const dir = path.join(process.env.PWD || process.cwd(), "src", "database", "migrations");
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, fileName);

  const content = `-- Migration: ${name}
-- Created at: ${new Date().toISOString()}

-- ==============================================
-- UP
-- ==============================================

-- Example:
-- CREATE TABLE users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL
-- );

-- ==============================================
-- DOWN
-- ==============================================
-- Example:
-- DROP TABLE users;
`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Migration criada: ${filePath}`);
}

main();
