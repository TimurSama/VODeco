
import { db } from '../server/db.js';
import { completedProjectsTable } from '../shared/schema.js';

const completedProjects = [
  // 2003
  {
    name: "Tashkent Water Park Treatment System",
    type: "water_park",
    location: "Tashkent",
    region: "Tashkent",
    country: "Uzbekistan",
    completionDate: "2003-04-11",
    capacity: 25000, // estimated daily capacity
    totalInvestment: 2500000,
    beneficiaries: 1000,
    latitude: 41.2995,
    longitude: 69.2401,
    description: "High-tech water purification system operating in Tashkent Water Park for over 20 years. Ensures drinking water quality standards across 7 pools with three powerful pumping stations providing chemical and biological water purification.",
    achievements: JSON.stringify([
      "Drinking water quality standards maintained for 20+ years",
      "Serves up to 1000 visitors daily",
      "Continuous operation across 7 pools",
      "10 hectares coverage"
    ]),
    partners: JSON.stringify(["Culligan International"]),
    technologies: JSON.stringify([
      "Chemical water purification",
      "Biological water purification", 
      "Multi-stage filtration"
    ]),
    impact: JSON.stringify({
      waterQuality: "Drinking standard",
      operationalYears: 20,
      dailyVisitors: 1000,
      coverage: "10 hectares"
    }),
    clientCompany: "Tashkent Water Park",
    industry: "Recreation & Tourism",
    equipmentUsed: JSON.stringify([
      "Culligan water purification equipment",
      "Three pumping stations",
      "Chemical treatment systems"
    ]),
    operationalSince: "2003",
    maintenancePeriod: 25,
    qualityStandards: JSON.stringify(["Drinking water standards", "Recreational water safety"])
  },
  
  {
    name: "Nemiroff Distillery Water Treatment",
    type: "industrial",
    location: "Nemirov, Vinnytsa region",
    region: "Vinnytsa",
    country: "Ukraine", 
    completionDate: "2003-11-21",
    capacity: 63000, // m³/hour capacity
    totalInvestment: 1800000,
    beneficiaries: 0, // Industrial use
    latitude: 49.0569,
    longitude: 28.8511,
    description: "High-quality water treatment system for vodka production. Multi-stage processing ensuring consistent physico-chemical composition for premium alcoholic beverages distributed across 80 countries.",
    achievements: JSON.stringify([
      "Premium vodka quality maintained",
      "140+ years production heritage",
      "Global distribution to 80 countries across 5 continents",
      "Multi-stage water processing system"
    ]),
    partners: JSON.stringify(["Culligan International", "Nemiroff"]),
    technologies: JSON.stringify([
      "Mechanical filtration",
      "De-ironing",
      "Water softening", 
      "Reverse osmosis"
    ]),
    impact: JSON.stringify({
      productionCapacity: "63 m³/hour",
      globalReach: "80 countries",
      qualityStandard: "Premium alcoholic beverages"
    }),
    clientCompany: "Nemiroff",
    industry: "Alcoholic Beverages",
    equipmentUsed: JSON.stringify([
      "Culligan water treatment equipment",
      "Reverse osmosis systems",
      "Mechanical filters",
      "De-ironing systems"
    ]),
    operationalSince: "2003",
    maintenancePeriod: 20,
    qualityStandards: JSON.stringify(["Alcoholic beverage production standards", "Export quality requirements"])
  },

  // 2004
  {
    name: "Kazakhstan Chemical Plant Water Treatment",
    type: "industrial", 
    location: "Kazakhstan",
    region: "Kazakhstan",
    country: "Kazakhstan",
    completionDate: "2004-07-02",
    capacity: 528000, // m³/day
    totalInvestment: 950000,
    beneficiaries: 0,
    latitude: 43.2220,
    longitude: 76.8512,
    description: "Specialized water treatment plant for chemical industry with filtering and demineralization capabilities.",
    achievements: JSON.stringify([
      "528 m³/day processing capacity",
      "Chemical industry grade water quality",
      "Demineralization capabilities"
    ]),
    partners: JSON.stringify(["Culligan International"]),
    technologies: JSON.stringify([
      "Industrial filtration",
      "Demineralization",
      "Chemical treatment"
    ]),
    impact: JSON.stringify({
      dailyCapacity: "528 m³",
      industryType: "Chemical processing"
    }),
    clientCompany: "Kazakhstan Chemical Plant",
    industry: "Chemical Manufacturing",
    equipmentUsed: JSON.stringify([
      "Culligan filtration systems",
      "Demineralization equipment"
    ]),
    operationalSince: "2004",
    maintenancePeriod: 20,
    qualityStandards: JSON.stringify(["Chemical industry standards"])
  },

  {
    name: "World of Fitness Sports Complex",
    type: "sports_facility",
    location: "Pobediteley Avenue, Minsk",
    region: "Minsk",
    country: "Belarus",
    completionDate: "2004-08-16", 
    capacity: 15000, // estimated daily water usage
    totalInvestment: 1200000,
    beneficiaries: 6000,
    latitude: 53.9006,
    longitude: 27.5590,
    description: "Water treatment system for major sports and health complex covering 7,000 square meters with modern equipment, aquazones, and various fitness facilities.",
    achievements: JSON.stringify([
      "7,000 square meters coverage",
      "Serves 6,000 people annually", 
      "150+ types of exercise machines",
      "Multiple aquazones for children and adults"
    ]),
    partners: JSON.stringify(["Culligan International"]),
    technologies: JSON.stringify([
      "Aquazone water treatment",
      "Pool water purification",
      "Sports facility water systems"
    ]),
    impact: JSON.stringify({
      annualVisitors: 6000,
      facilitySize: "7,000 m²",
      equipmentTypes: "150+"
    }),
    clientCompany: "World of Fitness",
    industry: "Sports & Recreation",
    equipmentUsed: JSON.stringify([
      "Culligan water treatment equipment",
      "Pool filtration systems"
    ]),
    operationalSince: "2004",
    maintenancePeriod: 20,
    qualityStandards: JSON.stringify(["Sports facility standards", "Pool water safety"])
  },

  {
    name: "Khortytsa Distillery Water System",
    type: "industrial",
    location: "Zaporozhye region",
    region: "Zaporozhye", 
    country: "Ukraine",
    completionDate: "2004-09-07",
    capacity: 50000, // estimated
    totalInvestment: 2200000,
    beneficiaries: 0,
    latitude: 47.8388,
    longitude: 35.1396,
    description: "Advanced water treatment for top-3 global vodka brand featuring reverse osmosis, silver and platinum filtration, carbon filters and water structuring technology.",
    achievements: JSON.stringify([
      "Top 3 global vodka brand",
      "International market presence",
      "Unique water structuring technology",
      "Multi-stage purification system"
    ]),
    partners: JSON.stringify(["Culligan International", "Khortytsa Distillery"]),
    technologies: JSON.stringify([
      "Reverse osmosis",
      "Silver filtration",
      "Platinum filtration", 
      "Carbon filtration",
      "Water structuring"
    ]),
    impact: JSON.stringify({
      brandRanking: "Top 3 globally",
      marketReach: "International",
      qualityLevel: "Premium"
    }),
    clientCompany: "Khortytsa Distillery",
    industry: "Alcoholic Beverages",
    equipmentUsed: JSON.stringify([
      "Culligan reverse osmosis units",
      "Silver filtration systems",
      "Platinum filters",
      "Carbon filter systems",
      "Water structuring units"
    ]),
    operationalSince: "2004",
    maintenancePeriod: 20,
    qualityStandards: JSON.stringify(["Premium vodka standards", "International export requirements"])
  },

  {
    name: "Boryspil International Airport Water Supply",
    type: "transportation",
    location: "Boryspil",
    region: "Kyiv",
    country: "Ukraine",
    completionDate: "2004-11-23",
    capacity: 1500000, // m³/day
    totalInvestment: 3500000,
    beneficiaries: 8000000, // annual passengers
    latitude: 50.3454,
    longitude: 30.8947,
    description: "Drinking water supply system for Ukraine's largest international airport serving over 8 million passengers annually with mechanical filtration, degreasing and disinfection.",
    achievements: JSON.stringify([
      "8+ million annual passengers served",
      "Largest airport in Ukraine",
      "International aviation standards",
      "1,500 m³/day capacity"
    ]),
    partners: JSON.stringify(["Culligan International"]),
    technologies: JSON.stringify([
      "Mechanical filtration",
      "Degreasing systems",
      "Water disinfection"
    ]),
    impact: JSON.stringify({
      annualPassengers: 8000000,
      dailyCapacity: "1,500 m³",
      airportRanking: "Largest in Ukraine"
    }),
    clientCompany: "Boryspil International Airport",
    industry: "Transportation",
    equipmentUsed: JSON.stringify([
      "Culligan filtration systems",
      "Degreasing equipment",
      "Disinfection systems"
    ]),
    operationalSince: "2004", 
    maintenancePeriod: 25,
    qualityStandards: JSON.stringify(["International aviation standards", "Drinking water quality"])
  },

  // 2005
  {
    name: "Russian Presidential Office Facilities",
    type: "government",
    location: "Moscow",
    region: "Moscow",
    country: "Russia",
    completionDate: "2005-02-02",
    capacity: 10000, // estimated
    totalInvestment: 5000000,
    beneficiaries: 5000, // estimated staff
    latitude: 55.7558,
    longitude: 37.6173,
    description: "Water treatment systems for multiple facilities of the Office of the President of the Russian Federation including hotel complexes, medical institutions, educational facilities, and administrative buildings.",
    achievements: JSON.stringify([
      "Strategic government facilities",
      "Multiple facility types covered",
      "High security standards",
      "Federal authority support"
    ]),
    partners: JSON.stringify(["Culligan International"]),
    technologies: JSON.stringify([
      "Advanced water purification",
      "Multi-facility systems",
      "Security-grade treatment"
    ]),
    impact: JSON.stringify({
      facilityTypes: "Multiple government facilities",
      securityLevel: "Federal",
      coverage: "Nationwide support"
    }),
    clientCompany: "Office of the President of the Russian Federation",
    industry: "Government",
    equipmentUsed: JSON.stringify([
      "Culligan water treatment systems",
      "Multi-facility solutions"
    ]),
    operationalSince: "2005",
    maintenancePeriod: 25,
    qualityStandards: JSON.stringify(["Government facility standards", "Security requirements"])
  },

  {
    name: "Drinks from Chernogolovka Production",
    type: "industrial",
    location: "Chernogolovka",
    region: "Moscow Oblast",
    country: "Russia",
    completionDate: "2005-04-14",
    capacity: 40000, // estimated
    totalInvestment: 1800000,
    beneficiaries: 1000000, // consumers
    latitude: 55.9167,
    longitude: 38.3833,
    description: "Multi-level water purification system for traditional Russian lemonades production using artesian water from 170m deep wells with 20+ quality control indicators.",
    achievements: JSON.stringify([
      "9 traditional lemonade flavors",
      "Artesian water from 170m depth",
      "20+ quality control indicators",
      "Natural ingredients only"
    ]),
    partners: JSON.stringify(["Culligan International", "Drinks from Chernogolovka"]),
    technologies: JSON.stringify([
      "Multi-level purification",
      "Artesian water treatment",
      "Quality control systems"
    ]),
    impact: JSON.stringify({
      productFlavors: 9,
      wellDepth: "170 meters",
      qualityIndicators: "20+",
      naturalIngredients: true
    }),
    clientCompany: "Drinks from Chernogolovka",
    industry: "Beverages",
    equipmentUsed: JSON.stringify([
      "Culligan multi-level purification",
      "Quality control systems"
    ]),
    operationalSince: "2005",
    maintenancePeriod: 20,
    qualityStandards: JSON.stringify(["Beverage production standards", "Natural product requirements"])
  },

  {
    name: "Gazprom Headquarters Complex",
    type: "corporate",
    location: "Moscow",
    region: "Moscow", 
    country: "Russia",
    completionDate: "2005-06-02",
    capacity: 25000, // estimated
    totalInvestment: 4500000,
    beneficiaries: 10000, // estimated employees and visitors
    latitude: 55.7558,
    longitude: 37.6173,
    description: "Water treatment systems for the world's largest gas company headquarters including main building, polyclinic, sports complex with tennis court and swimming pool, restaurant, hotel, and concert hall.",
    achievements: JSON.stringify([
      "World's largest gas company",
      "160,000+ km gas transmission system",
      "Multiple facility integration",
      "Corporate campus coverage"
    ]),
    partners: JSON.stringify(["Culligan International", "Gazprom"]),
    technologies: JSON.stringify([
      "Corporate facility systems",
      "Multi-building integration",
      "Sports facility treatment"
    ]),
    impact: JSON.stringify({
      companySize: "World's largest gas company",
      networkLength: "160,000+ km",
      facilityTypes: "Multiple corporate facilities"
    }),
    clientCompany: "Gazprom",
    industry: "Energy",
    equipmentUsed: JSON.stringify([
      "Culligan water treatment systems",
      "Multi-facility solutions"
    ]),
    operationalSince: "2005",
    maintenancePeriod: 25,
    qualityStandards: JSON.stringify(["Corporate standards", "Sports facility requirements"])
  },

  {
    name: "ALROSA Diamond Mining Facilities",
    type: "industrial",
    location: "Yakutia",
    region: "Sakha Republic",
    country: "Russia", 
    completionDate: "2005-10-07",
    capacity: 800000, // m³/day
    totalInvestment: 6500000,
    beneficiaries: 5000, // estimated workers
    latitude: 62.0339,
    longitude: 129.7331,
    description: "Water filtration systems for the world's largest diamond producer, handling 95% of Russian diamond extraction and 25% of global production with 18-20 years of proven reserves.",
    achievements: JSON.stringify([
      "World's largest diamond producer",
      "95% of Russian diamond extraction",
      "25% of global diamond production", 
      "18-20 years proven reserves"
    ]),
    partners: JSON.stringify(["Culligan International", "ALROSA"]),
    technologies: JSON.stringify([
      "Industrial filtration",
      "Mining operation support",
      "High-capacity systems"
    ]),
    impact: JSON.stringify({
      globalMarketShare: "25%",
      russianShare: "95%",
      reserveYears: "18-20",
      dailyCapacity: "800 m³"
    }),
    clientCompany: "ALROSA",
    industry: "Mining",
    equipmentUsed: JSON.stringify([
      "Culligan filtration systems",
      "High-capacity treatment equipment"
    ]),
    operationalSince: "2005",
    maintenancePeriod: 20,
    qualityStandards: JSON.stringify(["Mining industry standards", "Industrial water quality"])
  }
];

// Продолжение следует...
const moreProjects = [
  // 2006
  {
    name: "Ashgabat Water Treatment Plant",
    type: "municipal",
    location: "Ashgabat",
    region: "Ashgabat",
    country: "Turkmenistan",
    completionDate: "2006-08-09", 
    capacity: 320000000, // m³/day - very large scale
    totalInvestment: 200000000, // $200M contract
    beneficiaries: 1000000, // estimated population served
    latitude: 37.9601,
    longitude: 58.3261,
    description: "Major water treatment plant opened by President Saparmurat Niyazov, part of $200M+ contract for reconstruction of waterworks, desalination plants, and groundwater recultivation across Turkmenistan.",
    achievements: JSON.stringify([
      "Presidential inauguration",
      "$200M+ total contract value",
      "320,000 m³/day capacity",
      "National water infrastructure modernization"
    ]),
    partners: JSON.stringify(["Culligan International", "Government of Turkmenistan"]),
    technologies: JSON.stringify([
      "Large-scale water treatment",
      "Desalination technology",
      "Groundwater recultivation",
      "Municipal water systems"
    ]),
    impact: JSON.stringify({
      dailyCapacity: "320,000 m³",
      contractValue: "$200M+",
      nationalScope: true,
      presidentialSupport: true
    }),
    clientCompany: "Government of Turkmenistan",
    industry: "Municipal Water",
    equipmentUsed: JSON.stringify([
      "Culligan large-scale treatment systems",
      "Desalination equipment",
      "Pumping stations"
    ]),
    operationalSince: "2006",
    maintenancePeriod: 30,
    qualityStandards: JSON.stringify(["National water standards", "International municipal standards"])
  },

  {
    name: "Mercury Mineral Water Production",
    type: "industrial",
    location: "Cherkessk, North Caucasus",
    region: "North Caucasus",
    country: "Russia",
    completionDate: "2006-09-05",
    capacity: 1013699, // 370M bottles/year converted to daily
    totalInvestment: 8500000,
    beneficiaries: 2000000, // consumers
    latitude: 44.2242,
    longitude: 42.0578,
    description: "Artesian water filtration system for Russia's leading mineral water producer with 370 million bottles annual capacity, meeting international quality standards.",
    achievements: JSON.stringify([
      "370 million bottles annual production",
      "Leading Russian mineral water producer",
      "3,600 m² production complex",
      "International quality standards"
    ]),
    partners: JSON.stringify(["Culligan International", "Mercury"]),
    technologies: JSON.stringify([
      "Artesian water filtration",
      "High-volume bottling support",
      "Quality assurance systems"
    ]),
    impact: JSON.stringify({
      annualProduction: "370 million bottles",
      complexSize: "3,600 m²",
      marketPosition: "Leading producer",
      qualityLevel: "International standards"
    }),
    clientCompany: "Mercury",
    industry: "Bottled Water",
    equipmentUsed: JSON.stringify([
      "Culligan artesian water filtration",
      "Production support systems"
    ]),
    operationalSince: "2006",
    maintenancePeriod: 20,
    qualityStandards: JSON.stringify(["International quality standards", "Mineral water regulations"])
  }
];

export async function seedCompletedProjects() {
  console.log('Заполнение базы данных завершенными проектами...');
  
  try {
    // Объединяем все проекты
    const allProjects = [...completedProjects, ...moreProjects];
    
    for (const project of allProjects) {
      await db.insert(completedProjectsTable).values(project);
      console.log(`- Добавлен проект: ${project.name}`);
    }
    
    console.log(`Успешно добавлено ${allProjects.length} завершенных проектов!`);
  } catch (error) {
    console.error('Ошибка при заполнении завершенных проектов:', error);
    throw error;
  }
}

// Запуск если файл выполняется напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  seedCompletedProjects()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
