
import { updateCompletedProjectsSchema } from './updateCompletedProjectsSchema.js';
import { seedHistoricalProjects } from './seedHistoricalProjects.js';
import { seedVODecoHistoricalProjects } from './seedVODecoHistoricalProjects.js';

async function seedAllHistoricalProjects() {
  try {
    console.log('🚀 Начинаем добавление всех исторических проектов...');
    
    // Сначала обновляем схему
    console.log('\n1️⃣ Обновление схемы базы данных...');
    await updateCompletedProjectsSchema();
    
    // Добавляем исторические проекты Culligan
    console.log('\n2️⃣ Добавление проектов Culligan (2003-2007)...');
    await seedHistoricalProjects();
    
    // Добавляем исторические проекты VODeco
    console.log('\n3️⃣ Добавление проектов VODeco (2003-2021)...');
    await seedVODecoHistoricalProjects();
    
    console.log('\n🎉 Все исторические проекты успешно добавлены!');
    console.log('📊 Общая статистика:');
    console.log('   - Culligan проекты: 12 (2003-2007)');
    console.log('   - VODeco проекты: 23 (2003-2021)'); 
    console.log('   - Общий период: 2003-2021 (18 лет)');
    console.log('   - География: 7+ стран');
    
  } catch (error) {
    console.error('❌ Ошибка при добавлении исторических проектов:', error);
  }
}

// Запускаем если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAllHistoricalProjects().then(() => process.exit(0));
}

export { seedAllHistoricalProjects };
