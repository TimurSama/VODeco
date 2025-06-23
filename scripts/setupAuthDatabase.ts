
import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function setupAuthDatabase() {
  console.log("🔧 Настройка базы данных аутентификации...");

  try {
    // Создаем расширения PostgreSQL для безопасности
    console.log("- Создание расширений безопасности...");
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    // Обновляем таблицу пользователей
    console.log("- Обновление таблицы пользователей...");
    await db.execute(sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;
    `);

    // Обновляем существующие записи
    await db.execute(sql`
      UPDATE users 
      SET is_active = true, 
          is_verified = false,
          updated_at = CURRENT_TIMESTAMP
      WHERE is_active IS NULL;
    `);

    // Создаем индексы для производительности
    console.log("- Создание индексов...");
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
      CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
      CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
      CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login);
    `);

    // Обновляем ограничения безопасности
    console.log("- Настройка ограничений безопасности...");
    await db.execute(sql`
      ALTER TABLE users 
      ALTER COLUMN password SET DEFAULT '';
    `);

    // Создаем таблицу для логов безопасности
    console.log("- Создание таблицы логов безопасности...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS security_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        action VARCHAR(50) NOT NULL,
        ip_address INET,
        user_agent TEXT,
        success BOOLEAN DEFAULT true,
        details JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);
      CREATE INDEX IF NOT EXISTS idx_security_logs_action ON security_logs(action);
      CREATE INDEX IF NOT EXISTS idx_security_logs_created_at ON security_logs(created_at);
    `);

    console.log("✅ База данных аутентификации настроена успешно!");
    
  } catch (error) {
    console.error("❌ Ошибка настройки базы данных:", error);
    throw error;
  }
}

// Запускаем если файл выполняется напрямую
if (require.main === module) {
  setupAuthDatabase()
    .then(() => {
      console.log("🎉 Настройка завершена!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Ошибка:", error);
      process.exit(1);
    });
}

export { setupAuthDatabase };
