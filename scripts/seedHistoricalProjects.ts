import { db } from '../server/db.js';
import { completedProjectsTable } from '../shared/schema.js';

const historicalProjects = [
  {
    name: "Culligan Water Park Tashkent",
    type: "Water Treatment",
    status: "completed",
    location: "Tashkent",
    region: "Tashkent Region",
    country: "Uzbekistan",
    capacity: 1000,
    totalFunding: 2500000,
    daoFunding: 500000,
    estimatedIrr: 15.5,
    projectDuration: 24,
    latitude: 41.2995,
    longitude: 69.2401,
    description: "Water purification equipment for Tashkent Water Park with 7 pools. High-tech solutions for drinking water quality standards with 3 powerful pumping stations ensuring continuous chemical and biological water purification.",
    technicalPartners: "Culligan International",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2003,
      serviceArea: "10 hectares",
      dailyVisitors: 1000,
      operationalYears: 20
    })
  },
  {
    name: "Nemiroff Vodka Production Water Treatment",
    type: "Industrial Water Treatment",
    status: "completed", 
    location: "Nemirov",
    region: "Vinnytsa Region",
    country: "Ukraine",
    capacity: 63,
    totalFunding: 1800000,
    daoFunding: 400000,
    estimatedIrr: 18.2,
    projectDuration: 18,
    latitude: 49.0647,
    longitude: 28.8492,
    description: "High-tech water treatment equipment for alcoholic beverage production. Multi-stage processing: mechanical filtration, de-ironing, softening, reverse osmosis. Capacity 63 m³/hour for premium vodka production.",
    technicalPartners: "Culligan, Nemiroff",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2003,
      productionHistory: "140+ years",
      globalReach: "80 countries, 5 continents",
      processStages: 4
    })
  },
  {
    name: "Kazakhstan Chemical Plant Water Treatment",
    type: "Chemical Industry Treatment",
    status: "completed",
    location: "Almaty",
    region: "Almaty Region", 
    country: "Kazakhstan",
    capacity: 528,
    totalFunding: 3200000,
    daoFunding: 640000,
    estimatedIrr: 16.8,
    projectDuration: 36,
    latitude: 43.2220,
    longitude: 76.8512,
    description: "Water treatment plant for chemical industry with filtering and demineralization functions. Capacity of 528 cubic meters per day for industrial chemical processes.",
    technicalPartners: "Culligan, Kazakhstan Chemical Plant",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2004,
      industryType: "chemical",
      dailyCapacity: "528 m³"
    })
  },
  {
    name: "World of Fitness Sports Complex",
    type: "Recreation Water Treatment",
    status: "completed",
    location: "Minsk",
    region: "Minsk Region",
    country: "Belarus", 
    capacity: 200,
    totalFunding: 1500000,
    daoFunding: 300000,
    estimatedIrr: 14.5,
    projectDuration: 12,
    latitude: 53.9006,
    longitude: 27.5590,
    description: "Water treatment equipment for sports and health club covering 7,000 square meters. Serves 6,000 annual members with aquazones for children and adults.",
    technicalPartners: "Culligan, World of Fitness",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2004,
      facilitySize: "7,000 m²",
      annualMembers: 6000,
      equipmentTypes: "150+ exercise machines"
    })
  },
  {
    name: "Khortytsa Distillery Water System",
    type: "Beverage Production",
    status: "completed",
    location: "Zaporizhzhia",
    region: "Zaporizhzhia Oblast",
    country: "Ukraine",
    capacity: 150,
    totalFunding: 2200000,
    daoFunding: 440000,
    estimatedIrr: 19.3,
    projectDuration: 24,
    latitude: 47.8388,
    longitude: 35.1396,
    description: "Advanced water treatment for premium vodka production including reverse osmosis, silver and platinum filtration, carbon filters and water structuring unit. Top 3 global vodka brand.",
    technicalPartners: "Culligan, Khortytsa Distillery",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2004,
      brandRanking: "Top 3 global vodka",
      filtrationStages: "Multi-level with precious metals",
      globalPresence: "Worldwide distribution"
    })
  },
  {
    name: "Boryspil International Airport Water Supply",
    type: "Airport Infrastructure",
    status: "completed",
    location: "Boryspil",
    region: "Kyiv Oblast",
    country: "Ukraine",
    capacity: 1500,
    totalFunding: 4500000,
    daoFunding: 900000,
    estimatedIrr: 13.2,
    projectDuration: 18,
    latitude: 50.3450,
    longitude: 30.8947,
    description: "Drinking water supply system for Ukraine's largest international airport. Capacity of 1,500 cubic meters per day serving 8+ million annual passengers with mechanical filtration, degreasing and disinfection.",
    technicalPartners: "Culligan, Boryspil Airport",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2004,
      passengerVolume: "8+ million annually",
      dailyCapacity: "1,500 m³",
      serviceLevel: "International airport standards"
    })
  },
  {
    name: "Chernogolovka Beverages Water Treatment",
    type: "Soft Drink Production",
    status: "completed",
    location: "Chernogolovka",
    region: "Moscow Oblast",
    country: "Russia",
    capacity: 300,
    totalFunding: 2800000,
    daoFunding: 560000,
    estimatedIrr: 17.4,
    projectDuration: 20,
    latitude: 56.0167,
    longitude: 38.3833,
    description: "Multi-level water purification system for traditional Russian lemonades production. Uses artesian water from wells up to 170m deep, controlled by 20+ quality indicators for natural beverages without artificial additives.",
    technicalPartners: "Culligan, Drinks from Chernogolovka",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2005,
      beverageTypes: 9,
      wellDepth: "103-170 meters",
      qualityControls: "20+ indicators",
      naturalIngredients: "No artificial additives"
    })
  },
  {
    name: "Gazprom Headquarters Water System", 
    type: "Corporate Complex",
    status: "completed",
    location: "Moscow",
    region: "Moscow",
    country: "Russia",
    capacity: 800,
    totalFunding: 5200000,
    daoFunding: 1040000,
    estimatedIrr: 12.8,
    projectDuration: 24,
    latitude: 55.7558,
    longitude: 37.6176,
    description: "Comprehensive water treatment system for Gazprom headquarters complex including main building, polyclinic, sports complex with pool, restaurant, hotel and concert facilities.",
    technicalPartners: "Culligan, Gazprom",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2005,
      complexType: "Corporate headquarters",
      facilities: "Multiple buildings including sports complex",
      companySize: "World's largest gas company"
    })
  },
  {
    name: "ALROSA Diamond Mining Water Treatment",
    type: "Mining Industry",
    status: "completed",
    location: "Mirny",
    region: "Sakha Republic",
    country: "Russia",
    capacity: 800,
    totalFunding: 6800000,
    daoFunding: 1360000,
    estimatedIrr: 20.1,
    projectDuration: 30,
    latitude: 62.5354,
    longitude: 113.9669,
    description: "Water filtration systems for world's largest diamond producer. Capacity of 800 cubic meters per day serving mining operations that extract 25% of global diamond production.",
    technicalPartners: "Culligan, ALROSA",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2005,
      globalMarketShare: "25% of world diamond production",
      russianShare: "95% of Russian diamonds",
      reserveYears: "18-20 years at current production"
    })
  },
  {
    name: "Ashgabat Water Treatment Plant",
    type: "Municipal Water Supply",
    status: "completed",
    location: "Ashgabat",
    region: "Ahal Region",
    country: "Turkmenistan",
    capacity: 320000,
    totalFunding: 200000000,
    daoFunding: 40000000,
    estimatedIrr: 11.5,
    projectDuration: 96,
    latitude: 37.9601,
    longitude: 58.3261,
    description: "Massive water treatment plant opened by President of Turkmenistan. Capacity of 320,000 cubic meters per day. Part of comprehensive water infrastructure reconstruction including desalination plants and pumping stations.",
    technicalPartners: "Culligan, Government of Turkmenistan",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2006,
      projectValue: "$200+ million",
      dailyCapacity: "320,000 m³",
      governmentProject: "Presidential opening",
      scope: "National water infrastructure"
    })
  },
  {
    name: "Mercury Mineral Water Plant",
    type: "Mineral Water Production",
    status: "completed",
    location: "Cherkessk",
    region: "Karachay-Cherkessia",
    country: "Russia",
    capacity: 400,
    totalFunding: 8500000,
    daoFunding: 1700000,
    estimatedIrr: 16.9,
    projectDuration: 36,
    latitude: 44.2232,
    longitude: 42.0577,
    description: "Artesian water filtration for mineral water bottling plant. Production capacity of 370+ million bottles annually across 3,600 square meters including production workshop, logistics complex and rail infrastructure.",
    technicalPartners: "Culligan, Mercury Water Company",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2006,
      annualProduction: "370+ million bottles",
      facilitySize: "3,600 m²",
      location: "North Caucasus",
      infrastructure: "Rail tracks included"
    })
  },
  {
    name: "Belovezhsky Cheeses Water Treatment",
    type: "Dairy Production",
    status: "completed",
    location: "Vysokaye",
    region: "Brest Region",
    country: "Belarus",
    capacity: 200,
    totalFunding: 1200000,
    daoFunding: 240000,
    estimatedIrr: 15.8,
    projectDuration: 18,
    latitude: 52.3167,
    longitude: 23.3667,
    description: "Water treatment equipment for premium cheese production including Mozzarella and Belovezhsky Parmesan. Serves modernized facility producing 20+ types of semi-hard cheeses since 1938.",
    technicalPartners: "Culligan, Belovezhsky Cheeses JSC",
    investmentStage: "operational",
    metadata: JSON.stringify({
      yearCompleted: 2007,
      cheeseTypes: "20+ varieties",
      productionHistory: "Since 1938",
      premiumProducts: "Mozzarella, Belovezhsky Parmesan",
      modernization: "2003 plant upgrade"
    })
  }
];

async function seedHistoricalProjects() {
  try {
    console.log('🌊 Добавление исторических водных проектов Culligan...');
    
    for (const project of historicalProjects) {
      console.log(`- Добавляю проект: ${project.name}`);
      await db.insert(completedProjectsTable).values(project);
    }
    
    console.log('✅ Успешно добавлено', historicalProjects.length, 'исторических проектов');
    console.log('📊 Проекты охватывают период 2003-2007 гг.');
    console.log('🌍 География: Узбекистан, Украина, Казахстан, Беларусь, Россия, Туркменистан');
    
  } catch (error) {
    console.error('❌ Ошибка при добавлении исторических проектов:', error);
  }
}

// Запускаем если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  seedHistoricalProjects();
}

export { seedHistoricalProjects };