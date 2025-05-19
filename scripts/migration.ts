import { db } from "../server/db";
import * as schema from "../shared/schema";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Запуск миграции базы данных...");

  try {
    // Создаем таблицу сессий (если не существует)
    console.log("- Создание таблицы сессий...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "sid" TEXT NOT NULL PRIMARY KEY,
        "sess" TEXT NOT NULL,
        "expire" TIMESTAMP NOT NULL
      );
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");
    `);

    // Создаем таблицу пользователей (если не существует)
    console.log("- Создание таблицы пользователей...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "username" TEXT NOT NULL UNIQUE,
        "email" TEXT UNIQUE,
        "first_name" TEXT,
        "last_name" TEXT,
        "profile_image_url" TEXT,
        "wallet_address" TEXT,
        "avatar" TEXT,
        "role" TEXT DEFAULT 'participant',
        "joined" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "voting_power" INTEGER DEFAULT 10,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Создаем таблицу водных ресурсов (если не существует)
    console.log("- Создание таблицы водных ресурсов...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "water_resources" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "region" TEXT NOT NULL,
        "country" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "quality_index" INTEGER NOT NULL,
        "flow_rate" REAL NOT NULL,
        "is_active" BOOLEAN DEFAULT TRUE,
        "latitude" REAL NOT NULL,
        "longitude" REAL NOT NULL,
        "description" TEXT,
        "image_url" TEXT,
        "total_funding" REAL,
        "available_for_dao" REAL,
        "funding_progress" INTEGER DEFAULT 0,
        "irr" REAL,
        "participants_count" INTEGER DEFAULT 0,
        "project_type" TEXT,
        "investment_status" TEXT DEFAULT 'open',
        "category" TEXT
      );
    `);
    
    // Создаем таблицу проектов (если не существует)
    console.log("- Создание таблицы проектов...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        "region" TEXT NOT NULL,
        "country" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "image_url" TEXT,
        "total_funding" REAL NOT NULL,
        "available_for_dao" REAL NOT NULL,
        "funding_progress" INTEGER DEFAULT 0,
        "irr" REAL NOT NULL,
        "end_date" TIMESTAMP NOT NULL
      );
    `);
    
    // Создаем таблицу предложений DAO (если не существует)
    console.log("- Создание таблицы предложений DAO...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "proposals" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "votes_yes" INTEGER DEFAULT 0,
        "votes_no" INTEGER DEFAULT 0,
        "quorum" INTEGER DEFAULT 0,
        "required_quorum" INTEGER DEFAULT 50,
        "status" TEXT NOT NULL,
        "end_date" TIMESTAMP NOT NULL,
        "created_by" INTEGER REFERENCES "users"("id"),
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Создаем таблицу событий DAO (если не существует)
    console.log("- Создание таблицы событий DAO...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "events" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "date" TIMESTAMP NOT NULL,
        "location" TEXT NOT NULL,
        "is_virtual" BOOLEAN DEFAULT FALSE,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Создаем таблицу голосов (если не существует)
    console.log("- Создание таблицы голосов...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "votes" (
        "id" SERIAL PRIMARY KEY,
        "user_id" TEXT REFERENCES "users"("id") NOT NULL,
        "proposal_id" INTEGER REFERENCES "proposals"("id") NOT NULL,
        "vote_type" TEXT NOT NULL,
        "voting_power" INTEGER NOT NULL,
        "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Создаем таблицу инвестиций (если не существует)
    console.log("- Создание таблицы инвестиций...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "investments" (
        "id" SERIAL PRIMARY KEY,
        "user_id" TEXT REFERENCES "users"("id") NOT NULL,
        "project_id" INTEGER REFERENCES "projects"("id") NOT NULL,
        "amount" REAL NOT NULL,
        "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Создаем таблицу групп (если не существует)
    console.log("- Создание таблицы групп...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "groups" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "image_url" TEXT,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "creator_id" TEXT REFERENCES "users"("id"),
        "member_count" INTEGER DEFAULT 0,
        "is_active" BOOLEAN DEFAULT TRUE
      );
    `);
    
    // Создаем таблицу участников группы (если не существует)
    console.log("- Создание таблицы участников группы...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "group_members" (
        "id" SERIAL PRIMARY KEY,
        "group_id" INTEGER REFERENCES "groups"("id") NOT NULL,
        "user_id" TEXT REFERENCES "users"("id") NOT NULL,
        "role" TEXT DEFAULT 'member' NOT NULL,
        "joined_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
    
    // Создаем таблицу постов группы (если не существует)
    console.log("- Создание таблицы постов группы...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "group_posts" (
        "id" SERIAL PRIMARY KEY,
        "group_id" INTEGER REFERENCES "groups"("id") NOT NULL,
        "author_id" TEXT REFERENCES "users"("id") NOT NULL,
        "title" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "type" TEXT DEFAULT 'post' NOT NULL,
        "is_pinned" BOOLEAN DEFAULT FALSE,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP
      );
    `);

    console.log("Миграция успешно завершена!");
  } catch (error) {
    console.error("Ошибка при выполнении миграции:", error);
    process.exit(1);
  }
}

main().catch(console.error);