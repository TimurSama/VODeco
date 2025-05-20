import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Обновление схемы аутентификации...");

  try {
    // Удаляем старую таблицу пользователей, если она существует
    console.log("- Удаление старой таблицы пользователей (если существует)...");
    await db.execute(sql`DROP TABLE IF EXISTS "users" CASCADE;`);

    // Создаем обновленную таблицу пользователей
    console.log("- Создание обновленной таблицы пользователей...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "username" TEXT NOT NULL UNIQUE,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "first_name" TEXT,
        "last_name" TEXT,
        "profile_image_url" TEXT,
        "wallet_address" TEXT,
        "avatar" TEXT,
        "role" TEXT DEFAULT 'participant',
        "joined" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "voting_power" INTEGER DEFAULT 10,
        "google_id" TEXT UNIQUE,
        "telegram_id" TEXT UNIQUE,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Создаем заново таблицу сессий (связанную с пользователями)
    console.log("- Создание таблицы сессий...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "sid" TEXT NOT NULL PRIMARY KEY,
        "sess" JSONB NOT NULL,
        "expire" TIMESTAMP NOT NULL
      );
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");
    `);

    console.log("Миграция аутентификации успешно завершена!");
  } catch (error) {
    console.error("Ошибка при обновлении схемы аутентификации:", error);
    process.exit(1);
  }
}

main().catch(console.error);