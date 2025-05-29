
import { pool } from '../server/db.js';

async function updateCompletedProjectsSchema() {
  try {
    console.log('🔄 Обновление схемы таблицы completed_projects...');

    // Добавляем новые колонки если их нет
    const alterQueries = [
      `ALTER TABLE completed_projects ADD COLUMN IF NOT EXISTS completion_date TEXT;`,
      `ALTER TABLE completed_projects ADD COLUMN IF NOT EXISTS total_investment REAL;`,
      `ALTER TABLE completed_projects ADD COLUMN IF NOT EXISTS beneficiaries INTEGER;`,
      `ALTER TABLE completed_projects ADD COLUMN IF NOT EXISTS impact_description TEXT;`,
      `ALTER TABLE completed_projects ADD COLUMN IF NOT EXISTS environmental_impact TEXT;`,
      `ALTER TABLE completed_projects ADD COLUMN IF NOT EXISTS technical_specifications TEXT;`,
      `ALTER TABLE completed_projects ADD COLUMN IF NOT EXISTS sdg_alignment TEXT;`,
      `ALTER TABLE completed_projects ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`,
      
      // Устанавливаем значения по умолчанию
      `UPDATE completed_projects SET status = 'completed' WHERE status IS NULL;`,
      `ALTER TABLE completed_projects ALTER COLUMN status SET DEFAULT 'completed';`
    ];

    for (const query of alterQueries) {
      await pool.query(query);
      console.log('✅ Выполнен запрос:', query.substring(0, 50) + '...');
    }

    console.log('✅ Схема таблицы completed_projects успешно обновлена');
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении схемы:', error);
  }
}

// Запускаем если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  updateCompletedProjectsSchema().then(() => process.exit(0));
}

export { updateCompletedProjectsSchema };
