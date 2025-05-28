
import { db } from "../server/db";
import { waterResources } from "../shared/schema";

const investmentObjects = [
  {
    name: "Pumping Station No. 2",
    type: "pumping_station",
    status: "modernization_planned",
    location: "Jizzakh region",
    region: "Jizzakh",
    country: "Uzbekistan",
    capacity: 2500, // estimated m³/hour
    totalFunding: 7760600,
    daoFunding: 2328180,
    estimatedIrr: 17,
    projectDuration: 120, // 10 years operation
    latitude: 40.1158,
    longitude: 67.8358,
    description: "Part of the national water resource management system. Scheduled for modernization under the Water Resources Development Concept of the Republic of Uzbekistan for 2020–2030.",
    technicalPartners: JSON.stringify([
      "Culligan International (USA)",
      "Aqseptence Group (Germany)", 
      "Wuhuan Engineering Co., Ltd. (China)"
    ]),
    investmentStage: "funding",
    metadata: JSON.stringify({
      presidentialDecree: "UP-6024",
      decreeDate: "2020-07-10",
      projectModel: "PPP",
      operationPeriod: "10 years",
      participants: [
        "Government of the Republic of Uzbekistan",
        "UNICAP Public-Private Partnership Investment Fund",
        "VODPROM Corporation",
        "International Financial Institutions",
        "VOD DAO community"
      ],
      financialInstitutions: [
        "International Finance Corporation (IFC)",
        "Asian Infrastructure Investment Bank (AIIB)",
        "Asian Development Bank (ADB)",
        "Islamic Development Bank (IsDB)",
        "Eurasian Development Bank (EDB)"
      ]
    })
  },
  {
    name: "Korovulbozor Pumping Station",
    type: "pumping_station", 
    status: "modernization_planned",
    location: "Bukhara region",
    region: "Bukhara",
    country: "Uzbekistan",
    capacity: 2200,
    totalFunding: 6189700,
    daoFunding: 1856910,
    estimatedIrr: 15,
    projectDuration: 120,
    latitude: 39.7747,
    longitude: 64.4286,
    description: "Part of the national water resource management system in Bukhara region. Digital transformation and efficiency improvement project.",
    technicalPartners: JSON.stringify([
      "Culligan International (USA)",
      "Aqseptence Group (Germany)",
      "Wuhuan Engineering Co., Ltd. (China)"
    ]),
    investmentStage: "funding",
    metadata: JSON.stringify({
      presidentialDecree: "UP-6024",
      decreeDate: "2020-07-10",
      projectModel: "PPP",
      operationPeriod: "10 years"
    })
  },
  {
    name: "Kuyumazar Auxiliary Pumping Station",
    type: "auxiliary_pumping_station",
    status: "modernization_planned", 
    location: "Bukhara region",
    region: "Bukhara",
    country: "Uzbekistan",
    capacity: 3500,
    totalFunding: 11965400,
    daoFunding: 3589620,
    estimatedIrr: 22,
    projectDuration: 120,
    latitude: 39.6847,
    longitude: 64.5286,
    description: "Auxiliary pumping station supporting the main Kuyumazar infrastructure. Highest projected returns in the portfolio.",
    technicalPartners: JSON.stringify([
      "Culligan International (USA)",
      "Aqseptence Group (Germany)",
      "Wuhuan Engineering Co., Ltd. (China)"
    ]),
    investmentStage: "funding",
    metadata: JSON.stringify({
      presidentialDecree: "UP-6024",
      decreeDate: "2020-07-10",
      projectModel: "PPP",
      operationPeriod: "10 years",
      note: "Highest IRR project in current portfolio"
    })
  },
  {
    name: "Kuyumazar Pumping Station",
    type: "pumping_station",
    status: "modernization_planned",
    location: "Bukhara region", 
    region: "Bukhara",
    country: "Uzbekistan",
    capacity: 2800,
    totalFunding: 7760600,
    daoFunding: 2328180,
    estimatedIrr: 17,
    projectDuration: 120,
    latitude: 39.7047,
    longitude: 64.5486,
    description: "Main Kuyumazar pumping station, central to the regional water distribution network.",
    technicalPartners: JSON.stringify([
      "Culligan International (USA)",
      "Aqseptence Group (Germany)",
      "Wuhuan Engineering Co., Ltd. (China)"
    ]),
    investmentStage: "funding",
    metadata: JSON.stringify({
      presidentialDecree: "UP-6024",
      decreeDate: "2020-07-10",
      projectModel: "PPP",
      operationPeriod: "10 years"
    })
  },
  {
    name: "Amu-Bukhara-1 Pumping Station",
    type: "pumping_station",
    status: "modernization_planned",
    location: "Bukhara region",
    region: "Bukhara", 
    country: "Uzbekistan",
    capacity: 3200,
    totalFunding: 9490100,
    daoFunding: 2837030,
    estimatedIrr: 20,
    projectDuration: 120,
    latitude: 39.8247,
    longitude: 64.3086,
    description: "Strategic pumping station connecting Amu Darya river system to Bukhara regional distribution network.",
    technicalPartners: JSON.stringify([
      "Culligan International (USA)",
      "Aqseptence Group (Germany)",
      "Wuhuan Engineering Co., Ltd. (China)"
    ]),
    investmentStage: "funding",
    metadata: JSON.stringify({
      presidentialDecree: "UP-6024",
      decreeDate: "2020-07-10",
      projectModel: "PPP",
      operationPeriod: "10 years",
      strategicImportance: "Amu Darya connection"
    })
  }
];

async function seedInvestmentObjects() {
  console.log("🌊 Загрузка инвестиционных объектов VOD DAO...");
  
  try {
    // Очищаем существующие данные
    await db.delete(waterResources);
    console.log("✅ Существующие данные очищены");
    
    // Добавляем новые объекты
    for (const obj of investmentObjects) {
      const result = await db.insert(waterResources).values(obj).returning();
      console.log(`✅ Добавлен: ${obj.name} (ID: ${result[0].id})`);
    }
    
    console.log(`🎉 Успешно загружено ${investmentObjects.length} инвестиционных объектов`);
    
    // Выводим сводную статистику
    const totalFunding = investmentObjects.reduce((sum, obj) => sum + obj.totalFunding, 0);
    const totalDaoFunding = investmentObjects.reduce((sum, obj) => sum + obj.daoFunding, 0);
    const avgIrr = investmentObjects.reduce((sum, obj) => sum + obj.estimatedIrr, 0) / investmentObjects.length;
    
    console.log("\n📊 Статистика портфеля:");
    console.log(`💰 Общее финансирование: $${totalFunding.toLocaleString()}`);
    console.log(`🏛️ Доступно DAO: $${totalDaoFunding.toLocaleString()}`);
    console.log(`📈 Средняя доходность: ${avgIrr.toFixed(1)}%`);
    
  } catch (error) {
    console.error("❌ Ошибка при загрузке данных:", error);
    throw error;
  }
}

if (require.main === module) {
  seedInvestmentObjects()
    .then(() => {
      console.log("✅ Загрузка завершена");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Ошибка:", error);
      process.exit(1);
    });
}

export { seedInvestmentObjects };
